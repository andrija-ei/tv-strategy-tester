export type StrategyConfig = {
  name: string;
  trigger: Trigger;
  price_source: PriceSource;
};

export type PriceSource = "open" | "high" | "low" | "close";

export type Trigger =
  | "OL Condition"
  | "OLC2"
  | "OLC2 or OLC3"
  | "OLC2 or OLC3 or OLC4"
  | "OLC2 or OLC4";
