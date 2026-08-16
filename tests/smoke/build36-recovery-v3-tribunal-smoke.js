(() => {
  'use strict';
  const mode=new URLSearchParams(location.search).get('b36RecoveryTribunal');
  if(!mode)return;
  const root=document.documentElement;
  const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  const clone=value=>JSON.parse(JSON.stringify(value));
  const mark=(name,value)=>{root.dataset[`b36t${name}`]=String(value)};
  const waitFor=async(predicate,timeout=12000)=>{const start=performance.now();while(performance.now()-start<timeout){try{if(predicate())return true}catch{}await wait(50)}return false};

  async function api(){
    const ready=await waitFor(()=>(window.FrenchTranquilleRecovery&&window.FrenchTranquilleRecoveryV3Core&&window.FrenchTranquilleRecoveryV3Contract&&window.FrenchTranquilleMemoryEvidenceV2&&window.FrenchTranquilleEvidenceShadow));
    if(!ready)throw new Error('b36t-api-missing');
    return {recovery:window.FrenchTranquilleRecovery,core:window.FrenchTranquilleRecoveryV3Core,contract:window.FrenchTranquilleRecoveryV3Contract,evidence:window.FrenchTranquilleMemoryEvidenceV2,shadow:window.FrenchTranquilleEvidenceShadow};
  }
  const canonical=value=>window.FrenchTranquilleMemoryEvidenceV2.canonicalStringify(value);
  const semanticEqual=(a,b)=>canonical(a)===canonical(b);
  const coherent=core=>core.validateRawMap(core.collectRaw(localStorage),{allowMissing:true,requireEvidenceCoherence:true}).ok;
  function sourceObjects(core){const raw=core.collectRaw(localStorage),stores={};core.SOURCE_STORE_SPECS.forEach(spec=>{stores[spec.id]=raw[spec.key]===null?null:JSON.parse(raw[spec.key])});return stores}
  function v2Backup(recovery,stores){return recovery.legacyCore.buildBackup({getItem(key){const spec=recovery.legacyCore.specForKey(key);const value=spec?stores[spec.id]:null;return value==null?null:JSON.stringify(value)}},{version:'2.3.0',build:34})}

  async function adoption(reopen){
    const {recovery,core,shadow}=await api(); await wait(120);
    const status=shadow.status(), pre=recovery.preMigration(), backup=recovery.backupObject();
    const ids=core.STORE_SPECS.map(spec=>spec.id).sort().join(','), backupIds=Object.keys(backup.stores||{}).sort().join(',');
    const lifecycle=reopen?(status.existingAtBoot===true&&status.adoptedThisBoot===false):(status.existingAtBoot===false&&status.adoptedThisBoot===true);
    const preSafe=reopen?true:Boolean(pre)&&(pre.values?.[core.EVIDENCE_STORE_KEY]??null)===null;
    mark('Mode',reopen?'reopen':'adopt');mark('Done',1);mark('SevenStores',core.STORE_SPECS.length===7?1:0);mark('BackupV3',backup.version===3&&ids===backupIds?1:0);mark('EvidencePresent',localStorage.getItem(core.EVIDENCE_STORE_KEY)?1:0);mark('Coherent',coherent(core)?1:0);mark('Lifecycle',lifecycle?1:0);mark('PreMigration',preSafe?1:0);mark('SourceCount',core.SOURCE_STORE_SPECS.length);mark('RawValid',core.validateRawMap(core.collectRaw(localStorage),{allowMissing:true,requireEvidenceCoherence:true}).ok?1:0);
  }

  async function corruptBoot(){
    const {recovery,core,shadow}=await api(); await wait(150); const status=recovery.status();
    mark('Mode','corrupt');mark('Done',1);mark('RepairedEvidence',(status.repairedAtBoot||[]).some(entry=>entry.key===core.EVIDENCE_STORE_KEY)?1:0);mark('Quarantined',Number(status.quarantineCount||0)>=1?1:0);mark('Coherent',coherent(core)&&shadow.coherent()?1:0);mark('EvidencePresent',localStorage.getItem(core.EVIDENCE_STORE_KEY)?1:0);
  }

  async function restoreSuite(){
    const {recovery,core,contract,shadow}=await api(); await wait(120); if(!coherent(core))throw new Error('baseline-not-coherent');
    const baselineBackup=recovery.backupObject();
    const baselinePlan=core.planRestore(baselineBackup,core.collectRaw(localStorage));
    const baselineSources=clone(baselineBackup.stores); delete baselineSources.evidence;
    const learnerKey=core.SOURCE_STORE_SPECS.find(spec=>spec.id==='learner').key;

    // v3 exact round-trip.
    const learnerMutated=JSON.parse(localStorage.getItem(learnerKey)); learnerMutated.conversationWins=999; localStorage.setItem(learnerKey,JSON.stringify(learnerMutated)); await wait(120);
    const v3Result=recovery.restoreObject(baselineBackup,{reload:false}); await wait(80);
    const v3Exact=v3Result.ok&&core.rawMapsEqual(core.collectRaw(localStorage),baselinePlan.targetRaw)&&coherent(core);

    // v2 owns the historical six and rebuilds Evidence.
    const v2Payload=v2Backup(recovery,baselineSources);
    const foreignLearner=JSON.parse(localStorage.getItem(learnerKey)); foreignLearner.conversationWins=321; localStorage.setItem(learnerKey,JSON.stringify(foreignLearner)); await wait(100);
    const foreignEvidence=localStorage.getItem(core.EVIDENCE_STORE_KEY);
    const v2Result=recovery.restoreObject(v2Payload,{reload:false}); await wait(80);
    const afterV2=sourceObjects(core);
    const v2SourcesExact=core.SOURCE_STORE_SPECS.every(spec=>semanticEqual(afterV2[spec.id],baselineSources[spec.id]));
    const v2Rebuilt=v2Result.ok&&v2Result.migratedFrom===2&&(v2Result.rebuildDerivedIds||[]).includes('evidence')&&localStorage.getItem(core.EVIDENCE_STORE_KEY)!==foreignEvidence&&v2SourcesExact&&coherent(core);

    // v1 owns learner+memory, preserves the four later stores, then rebuilds Evidence.
    const current=sourceObjects(core);
    current.errors=clone(current.errors);current.errors.totals.errors=Number(current.errors.totals.errors||0)+41;
    current.scenarios=clone(current.scenarios);current.scenarios.totalCompletions=Number(current.scenarios.totalCompletions||0)+7;
    current.listening=clone(current.listening);current.listening.totals.attempts=Number(current.listening.totals.attempts||0)+13;
    current.milestones=clone(current.milestones);current.milestones.seen['v1-preserve-probe']=true;
    for(const id of ['errors','scenarios','listening','milestones']){const spec=core.SOURCE_STORE_SPECS.find(entry=>entry.id===id);localStorage.setItem(spec.key,JSON.stringify(current[id]))}
    // Make current learner foreign too, so rebuilding the v1 target is byte-demonstrable.
    const foreignV1Learner=JSON.parse(localStorage.getItem(learnerKey));foreignV1Learner.conversationWins=1005;localStorage.setItem(learnerKey,JSON.stringify(foreignV1Learner));
    await wait(140);
    const preserved=Object.fromEntries(['errors','scenarios','listening','milestones'].map(id=>[id,clone(current[id])]));
    const evidenceBeforeV1=localStorage.getItem(core.EVIDENCE_STORE_KEY);
    const v1Payload={format:'french-tranquille-backup',version:1,exportedAt:'2026-08-12T00:00:00.000Z',learner:clone(baselineSources.learner),memory:clone(baselineSources.memory)};
    const v1Result=recovery.restoreObject(v1Payload,{reload:false}); await wait(80);
    const afterV1=sourceObjects(core);
    const v1Preserved=['errors','scenarios','listening','milestones'].every(id=>semanticEqual(afterV1[id],preserved[id]));
    const v1Owned=semanticEqual(afterV1.learner,baselineSources.learner)&&semanticEqual(afterV1.memory,baselineSources.memory);
    const preserveOk=[...(v1Result.preserveMissingIds||[])].sort().join(',')===['errors','listening','milestones','scenarios'].sort().join(',');
    const v1Rebuilt=v1Result.ok&&v1Result.migratedFrom===1&&preserveOk&&(v1Result.rebuildDerivedIds||[]).includes('evidence')&&localStorage.getItem(core.EVIDENCE_STORE_KEY)!==evidenceBeforeV1&&v1Preserved&&v1Owned&&coherent(core);

    // Return to canonical baseline before fault/reset tests.
    const back=recovery.restoreObject(baselineBackup,{reload:false});await wait(80);if(!back.ok||!coherent(core))throw new Error('baseline-restore-failed');

    // One-shot mid-restore fault: partial writes happen, rollback writer then becomes healthy.
    const targetSources=clone(baselineSources);targetSources.learner.conversationWins=777;
    const targetBackup=contract.buildBackupV3(targetSources,{version:'2.4.0',build:36},{exportedAt:'2026-08-16T02:00:00.000Z'});
    const beforeFault=core.collectRaw(localStorage);let writes=0,injected=false;
    const faultWriter={set(key,value){writes+=1;if(!injected&&writes===3){injected=true;throw new Error('b36-injected-write-failure')}localStorage.setItem(key,value)},remove(key){localStorage.removeItem(key)}};
    const faultResult=core.restore(localStorage,targetBackup,faultWriter);await wait(140);shadow.refresh('b36-tribunal-post-fault');await wait(80);
    const faultRollback=faultResult.ok===false&&faultResult.rolledBack===true&&core.rawMapsEqual(core.collectRaw(localStorage),beforeFault)&&coherent(core);

    // Generic learner reset must clear all seven and own a pre-reset snapshot.
    const beforeResetBackup=recovery.backupObject();localStorage.removeItem(learnerKey);await wait(80);
    const allSevenCleared=core.STORE_SPECS.every(spec=>localStorage.getItem(spec.key)===null);const preReset=recovery.preReset();const resetSnapshotHasEvidence=Boolean(preReset?.values?.[core.EVIDENCE_STORE_KEY]);
    const resetRestore=recovery.restoreObject(beforeResetBackup,{reload:false});await wait(100);
    const resetRoundTrip=allSevenCleared&&resetSnapshotHasEvidence&&resetRestore.ok&&coherent(core);

    const finalRestore=recovery.restoreObject(baselineBackup,{reload:false});await wait(80);const finalSources=sourceObjects(core);
    const finalBaseline=core.SOURCE_STORE_SPECS.every(spec=>semanticEqual(finalSources[spec.id],baselineSources[spec.id]))&&coherent(core);

    mark('Mode','restore');mark('Done',1);mark('V3RoundTrip',v3Exact?1:0);mark('V2Rebuild',v2Rebuilt?1:0);mark('V1PreserveRebuild',v1Rebuilt?1:0);mark('FaultRollback',faultRollback?1:0);mark('ResetSeven',resetRoundTrip?1:0);mark('FinalBaseline',finalBaseline?1:0);mark('Coherent',coherent(core)?1:0);
  }

  async function pwa(){
    const {recovery,core,shadow}=await api();await wait(150);localStorage.setItem('french-tranquille:b36:pwa-persist','persisted');
    const persisted=localStorage.getItem('french-tranquille:b36:pwa-persist')==='persisted';const sw=Boolean(navigator.serviceWorker?.controller||await navigator.serviceWorker?.getRegistration?.());
    mark('Mode','pwa');mark('Done',1);mark('Persisted',persisted?1:0);mark('Coherent',coherent(core)&&shadow.coherent()?1:0);mark('BackupV3',recovery.backupObject().version===3?1:0);mark('ServiceWorker',sw?1:0);
  }

  const fail=error=>{mark('Done',0);mark('Error',error?.message||String(error))};
  const dispatch=()=>mode==='adopt'?adoption(false):mode==='reopen'?adoption(true):mode==='corrupt'?corruptBoot():mode==='restore'?restoreSuite():mode==='pwa'?pwa():Promise.reject(new Error(`unknown-tribunal-mode:${mode}`));
  if(document.readyState==='complete')dispatch().catch(fail);else window.addEventListener('load',()=>dispatch().catch(fail),{once:true});
})();
