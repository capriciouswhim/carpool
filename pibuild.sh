sudo podman build -t carpool/client:latest -f Dockerfile.client .
sudo podman build -t carpool/server:latest -f Dockerfile.server .
podman pod create --name carpool -p 8080:80 -p 8081:8081
podman run --pod carpool -d --name carpool-client carpool/client:latest
podman run --pod carpool -d --name carpool-server carpool/server:latest
