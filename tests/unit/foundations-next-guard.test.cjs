const fs=require('fs');
const path=require('path');

const pilot=fs.readFileSync(path.join(process.cwd(),'src/pedagogy/foundations-pilot.js'),'utf8');
const engine=fs.readFileSync(path.join(process.cwd(),'src/pedagogy/foundations-capsule-engine.js'),'utf8');

function assert(condition,message){if(!condition)throw new Error(message)}

assert(engine.includes("if (!state.answered) fail('question requires an answer before NEXT');"),'engine must keep strict NEXT guard');
assert(pilot.includes("function next(){if(session?.phase==='question'&&!session?.answered)return;session=engine.reduce(activeCapsule,session,{type:'NEXT'});renderOverlay()}"),'UI adapter must ignore premature NEXT while question is unanswered');
assert(pilot.includes("session?.answered||button.dataset.foundationBusy==='1'"),'answer handler must reject duplicate taps');
assert(pilot.includes("button.dataset.foundationBusy='1'"),'answer handler must mark the tap busy before reducing');

console.log('foundations-next-guard: ok');
