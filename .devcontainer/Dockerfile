FROM mcr.microsoft.com/devcontainers/javascript-node:1.1.5-22-bookworm

# renovate: datasource=npm depName=pnpm versioning=npm
ENV PNPM_VERSION="9.12.1"

RUN corepack enable && \
    corepack prepare "pnpm@$PNPM_VERSION" && \
    pnpm config set store-dir /pnpm/store

ENV PNPM_HOME="/pnpm/bin"
ENV PATH="/pnpm/bin:$PATH"

# renovate: datasource=npm depName=playwright versioning=npm
ENV PLAYWRIGHT_VERSION="1.48.0"

RUN pnpm dlx "playwright@$PLAYWRIGHT_VERSION" install --with-deps chromium && \
    apt-get clean

USER node
HEALTHCHECK NONE
