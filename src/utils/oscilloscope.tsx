export const drawWave = (analyser: AnalyserNode, ctx: CanvasRenderingContext2D) => {
  const buffer = new Float32Array(1024);
  const width = ctx.canvas.width;

  ctx.strokeStyle = '#1d1';
  ctx.setTransform(1, 0, 0, -1, 0, 75); // flip y-axis and translate to center
  ctx.lineWidth = 2;

  (function loop() {
    analyser.getFloatTimeDomainData(buffer);

    ctx.clearRect(0, -100, width, ctx.canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, buffer[0] * 90);

    for (let x = 2; x < width; x += 2) {
      ctx.lineTo(x, buffer[x] * 90);
    }

    ctx.stroke();

    requestAnimationFrame(loop);
  })();
};

export const initOscilloscope = (analyserNode: AnalyserNode, canvasId: string) => {
  const oscilloscope = document.getElementById(canvasId);
  const canvasContext = (oscilloscope as HTMLCanvasElement).getContext('2d');
  return () => (canvasContext && drawWave(analyserNode, canvasContext));
}