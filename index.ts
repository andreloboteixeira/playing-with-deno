import { Application } from 'https://deno.land/x/oak/mod.ts';

import { Router } from "https://deno.land/x/oak/mod.ts";


// ==== model
interface User {
  id: string;
  name: string;
  role: string;
  createdAt: Date;
}

// ================ config environment 
const APP_HOST = Deno.env.get('APP_HOST') ||  '127.0.0.1';
const APP_PORT = Deno.env.get('APP_PORT') ||  4000;
const DB_PATH = Deno.env.get('DB_PATH') ||  './db/users.json';
console.log('>> Env vars: ');
console.log({APP_HOST, APP_PORT, DB_PATH});


// ============= router definitions
const router = new Router();

router
  .get('/', (context) => { context.response.body = 'Hello!'; })
  .get('/users', async (context) => {
    try {
      
      // read from "database"
      const usersBytes = await Deno.readFile(DB_PATH)
      const decoder = new TextDecoder();
      const decodedData = decoder.decode(usersBytes);
      
      // parse data (service might do it, as interact with database)
      const users = JSON.parse(decodedData) as User[];
      users.sort((aUser, anotherUser) => { // sort by date createdAt
        const aUserCreatedAt = new Date(aUser.createdAt);
        const anotherUserCreatedAt = new Date(anotherUser.createdAt);
        
        return aUserCreatedAt.getTime() - anotherUserCreatedAt.getTime();
      });

      // send response
      context.response.body = users;
    } catch(err) {
      console.error(err);
    }
    
  });


// ====== APP
const app = new Application();

// middleware definition
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port ${APP_PORT}...`);

await app.listen(`${APP_HOST}:${APP_PORT}`);