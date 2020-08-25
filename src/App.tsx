import React, { useCallback } from 'react';
import './App.css';

import { withAudioContext, useMidi, IMidi } from './components';
import { wave1 } from './custom_waves';
import { noteToFreq} from './utils';


function App({ ctx }: { ctx: AudioContext}) {

  const gainNode = ctx.createGain();
  const oscNode = ctx.createOscillator();
  const analyserNode = ctx.createAnalyser();

  gainNode.gain.value = 0;
  oscNode.frequency.value = 240;
  //routing
  oscNode.connect(gainNode);
  gainNode.connect(analyserNode);
  analyserNode.connect(ctx.destination);

  oscNode.setPeriodicWave(wave1(ctx));
  oscNode.start(0);

  const handleNoteOn = useCallback<IMidi['onNoteOn']>(e => {
    gainNode.gain.setValueAtTime(0, 0);
    gainNode.gain.linearRampToValueAtTime(.5, ctx.currentTime + .02);
    oscNode.frequency.value = noteToFreq(e.data[1]);
  }, [gainNode, ctx.currentTime, oscNode.frequency.value]);

  const handleNoteOff = () => {
    gainNode.gain.cancelScheduledValues(0);
    gainNode.gain.setValueAtTime(0.5, ctx.currentTime + .02);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + .03);
  };
  useMidi({
    onNoteOn: e => handleNoteOn(e),
    onNoteOff: handleNoteOff,
  });
  return (
    <div className="App">
      <div className="ControlPanel">
        synth ui
      </div>
      {/* <canvas id='Scope'></canvas> */}
    </div>
  );
}

export default withAudioContext(App);
