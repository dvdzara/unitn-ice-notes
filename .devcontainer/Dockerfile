FROM mcr.microsoft.com/devcontainers/javascript-node:1.1.5-22-bookworm@sha256:61c3428ca51d3e899b4d2850e0395fd72d67c7e7de5139c9a9d7d6e2843e3284

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
