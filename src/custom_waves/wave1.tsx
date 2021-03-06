export const wave1 = (ctx: AudioContext) => {
    const img = new Float32Array([1, 0, .2, .1]); // sin
    const real = new Float32Array(img.length); // cos
    return ctx.createPeriodicWave(real, img);
}