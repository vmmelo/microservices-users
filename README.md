## Run postgres database

-N: max_connections; default=100

```bash
$ docker run --name postgresql --restart=always --network=postgres-network -e POSTGRES_USER=guest -e POSTGRES_PASSWORD=guest -p 5432:5432 -v /data:/var/lib/postgresql/data -d postgres -N 500
```

## Publish docker image

```bash
$ docker build -f Dockerfile -t authenticator-users-ms .
$ docker login
$ docker tag authenticator-users-ms vmmelo1/authenticator-users-ms
$ docker push vmmelo1/authenticator-users-ms:latest
```