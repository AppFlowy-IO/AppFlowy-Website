export const cookieName = 'i18next';
export function setLocaleCookie(lang: string) {
  const oneYearInSeconds = 365 * 24 * 60 * 60;

  const expirationDate = new Date();

  expirationDate.setTime(expirationDate.getTime() + oneYearInSeconds * 1000);
  document.cookie = `${cookieName}=${lang}; expires=${expirationDate.toUTCString()}; path=/`;
}
