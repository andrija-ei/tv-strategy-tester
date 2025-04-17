import { StrategyConfig } from "../types";

export const strategyConfigs: StrategyConfig[] = [
  {
    name: "default",
    OL_LEG3_EN: true,
    OL_LEG3_PRICE_DOWN: 2,
    OL_LEG3_ORDER: 0.5,
    OL_LEG1_SUB_TRIGGER: "OLC",
  },
  {
    name: "trigger-olc3",
    OL_LEG3_EN: false,
    OL_LEG3_PRICE_DOWN: 10,
    OL_LEG3_ORDER: 1.0,
    OL_LEG1_SUB_TRIGGER: "OLC2_3",
  },
  {
    name: "trigger-olc4",
    OL_LEG3_EN: true,
    OL_LEG3_PRICE_DOWN: 50,
    OL_LEG3_ORDER: 2.0,
    OL_LEG1_SUB_TRIGGER: "OLC2_4",
  },
];
