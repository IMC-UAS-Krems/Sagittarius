import { AsyncResult, Ok, Err } from "../utils/result";
import fetch from "node-fetch";
import { SSD } from "../bindings/SSD";

type CompileResponse = {
  message: string;
  output: SSD;
  file: string;
};

export const compile = async (code: string): AsyncResult<CompileResponse> => {
  const compileUrl = "http://localhost:8796/compile";

  if (!compileUrl) {
    console.log(`No compiler URL found. Using default compiler.`);
    return Err(new Error("No compiler URL found"));
  }

  const response = await fetch(compileUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(code),
  });

  if (!response.ok) {
    return Err(new Error("Failed to compile code"));
  }

  const compileResponse: CompileResponse = await response.json();

  return Ok(compileResponse);
};
