# Current Deployment Process

git clone https://github.com/capriciouswhim/carpool.git carpool-prod

## API

The API must be built for the deployment architecture,
particularly in regards to the Prisma client.

```
pushd api
yarn install
yarn prisma generate
yarn prisma migrate deploy
popd
```

## WEB

The WEB deployment folder must be built.

```
pushd web
yarn install
yarn build
popd
```

## SYSTEMD

A **systemd** service file is included to launch the API.
We link to it from the default.target.wants folder.

``` sh
sudo ln -s carpool.service /etc/systemd/system/default.target.wants/carpool.service
sudo systemctl daemon-reload
```

## WEB

A **nginx** configuration file is included to host the
web site and reverse proxy API calls.  We link to it from
the sites-enabled folder.

This file will need to be edited to point to SSL certificates.

``` sh
sudo ln -s carpool.nginx /etc/nginx/sites-enabled/carpool.nginx
sudo ln -s $HOME/carpool-prod/web/dist/carpool-web/browser /var/www/html/carpool
```

## SHUTDOWN

``` sh
sudo systemctl service stop nginx
sudo systemctl service stop carpool
```

## STARTUP

``` sh
sudo systemctl service start nginx
sudo systemctl service start carpool
```
