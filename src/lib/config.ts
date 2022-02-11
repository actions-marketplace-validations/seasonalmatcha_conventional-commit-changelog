import { Config } from '../types';

export const getConfig = (configFile: string): Config => {
  const { typeLabels, sortOrder } = require(configFile);
  return { typeLabels, sortOrder };
};
