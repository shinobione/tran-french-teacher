'use strict';
// Optional screenshots only. Never bypass functional Chrome / safety checks.
const cp=require('node:child_process');
function documentationOnly(paths){
  return Array.isArray(paths) && paths.length>0 && paths.every(p=>
    typeof p==='string' && (p.startsWith('docs/') || /^[^/]+\.md$/.test(p)));
}
function run(){
  if(process.env.GITHUB_EVENT_NAME!=='pull_request'){console.log('true');return;}
  try{
    // Include source deletions when renamed into docs; inspect entire PR diff.
    const raw=cp.execFileSync('git',['diff','--no-renames','--name-only','origin/main...HEAD'],{
      encoding:'utf8',maxBuffer:1024*1024
    });
    const paths=raw.trim().split(/\r?\n/).filter(Boolean);
    const onlyDocs=documentationOnly(paths);
    console.error('[optional capture] changed='+paths.length+' docsOnly='+onlyDocs);
    console.log(onlyDocs?'false':'true');
  }catch(err){
    console.error('[optional capture] cannot prove docs-only, full capture: '+err.message);
    console.log('true');
  }
}
if(require.main===module)run();
module.exports={documentationOnly};
