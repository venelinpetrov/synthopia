export const wave1 = (ctx: AudioContext) => {
    const img = new Float32Array([.2, .1, .9, .9]); // sin
    const real = new Float32Array(img.length); // cos
    return ctx.createPeriodicWave(real, img);
}