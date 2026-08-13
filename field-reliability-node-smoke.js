'use strict';

function assert(ok,msg){if(!ok)throw new Error(msg)}

global.window=global;
global.document={documentElement:{dataset:{}}};
let starts=[];
class FakeRecorder{
  constructor(stream){this.stream=stream}
  start(...args){starts.push(args)}
}
global.MediaRecorder=FakeRecorder;
require('./mediarecorder-ios-compat.js');
new MediaRecorder({getVideoTracks:()=>[]}).start(120);
assert(starts[0].length===0,'audio-only MediaRecorder must finalize on stop, without 120ms timeslice');
new MediaRecorder({getVideoTracks:()=>[{}]}).start(120);
assert(starts[1].length===1&&starts[1][0]===120,'non-audio-only recorder must keep caller timeslice');
assert(document.documentElement.dataset.mediaRecorderAudioFinalChunk==='1','compat marker missing');
console.log('Field reliability MediaRecorder contract OK');
