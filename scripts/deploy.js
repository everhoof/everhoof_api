// eslint-disable-next-line @typescript-eslint/no-var-requires
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
  (e) => {
    if (e) {
      console.log(e);
    }
  },
);
