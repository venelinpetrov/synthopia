import React, { useState, useEffect } from "react";

export const withAudioContext = (Component: React.FC<{ctx: AudioContext}>) => {

  return () => {
    const [initialized, setInitialized] = useState(false);
    const [ctx, setCtx] = useState<AudioContext | null>(null);

    const initialize = () => setInitialized(true);

    useEffect(() => {
      if (!initialized) {
        const ctx = new AudioContext();
        setCtx(ctx);
      }

    }, [initialized]);

    return initialized ? <Component ctx={ctx!} /> : <button onClick={initialize}>Init</button>;
  }
};
