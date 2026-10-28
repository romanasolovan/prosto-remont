import * as migration_20260511_131234 from './20260511_131234';
import * as migration_20260923_173000_reviews_review_type from './20260923_173000_reviews_review_type';
import * as migration_20261028_143041 from './20261028_143041';

export const migrations = [
  {
    up: migration_20260511_131234.up,
    down: migration_20260511_131234.down,
    name: '20260511_131234',
  },
  {
    up: migration_20260923_173000_reviews_review_type.up,
    down: migration_20260923_173000_reviews_review_type.down,
    name: '20260923_173000_reviews_review_type',
  },
  {
    up: migration_20261028_143041.up,
    down: migration_20261028_143041.down,
    name: '20261028_143041'
  },
];
