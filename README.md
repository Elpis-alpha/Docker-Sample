## A Sample Full Stack Docker App

### Startup and build
- Update `name` in `docker-compose.yml` and `docker-compose.prod.yml` before starting
- DO NOT specify `container_name` as that can cause clashes
- `docker compose -f docker-compose.yml up --build` to build and start the development container
- `docker compose -f docker-compose.prod.yml up --build` to build and start the production container

### Nginx config
- Edit `/nginx/nginx.conf` to edit development nginx settings. Frontend defaults to [http://localhost](http://localhost) and backend defaults to [http://api.localhost](http://api.localhost) 
- Edit `/nginx/nginx.prod.conf` to edit production nginx settings.

### Mongodb config
- Use [mongodb://localhost:27018](mongodb://localhost:27018) to access the db in development
- Production db is not exposed to external access

### Front-end changes
- Compare `next.config.ts` and make neccessary changes
- Add `predev` script
- Add `Dockerfile` file
- Add `.dockerignore` file
- Use `node:20-buster` if neccessary and install the relevant packages
- Include ports for `3000` if neccessary

### Back-end changes
- Update `tsconfig` file by adding `watchOptions` alongside `compilerOptions`
- Add `Dockerfile` file
- Add `.dockerignore` file
- Update `package.json` file by adding all neccessary scripts
- Update `package.json` file by adding all neccessary scripts
- Run `npm i -D rimraf concurrently`
- Mongodb connection string should be: `mongodb://mongo-db:27017/<app-name>`
