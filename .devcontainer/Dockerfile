FROM docker.io/library/node:22.9.0-bookworm

RUN corepack enable

RUN usermod -aG wheel 1000

USER 1000
HEALTHCHECK NONE
