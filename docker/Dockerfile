FROM registry.zrnt.dev/oci/base:v1.1.6@sha256:02b09f8c673594faa4634cdaccfb1dcf24790c2c8195d394d6bf4045811a1f32 AS builder

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
