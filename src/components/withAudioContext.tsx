import React, { useState, useEffect } from "react";

export interface WithAudioContextProps {
  ctx: AudioContext;
};

export const withAudioContext =
  <T extends {}>(Component: React.ComponentType<T & WithAudioContextProps>, ...rest: any) => {

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

    return initialized ? <Component ctx={ctx!} {...rest} /> : <button onClick={initialize}>Init</button>;
  }
};
