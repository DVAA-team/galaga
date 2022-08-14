// eslint-disable-next-line import/no-extraneous-dependencies
import { parse } from 'qs';

export const queryParser = (query: string) => {
  return parse(query, {
    decoder: (str) => {
      return decodeURIComponent(str);
    },
  });
};
