import { serve } from 'https://deno.land/std@0.50.0/http/server.ts';

const aServer = serve({port: 8000});
console.log('>>> server: ', aServer);
console.log('local, port 8000: ');

for await (const req of aServer) {
  console.log('>> request arrived');
  // console.log('>> request arrived: ', req);
  console.log('>> answering req...');
  req.respond({body: 'Hello!\n'});
}
