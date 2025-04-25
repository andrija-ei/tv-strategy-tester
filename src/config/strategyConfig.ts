import { StrategyConfig } from "../types";

export const strategyConfig: StrategyConfig[] = [
  {
    name: "OL Condition - open",
    trigger: "OL Condition",
    price_source: "open",
  },
  {
    name: "OL Condition - high",
    trigger: "OL Condition",
    price_source: "high",
  },
  {
    name: "OL Condition - low",
    trigger: "OL Condition",
    price_source: "low",
  },
  {
    name: "OL Condition - close",
    trigger: "OL Condition",
    price_source: "close",
  },
];
