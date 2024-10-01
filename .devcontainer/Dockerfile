FROM docker.io/library/node:22.9.0-bookworm@sha256:69e667a79aa41ec0db50bc452a60e705ca16f35285eaf037ebe627a65a5cdf52

# renovate: datasource=npm depName=pnpm versioning=npm
ENV PNPM_VERSION="9.11.0"

RUN corepack enable && \
    corepack prepare "pnpm@$PNPM_VERSION" && \
    pnpm config set store-dir /pnpm/store

ENV PNPM_HOME="/pnpm/bin"
ENV PATH="/pnpm/bin:$PATH"

RUN pnpx playwright install --with-deps && \
    apt-get clean

ENTRYPOINT []
