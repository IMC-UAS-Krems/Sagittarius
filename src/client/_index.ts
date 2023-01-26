import { AppRouter } from "sagittarius-server/src/trpc";
import { createTRPCClient } from "@trpc/client";
import AbortController from "abort-controller";
import fetch from "node-fetch";
import { SHA3 } from "crypto-js";

// @ts-ignore
global.AbortController = AbortController;
global.fetch = fetch as any;

const url = "http://localhost:8080/api";

console.log(`Starting sagittarius-client at ${url}`);

const makeUser = async (data: { email: string; password: string }) => {
  const client = createTRPCClient<AppRouter>({
    url,
  });

  const { email, password } = data;

  const pw = SHA3(password).toString().substring(10, 99);

  console.log(`REGISTRATION PASSWORD: ${pw}`);

  const user = await client.mutation("register", {
    email: email,
    password: pw,
  });

  if (user.isErr) {
    console.log(`[ ERR ]: ${JSON.stringify(user.error)}`);
  } else {
    console.log(`[ USER ]: ${JSON.stringify(user.value)}`);
  }
};

const loginUser = async (data: { email: string; password: string }) => {
  const client = createTRPCClient<AppRouter>({
    url,
  });

  const { email, password } = data;

  const pw = SHA3(password).toString().substring(10, 99);

  const user = await client.query("login", {
    email: email,
    password: pw,
  });

  if (user.isErr) {
    console.log(`[ ERR ]: ${JSON.stringify(user.error)}`);
  } else {
    console.log(`[ USER ]: ${JSON.stringify(user.value)}`);
  }
};

const logOutUser = async () => {
  const client = createTRPCClient<AppRouter>({
    url,
  });

  const _ = await client.query("logout");
};

async function test() {
  console.log("[ CREATING USER ]\n");

  await makeUser({
    email: "email@example6.com",
    password: "password123",
  })
    .catch((error) => console.error(`Error: ${error.message}`))
    .then(async () => {
      console.log("[ LOGGING OUT ]\n");
      await logOutUser().catch((error) =>
        console.error(`Error: ${error.message}`)
      );
    })
    .then(async () => {
      console.log("[ LOGGING IN ]\n");
      await loginUser({
        email: "email@example6.com",
        password: "password123",
      }).catch((error) => console.error(`Error: ${error.message}`));
    });
}

test()
  .catch((error) => console.error(`Error: ${error.message}`))
  .finally(() => {
    console.log("Done");
  });
