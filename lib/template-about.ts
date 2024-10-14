import matter from 'gray-matter';

export function parseAbout(about: string) {
  return matter(about);
}
