export function generateStrategyCode(
  template: string,
  params: Record<string, any>
) {
  let code = template;
  for (const [key, value] of Object.entries(params)) {
    const replacement =
      typeof value === "boolean" || typeof value === "number"
        ? String(value)
        : key === "OL_LEG1_SUB_TRIGGER"
        ? value
        : JSON.stringify(value);

    code = code.replace(new RegExp(`{{${key}}}`, "g"), replacement);
  }
  return code;
}
