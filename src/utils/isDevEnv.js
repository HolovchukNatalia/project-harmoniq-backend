import { getEnvVar } from './getEvnVar.js';

export function isDevEnv() {
  return getEnvVar('ENVIRONMENT', 'production') === 'development';
}
