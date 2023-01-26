type VoidFun = (...args: any[]) => void;

export function throttle(func: VoidFun, waitingWindow: number): VoidFun {
  let lastTime = 0;
  return function (...args: any[]) {
    const now = Date.now();
    if (now - lastTime >= waitingWindow) {
      func(...args);
      lastTime = now;
    }
  };
}
