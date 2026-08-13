(() => {
  'use strict';
  const Recorder = window.MediaRecorder;
  if (!Recorder?.prototype?.start || Recorder.prototype.__ftAudioCompat) return;

  const nativeStart = Recorder.prototype.start;
  Recorder.prototype.start = function(timeslice) {
    const audioOnly = Number(this.stream?.getVideoTracks?.().length || 0) === 0;
    if (audioOnly && Number.isFinite(Number(timeslice)) && Number(timeslice) > 0) {
      document.documentElement.dataset.mediaRecorderAudioFinalChunk = '1';
      return nativeStart.call(this);
    }
    return nativeStart.apply(this, arguments);
  };
  Recorder.prototype.__ftAudioCompat = true;
  window.FrenchTranquilleMediaRecorderCompat = Object.freeze({version:'2.2.1',build:'32.1'});
})();
