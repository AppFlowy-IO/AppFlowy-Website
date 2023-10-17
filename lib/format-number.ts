export function formatNumber(value: number, digits = 0): string {
  const units = ['K', 'M', 'G', 'T', 'P', 'E'];
  let index = 0;

  while (value >= 1000 && index < units.length) {
    value /= 1000;
    index++;
  }

  return `${value.toFixed(digits)}${units[index - 1] || ''}`;
}
