# Development build
FROM node:20-bookworm-slim AS development

WORKDIR /usr/src/dev

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

RUN mkdir -p /usr/src/dev/dist && chown -R node:node /usr/src/dev

USER node

COPY . .

CMD ["npm", "run", "dev"]


# Production build
FROM node:20-bookworm-slim AS production

WORKDIR /usr/src/prod

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

RUN addgroup --system --gid 1001 nodep
RUN adduser --system --uid 1001 apijs

RUN mkdir dist
RUN chown apijs:nodep dist

COPY . .

CMD ["npm", "run", "start"]
