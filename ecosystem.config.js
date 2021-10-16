module.exports = {
  apps: [
    {
      name: 'Everhoof_API',
      script: 'yarn',
      args: 'start:prod',
      interpreter: 'none',
      instances: 1,
      autorestart: true,
    },
  ],
};
