#!/bin/sh
podman build -t carpool/server:latest -f Dockerfile.server .
podman build -t carpool/client:latest -f Dockerfile.client .
podman run -d -p 8081:8081 --name carpool-server carpool/server:latest
podman run -d -p 8080:80 --name carpool-client carpool/client:latest