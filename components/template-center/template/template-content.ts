export function getTemplateLabel(name: string) {
  return /template/i.test(name) ? name : `${name} template`;
}
