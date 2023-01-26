import { Result as _Result } from "@badrap/result";

export const Ok = <T>(value: T) => _Result.ok(value);
export const Err = <E extends Error>(error: E) => _Result.err(error);
export type Result<T> = _Result.Ok<T, Error> | _Result.Err<T, Error>;
export type AsyncResult<T> = Promise<Result<T>>;
