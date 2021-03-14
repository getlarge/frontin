# Frontin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

## Build Docker image

```
docker build --build-arg VUE_APP_CLIENT_URL=https://getlarge.eu --build-arg VUE_APP_LOGGER_LEVEL=2  -t frontin .
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
