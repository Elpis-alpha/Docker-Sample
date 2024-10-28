## A Sample Full Stack Docker App

### Startup and build
- `docker compose -f docker-compose.yml up --build` to build and start the development container
- `docker compose -f docker-compose.prod.yml up --build` to build and start the production container

### Nginx config
- Edit `/nginx/nginx.conf` to edit development nginx settings. It defaults to [localhost](http://localhost/)
- Edit `/nginx/nginx.prod.conf` to edit production nginx settings.

### Mongodb config
- Use [mongodb://localhost:27018/](mongodb://localhost:27018/) to access the db in development
- Production db is not exposed to external access
