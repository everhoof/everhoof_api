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
cp .env .env.local
nano .env
```

Run migrations.

```bash
yarn orm migrations:run
```

Use process manager to start the application.

```bash
pm2 start ecosystem.config.js
pm2 save
```
Application will start on 5500 port.
