# **Server**

### __Need to know before start !!!__
```

- mysql
- wamp
- nodejs
- typescript
- eslint
- jwt

```
---

### Node version
- < 13 **(ts-node can't run in node v13)**

### Prepare the dotenv
- Create .env file in root folder
- Copy the .env.sample code
- Paste into .env

### Run source:
- `npm install`
- Dev: npm run dev
- Product: npm run build

---
### __File Structure__

- `Api`
  - `Routes`
    - `_`
    - Main.ts
  - `Helper`
    - jwt.helper.ts
  - `Middleware`
    - AuthMiddleware.ts
- `Config`
  - Config.ts
- index.ts
- .env
- .babelrc
- .eslintrc.json
- .gitignore
- package.json
- tsconfig.json


----
### __ENDPOINTS__


_Sign In_

---

### Errors??

#### - _Typesciprt or ts-node is not a external/internal command_
===> `npm install -g typescript ts-node`

#### - _Can't find DB_Host DB_Name ..._
===> Look the **Prepare the dotenv** section

#### - _ECONNREFUSED on 127.0.0.1:3306_
===> Check process.env by console.log it to see if it have declare or not

===> If console not work, check the mysql's port in wamp, change into port 3306
