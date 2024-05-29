import { calculatorConfig } from './applications/calculator/config';
import { finderConfig } from './applications/finder/config';
import { AppConfig } from './interface';

export const applications: Map<string, AppConfig> = new Map([
  ['calculator', calculatorConfig],
  ['Finder', finderConfig],
]);
