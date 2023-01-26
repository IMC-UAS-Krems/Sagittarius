import noop from "noop-ts";

export const ignore = (...args: any[]) => {
  noop(args);
};
