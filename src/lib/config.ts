import { Config } from '../types';

export const getConfig = (configFile: string): Config => {
  const { typeLabels, sortOrder, emptyMessage } = require(configFile);
  return { typeLabels, sortOrder, emptyMessage };
};
