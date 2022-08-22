import type { RuleSetRule } from 'webpack';

export type TWebpackRulesUseData = {
  resource: string;
  realResource: string;
  resourceQuery: string;
  issuer: string;
  compiler: string;
};

export type TLoadersSet = {
  client: RuleSetRule;
  server: RuleSetRule;
};
