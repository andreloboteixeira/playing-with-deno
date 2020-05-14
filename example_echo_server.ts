// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
const hostname = "0.0.0.0";
const port = 8080;
const listener = Deno.listen({ hostname, port });
console.log(`Listening on ${hostname}:${port}`);
for await (const conn of listener) {
  console.log('>>> inside for, listener: ', listener);
  console.log('>>> inside for, conn: ', conn);
  Deno.copy(conn, conn);
}