import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [initialized, setInitialized] = useState(false);
  const [{ ctx, gain }, setState] = useState<{
    ctx: AudioContext | null;
    gain: GainNode | null;
    osc: OscillatorNode | null;
  }>({
    ctx: null,
    gain: null,
    osc: null,
  });

  const handleInit = () => {
    setInitialized(true);
  };

  const handleStart = () => {
    gain!.gain.setValueAtTime(0, 0);
    gain!.gain.linearRampToValueAtTime(.5, ctx!.currentTime + .02);
  };

  const handleStop = () => {
    gain!.gain.setValueAtTime(0.5, ctx!.currentTime + .02);
    gain!.gain.linearRampToValueAtTime(0, ctx!.currentTime + .03);
  };

  useEffect(() => {
    if (initialized) {
      const ctx = new AudioContext();
      const gain = ctx.createGain();
      const osc = ctx.createOscillator();

      setState({
        ctx,
        gain,
        osc,
      })

      console.log(ctx.state);
      gain.gain.value = 0;
      osc.frequency.value = 440;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(0);
    }
  }, [initialized]);

  return (
    <div className="App">
      test
      <button onClick={handleInit} disabled={initialized}>Init</button>
      <button onClick={handleStart} disabled={!initialized}>Start</button>
      <button onClick={handleStop} disabled={!initialized}>Stop</button>
    </div>
  );
}

export default App;
