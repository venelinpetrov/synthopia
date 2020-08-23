//draw function for canvas
export const drawWave = (analyser: AnalyserNode, ctx: CanvasRenderingContext2D) => {
  const buffer = new Float32Array(1024),
    w = ctx.canvas.width;

  ctx.strokeStyle = "#1d1";
  ctx.setTransform(1, 0, 0, -1, 0, 100.1); // flip y-axis and translate to center
  ctx.lineWidth = 2;

  (function loop() {
    analyser.getFloatTimeDomainData(buffer);

    ctx.clearRect(0, -100, w, ctx.canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, buffer[0] * 90);
    for (let x = 2; x < w; x += 2) {
      ctx.lineTo(x, buffer[x] * 90);
    }
    ctx.stroke();

    requestAnimationFrame(loop);
  })();
}