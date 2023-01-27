# S²AGittarius (Smart Service Architecture Generator)

![S²AGittarius banner](media/banner.svg?raw=true "banner")

## Introduction

S²AGittarius is a monorepo project containing a [Vuejs client app](src/client/src/App.vue), which hosts the code editor, and an [Express](src/server/src/api.ts) app which handles authentication, data storage and redirection towards the [compiler](https://github.com/UnknownEquineCoder/SSDL-Language).

## Architecture

The repository hosts both projects, as required by [tRPC](https://trpc.io) to add Types to the Vuejs client.
The main goal of the following architecture is to make the project:

- Type-safe
- Flexible
- Lightweight

#### Server

The server is built using the following architecture:

- A [supabase](https://supabase.com) instance is delegated for data storage, all data is stored using PostgreSQL.
- A [prisma](https://www.prisma.io) schema is defined inside the app, so no raw SQL is ever used, only Typescript.
- A [tRPC](https://trpc.io) Rest API is responsible for routing (such routes are also exposed in the client).
- An [express](https://expressjs.com) http server runs the app and exposes it to the web.

#### Client

The client is built using the following architecture:

- A [Vuejs](https://vuejs.org) App, which handles routing and all user management interactions.
- A [monaco editor](https://microsoft.github.io/monaco-editor/) interface for code editing.


## PULL FROM SUBMODULES
```shell
$ git submodule update --remote

$ git commit -m "merged updates"

$ git push 
```

## Running

#### Server

##### node

```shell
$ npm run start
```

##### yarn

```shell
$ yarn start
```

##### bun

```shell
$ bun run start
```

&nbsp;

#### Client

##### node

```shell
$ npm run serve
```

##### yarn

```shell
$ yarn serve
```

##### bun

```shell
$ bun run serve
```

&nbsp;

## Copyright

Antonino Rossi aka [UnknownEquineCoder](https://github.com/UnknownEquineCoder)  
Logos and banners courtesy of [Lily](https://lilyoko.myportfolio.com)
