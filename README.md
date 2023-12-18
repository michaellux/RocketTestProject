
# Monorepo with Turborepo (Nest & Vue)

This project is a minimal boilerplate code setup in 
monorepo architecture using [Turborepo](https://turborepo.org/), containing 2 applications: Vue3 Frontend & Nest JS Backend.

## Deployments
- Frontend: https://nest-vue-turbo.vercel.app
- Backend: https://nest-vue-turbo.herokuapp.com/api

## Core Features

***Frontend***
- Vite
- PWA Support
- Route Guards
- Pinia State Management

***Backend***
- Core Authentication
- JWT Access Token & HTTPOnly Cookie Refresh Token
- Nest JS Route Guards
- Prisma

## Pre-Requisites
- Node
- Yarn
- Docker & Docker-Compose

## Installation

Can copy all this and execute to clone & install

```bash
  git clone https://github.com/ChrisLegaxy/nest-vue-turbo.git \
  && cd nest-vue-turbo \
  && yarn
```

## Setup

```bash
  # copy and replace with your env config
  copy .env.sample .env

  # due to prisma
  copy ./apps/api/.env.sample ./apps/api/.env

  # due to vite
  copy ./apps/web/.env.sample ./apps/web/.env

  docker-compose up -d
```

## Running in DEV

```bash
  # this should bring everything up 
  yarn dev

  # only web
  yarn dev --scope=web

  # only api
  yarn dev --scope=api
```

## Linting

```bash
  yarn lint
```

## Build

```bash
  yarn build
```

## Remote Caching

```bash
  npx turbo login
  
  npx turbo link
```

## Credits & References
 - [Turbo Repo Docs](https://turborepo.org)
 - [Amazing Turborepo Walkthrough](https://www.youtube.com/watch?v=YX5yoApjI3M&t=1s)
 - [Nice Tutorial Both Part 1 & 2](https://www.youtube.com/watch?v=YQLw5kJ1yrQ&t=1005s)
 - [Vite PWA Official & Sample on GitHub](https://vite-plugin-pwa.netlify.app)
 - [Vite PWA Guide](https://rubenr.dev/en/pwa-vite)
 - [Pinia](https://pinia.vuejs.org) (Might taken over VueX, I'm favoring this one)


## Author

> Chris Legaxy/Chris Van
> 
> Contact: chris.legaxy@gmail.com | chrisvan.vshmr@gmail.com
> 
> Website: https://chrisvan.netlify.app
