FROM registry.zrnt.dev/oci/base:v1.1.8@sha256:ac1ff3bdd0e5c9dc0e90e63e3b9a311987f922346f0b27532073f9e02815a576 AS builder

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
