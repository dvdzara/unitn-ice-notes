FROM docker.io/library/node:22.9.0-alpine@sha256:c9bb43423a6229aeddf3d16ae6aaa0ff71a0b2951ce18ec8fedb6f5d766cf286

# renovate: datasource=repology depName=alpine_3_20/git versioning=loose
ENV GIT_VERSION="2.45.2-r0"
# renovate: datasource=repology depName=alpine_3_20/gpg versioning=loose
ENV GPG_VERSION="2.4.5-r0"

RUN apk add --no-cache \
  git="$GIT_VERSION" \
  gpg="$GPG_VERSION"

# renovate: datasource=npm depName=pnpm versioning=npm
ENV PNPM_VERSION="9.11.0"

RUN corepack enable && corepack prepare "pnpm@$PNPM_VERSION" && pnpm config set store-dir /pnpm/store

ENV PNPM_HOME="/pnpm/bin"
ENV PATH="/pnpm/bin:$PATH"

ENTRYPOINT []
