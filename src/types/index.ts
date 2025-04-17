export type StrategyConfig = {
  name: string;
  OL_LEG3_EN: boolean;
  OL_LEG3_PRICE_DOWN: number;
  OL_LEG3_ORDER: number;
  OL_LEG1_SUB_TRIGGER: "OLC" | "OLC2" | "OLC2_3" | "OLC2_3_4" | "OLC2_4";
};
