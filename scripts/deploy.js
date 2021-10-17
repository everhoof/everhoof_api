// eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-extraneous-dependencies
const ghpages = require('gh-pages');

ghpages.publish(
  '.',
  {
    src: [
      'dist/**/*',
      '.env',
      'env.js',
      'ormconfig.js',
      'package.json',
      'yarn.lock',
      'tsconfig.json',
      'tsconfig.build.json',
    ],
    branch: 'dist',
  },
  (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  },
);
