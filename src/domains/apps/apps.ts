import { calculatorConfig } from './calculator/config';
import { AppConfig } from './interface';

export const applications: Map<string, AppConfig> = new Map([
  ['calculator', calculatorConfig],
]);
