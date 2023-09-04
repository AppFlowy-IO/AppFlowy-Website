export function formatNumber(value: number): string {
  const units = ['K', 'M', 'G', 'T', 'P', 'E'];
  let index = 0;

  while (value >= 1000 && index < units.length) {
    value /= 1000;
    index++;
  }

  return `${value.toFixed(0)}${units[index - 1] || ''}`;
}
