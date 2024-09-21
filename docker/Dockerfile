FROM registry.zrnt.dev/oci/base:v1.1.9@sha256:56273b54431b31471aa67acdaa6d7c6a987c031e516e6928baa9cdfeea1b5f8d AS builder

WORKDIR /srv
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm run build

FROM docker.io/library/caddy:2.8.4-alpine@sha256:33937b9d51461ea87794350c1c09ce53f327802508929d78f3b5642533f2f7db

COPY --from=builder /srv/dist /srv
COPY docker/Caddyfile /etc/caddy/Caddyfile
WORKDIR /srv

EXPOSE 3000
