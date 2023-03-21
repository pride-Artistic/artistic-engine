export default {
  EaseInSine: (p: number) => 1 - Math.cos((p * Math.PI) / 2),
  EaseOutSine: (p: number) => Math.sin((p * Math.PI) / 2),
  EaseInOutSine: (p: number) => -(Math.cos(Math.PI * p) - 1) / 2,
};
