FROM docker.io/library/node:23.0.0-bookworm@sha256:12eceafc86e04862a24f9cdbbdbada57fc36644bdc7e0f643e6767866cedeb1c

RUN corepack enable

# Will be replaced by vscode user.
# hadolint ignore=DL3059
RUN userdel node

ENTRYPOINT []
USER vscode
HEALTHCHECK NONE
