import { client } from "../auth/apiRouter";
import { AsyncResult, Err, Ok } from "sagittarius-server/src/utils/result";
// import { SSD } from "sagittarius-server/src/bindings/SSD";

export async function compile(code: string): AsyncResult<string> {
  const result = await client.mutation("compile", { code });

  if (result.isErr) {
    console.log(`Failed to compile code: ${result.error.message}`);
    return Err(result.error);
  }

  console.log(
    `Compilation was successful.\n\
    Output:\n\
    ${JSON.stringify(result.value.output, null, 2)}`
  );
  return Ok(result.value.file);
}
