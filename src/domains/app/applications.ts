import { calculatorConfig } from "./applications/calculator/config";
import { finderConfig } from "./applications/finder/config";
import type { AppConfig } from "./interface";

export const applications: Record<string, AppConfig> = {
  calculator: calculatorConfig,
  Finder: finderConfig
};

export type ApplicationID = keyof typeof applications;
