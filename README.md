# Frontin

## Project setup

```sh
npm install
```

### Compiles and hot-reloads for development

```sh
npm run serve
```

### Compiles and minifies for production

```sh
npm run build
```

### Run your tests

```sh
npm run test
```

### Lints and fixes files

```sh
npm run lint
```

## Build Docker image

```sh
docker build --build-arg VUE_APP_CLIENT_URL=https://getlarge.eu --build-arg VUE_APP_LOGGER_LEVEL=2  -t frontin .
```

## Create TLS certificate

```sh
# use sudo if your user is not in docker group
./scripts/helper.sh -c init
# when ready for prod
./scripts/helper.sh -c init -e production getlarge.eu ed@getlarge.eu docker-compose.yml

```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
