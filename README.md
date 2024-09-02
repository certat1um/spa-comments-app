# SPA comments app

## Project setup

> Install npm packages

```bash
$ npm install
```

> After that create **.env** file with data copied from **.env.example**

## Database setup

> After .env data is filled up with all necessary variables, up postgres container:

```bash
$ docker-compose up -d
```

> Migrate database tables with columns and fill them with data:

```bash
$ npm run migrate
```

```bash
$ npm run seed
```

## Compile and run the project

```bash
$ npm run start
```

```bash
# watch mode
$ npm run dev
```

## Postman / Insomnia

> Test endpoints via Postman / Insomnia. You can import environment from `/postman` directory

## Render Deploy

> Project also deployed on **Render.com**. (requests can be delayed by 50 seconds or more in due to free plan of using Render service)
>
> Base route: `https://url-shortener-api-hdwm.onrender.com`
