# Everhoof API
> API for Everhoof internet radio

## Requirements

* NodeJS >= 14.0.0

## Deploying

Clone the repo and install the dependencies.

```bash
git clone --single-branch -b dist https://github.com/everhoof/everhoof_api.git
cd everhoof_api
```

```bash
yarn --frozen-lockfile --prod
```

Update configs.

```bash
cp ormconfig.ex.prod.js ormconfig.js
nano ormconfig.js
```

```bash
cp .env.example .env
nano .env
```

Run migrations.

```bash
yarn orm migrations:run
```

```bash
yarn seed:run
```

Use process manager to start the application.

```bash
pm2 start yarn --name Everhoof_API -- start:prod
pm2 save
```
Application will start on 5500 port.
