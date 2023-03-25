const EaseOutBounce = (p: number) => {
  const d1 = 2.75;
  const c1 = p * 2.75;
  return (
    (c1 < 1
      ? p * p
      : c1 < 2
      ? (p -= 1.5 / d1) * p + 0.75
      : c1 < 2.5
      ? (p -= 2.25 / d1) * p + 0.9375
      : (p -= 2.625 / d1) * p + 0.984375) * 7.5625
  );
};

export default {
  EaseInSine: (p: number) => 1 - Math.cos((p * Math.PI) / 2),
  EaseOutSine: (p: number) => Math.sin((p * Math.PI) / 2),
  EaseInOutSine: (p: number) => -(Math.cos(Math.PI * p) - 1) / 2,
  EaseInExpo: (p: number) => (p === 0 ? 0 : Math.pow(2, 10 * p - 10)),
  EaseOutExpo: (p: number) => (p === 1 ? 1 : 1 - Math.pow(2, -10 * p)),
  EaseInOutExpo: (p: number) =>
    p === 0
      ? 0
      : p === 1
      ? 1
      : p < 0.5
      ? Math.pow(2, 20 * p - 10) / 2
      : (2 - Math.pow(2, -20 * p + 10)) / 2,
  EaseInCirc: (p: number) => 1 - Math.sqrt(1 - Math.pow(p, 2)),
  EaseOutCirc: (p: number) => Math.sqrt(1 - Math.pow(p - 1, 2)),
  EaseInOutCirc: (p: number) =>
    p < 0.5
      ? (1 - Math.sqrt(1 - Math.pow(2 * p, 2))) / 2
      : (Math.sqrt(1 - Math.pow(-2 * p + 2, 2)) + 1) / 2,
  EaseInBack: (p: number) => Math.pow(p, 2) * (2.70158 * p - 1.70158),
  EaseOutBack: (p: number) =>
    1 + Math.pow(p - 1, 2) * (2.70158 * (p - 1) + 1.70158),
  EaseInOutBack: (p: number) =>
    (p < 0.5
      ? Math.pow(2 * p, 2) * (7.189819 * p - 2.5949095)
      : Math.pow(2 * p - 2, 2) * (3.5949095 * (p * 2 - 2) + 2.5949095) + 2) / 2,
  EaseInElastic: (p: number) =>
    p === 0
      ? 0
      : p === 1
      ? 1
      : -Math.pow(2, 10 * p - 10) *
        Math.sin(((p * 10 - 10.75) * (2 * Math.PI)) / 3),
  EaseOutElastic: (p: number) =>
    p === 0
      ? 0
      : p === 1
      ? 1
      : Math.pow(2, -10 * p) * Math.sin(((p * 10 - 0.75) * (2 * Math.PI)) / 3) +
        1,
  EaseInOutElastic: (p: number) =>
    p === 0
      ? 0
      : p === 1
      ? 1
      : p < 0.5
      ? -(
          Math.pow(2, 20 * p - 10) *
          Math.sin(((20 * p - 11.125) * (2 * Math.PI)) / 4.5)
        ) / 2
      : (Math.pow(2, -20 * p + 10) *
          Math.sin(((20 * p - 11.125) * (2 * Math.PI)) / 4.5)) /
          2 +
        1,
  EaseInBounce: (p: number) => 1 - EaseOutBounce(1 - p),
  EaseOutBounce,
  EaseInOutBounce: (p: number) =>
    p < 0.5
      ? (1 - EaseOutBounce(1 - 2 * p)) / 2
      : (1 + EaseOutBounce(2 * p - 1)) / 2,
};
