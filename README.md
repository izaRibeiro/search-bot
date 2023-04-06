<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

Project build with the NestJs framwork. To learn more, just access the link [Nest](https://github.com/nestjs/nest)


## Description

Project with the objective of searching for the price quotation of the site [letsbook](https://pratagy.letsbook.com.br).
In summary, the service receives the desired dates and performs an automatic search through a crawler.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Running the app with docker

```bash
# creating an image
$ docker build .

# running the container
$ docker run -p 80:80 {IMAGE_ID}
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
## Swagger Documentation

```bash
# Just put the project url with the /api path
$ http://localhost:{PORT}/api

```

## Stay in touch

- Author - [Izabella Ribeiro](https://github.com/izaRibeiro)

