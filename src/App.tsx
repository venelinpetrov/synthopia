import React from 'react';
import './App.css';

import { withAudioContext } from './components';
import { wave1 } from './custom_waves';
import { drawWave } from './utils'


function App({ ctx }: { ctx: AudioContext}) {
  const gain = ctx.createGain();
  const osc = ctx.createOscillator();
  var analyser = ctx.createAnalyser();

  gain.gain.value = 0;
  osc.frequency.value = 240;

  //routing
  osc.connect(gain);
  gain.connect(analyser);
  analyser.connect(ctx.destination);

  osc.setPeriodicWave(wave1(ctx));
  osc.start(0);

  const handleStart = () => {
    gain!.gain.setValueAtTime(0, 0);
    gain!.gain.linearRampToValueAtTime(.5, ctx.currentTime + .02);
    var c = document.getElementById('scope'),
      canvasContext = (c as HTMLCanvasElement).getContext("2d");
    drawWave(analyser, canvasContext!);
  };

  const handleStop = () => {
    gain!.gain.setValueAtTime(0.5, ctx.currentTime + .02);
    gain!.gain.linearRampToValueAtTime(0, ctx.currentTime + .03);
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
