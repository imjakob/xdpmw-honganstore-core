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
### __API URL__
- __Perfume__
  - __GET__
    - get pagination: `/api/perfume?limit=...&skip=...`
    - get by id: `/api/perfume/single/:id`
    - get all: `/api/perfume/all`
    - get pagination join brand-price-admin: `/api/perfume/join/brand-price-admin?limit=...&skip=...`
    - get all join brand-price-admin: `/api/perfume/join/brand-price-admin/all`
    - get single join brand-price-admin: `/api/perfume/join/brand-price-admin/single/:id`
    - get pagination join brand-price: `/api/perfume/join/brand-price?limit=...&skip=...`
    - get all join brand-price: `/api/perfume/join/brand-price/all`
    - get single join brand-price: `/api/perfume/join/brand-price/single/:id`
  - __POST__
    - Add new an item: `/api/perfume/add`
  - __PUT__
    - Update all row: `/api/perfume/update/id`
  - __PATCH__
    - Update any row: `/api/perfume/patch/id`
  - __DELETE__
    - Delete an item: `/api/perfume/delete/id`
- __Brand__
  - __GET__
    - get pagination: `/api/brand?limit=...&skip=...`
    - get by id: `/api/brand/single/:id`
    - get all: `/api/brand/all`
  - __POST__
    - Add new an item: `/api/brand/add`
  - __PUT__
    - Update all row: `/api/brand/update/id`
  - __DELETE__
    - Delete an item: `/api/brand/delete/id`
- __Price__
  - __GET__
    - get pagination: `/api/price?limit=...&skip=...`
    - get by id: `/api/price/single/:id`
    - get all: `/api/price/all`
    - get current available: `/api/price/current-price`
  - __POST__
  - __PUT__
  - __PATCH__
  - __DELETE__

---

### Errors??

#### - _Typesciprt or ts-node is not a external/internal command_
===> `npm install -g typescript ts-node`

#### - _Can't find DB_Host DB_Name ..._
===> Look the **Prepare the dotenv** section

#### - _ECONNREFUSED on 127.0.0.1:3306_
===> Check process.env by console.log it to see if it have declare or not

===> If console not work, check the mysql's port in wamp, change into port 3306
