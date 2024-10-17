FROM docker.io/library/node:23.0.0-bookworm@sha256:4ca0770b829ec8adf901e6e6046737d961f78411bd664774f1fc04b1b4cd73f6

RUN corepack enable

# Will be replaced by vscode user.
# hadolint ignore=DL3059
RUN userdel node

ENTRYPOINT []
USER vscode
HEALTHCHECK NONE
