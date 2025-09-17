# New Deployment Process

Docker files have been created for client and server.  These have been tested
and work on pop-os, but builds on Raspberry Pi platforms have failed and are
being investigated.  An nginx configuration is included to proxy to the
containers.

# Old Deployment Process

git clone https://github.com/capriciouswhim/carpool.git carpool-prod

## SERVER

The server must be built for the deployment architecture,
particularly in regards to the Prisma client.

```
pushd server
yarn install
yarn prisma generate
yarn prisma migrate deploy
popd
```

## CLIENT

The CLIENT deployment folder must be built.

```
pushd client
yarn install
yarn build
popd
```

## SYSTEMD

A **systemd** service file is included to launch the server.
We link to it from the default.target.wants folder.

``` sh
chmod +x start.api
sudo ln -s carpool.service /etc/systemd/system/default.target.wants/carpool.service
sudo systemctl daemon-reload
```

## NGINX

A **nginx** configuration file is included to host the
web site and reverse proxy API calls.  We link to it from
the sites-enabled folder.

This file will need to be edited to point to SSL certificates.

``` sh
sudo ln -s carpool.nginx /etc/nginx/sites-enabled/carpool.nginx
sudo ln -s $HOME/carpool-prod/client/dist/carpool-client/browser /var/www/html/carpool
```

## SHUTDOWN

``` sh
sudo systemctl service stop nginx
sudo systemctl service stop carpool
```

## STARTUP

``` sh
sudo systemctl service start carpool
sudo systemctl service start nginx
```

## UPDATES

As you have likely edited the systemd service file,
the nginx site file, or the startup script, we stash
these changes before fetching and merging changes.

*Stop both services according to **SHUTDOWN** above
git stash
git fetch
git pull
git stash pop

*Rebuild API and WEB according to respective sections above

*Start both services according to **STARTUP** above