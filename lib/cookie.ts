export function setCookie(name: string, value: string, days: number) {
  const expirationDate = new Date();

  expirationDate.setTime(expirationDate.getTime() + days * 24 * 60 * 60 * 1000);

  const expires = `expires=${expirationDate.toUTCString()}`;

  console.log(`Setting cookie: ${name}=${value}; ${expires}; path=/`);
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

export const VISITED_NEW_VERSION_COOKIE_NAME = 'visited-new-version';

export function setVisitedLatestVersion(version: string) {
  setCookie(VISITED_NEW_VERSION_COOKIE_NAME, version, 365);
}
