FROM docker.io/library/node:23.0.0-bookworm@sha256:ee15fc1b7ee0e8352e37a58669c465ad2b94c864d209cc18619d4511808407c0

RUN corepack enable

# Will be replaced by vscode user.
# hadolint ignore=DL3059
RUN userdel node

ENTRYPOINT []
USER vscode
HEALTHCHECK NONE
