import * as Raaghu from '@waiin/raaghu-react';

const names = Object.keys(Raaghu).filter((name) => name.startsWith('Rds'));
if (names.length === 0) {
  throw new Error('ESM entry exported no Rds* symbols');
}
