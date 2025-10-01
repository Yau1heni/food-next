export const plural = (value: number, variants: Record<string, string> = {}, locale = 'en-US') => {
  const key = new Intl.PluralRules(locale).select(value);
  return variants[key] || '';
};
