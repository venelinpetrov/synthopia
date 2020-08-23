import React from 'react';
import './App.css';

import { withAudioContext } from './components';
import { wave1 } from './custom_waves';
import { initOscilloscope } from './utils';


function App({ ctx }: { ctx: AudioContext}) {
  const gainNode = ctx.createGain();
  const oscNode = ctx.createOscillator();
  var analyserNode = ctx.createAnalyser();

  gainNode.gain.value = 0;
  oscNode.frequency.value = 240;

  //routing
  oscNode.connect(gainNode);
  gainNode.connect(analyserNode);
  analyserNode.connect(ctx.destination);

  oscNode.setPeriodicWave(wave1(ctx));
  oscNode.start(0);

  const handleStart = () => {
    gainNode.gain.setValueAtTime(0, 0);
    gainNode.gain.linearRampToValueAtTime(.5, ctx.currentTime + .02);
    initOscilloscope(analyserNode, 'scope');
  };

  const handleStop = () => {
    gainNode.gain.setValueAtTime(0.5, ctx.currentTime + .02);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + .03);
  };

  return (
    <div className="App">
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
      </div>
      <canvas id='scope'></canvas>
    </div>
  );
}

export default withAudioContext(App);
