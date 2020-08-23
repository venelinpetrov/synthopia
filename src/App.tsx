import React from 'react';
import './App.css';

import { withAudioContext } from './components';

function App({ ctx }: { ctx: AudioContext}) {
  const gain = ctx.createGain();
  const osc = ctx.createOscillator();

  gain.gain.value = 0;
  osc.frequency.value = 440;
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(0);

  const handleStart = () => {
    gain!.gain.setValueAtTime(0, 0);
    gain!.gain.linearRampToValueAtTime(.5, ctx.currentTime + .02);
  };

  const handleStop = () => {
    gain!.gain.setValueAtTime(0.5, ctx.currentTime + .02);
    gain!.gain.linearRampToValueAtTime(0, ctx.currentTime + .03);
  };

  return (
    <div className="App">
      test
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
}

export default withAudioContext(App);
