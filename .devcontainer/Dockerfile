FROM docker.io/library/node:22.9.0-bookworm@sha256:69e667a79aa41ec0db50bc452a60e705ca16f35285eaf037ebe627a65a5cdf52

RUN corepack enable

# Will be replaced by vscode user.
# hadolint ignore=DL3059
RUN userdel node

USER vscode
HEALTHCHECK NONE
