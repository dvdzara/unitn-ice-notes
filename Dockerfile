FROM registry.zrnt.dev/oci/base:v1.1.6 AS builder

WORKDIR /srv
COPY package.json pnpm-lock.yaml .
RUN pnpm install

COPY . .
RUN pnpm run build

FROM docker.io/library/caddy:2.8.4-alpine

COPY --from=builder /srv/dist /srv
WORKDIR /srv

EXPOSE 3000
ENTRYPOINT ["caddy", "file-server", "--listen=:3000"]
