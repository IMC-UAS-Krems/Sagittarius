import { run } from "./src/api";

run().catch((error) => console.error(`Error: ${error.message}`));
