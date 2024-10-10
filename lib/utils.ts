import { type ClassValue, clsx } from 'clsx';
import { format, formatDistanceToNow, isAfter, subWeeks } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  const now = new Date();
  const oneWeekAgo = subWeeks(now, 1);

  if (isAfter(date, oneWeekAgo)) {
    return formatDistanceToNow(date, { addSuffix: true });
  } else {
    return format(date, 'MMMM dd, yyyy');
  }
}

export const generateReadingTime = (text: string) => {
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);
  return readTime;
};
export const shareToTwitter = (url: string, text: string) => {
  if (typeof window === 'undefined') return;
  window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}`);
};
export const shareToLinkedIn = (url: string, title: string) => {
  if (typeof window === 'undefined') return;
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`);
};
export const copyToClipboard = (url: string) => {
  if (typeof window === 'undefined') return;
  navigator.clipboard.writeText(url);
};

export function stringToColor(string: string, colorArray?: string[]) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  if (colorArray) {
    return colorArray[string.slice(0, 1).charCodeAt(0) % colorArray.length];
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;

    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export const colorArray = [
  '#5287D8',
  '#6E9DE3',
  '#8BB3ED',
  '#A7C9F7',
  '#979EB6',
  '#A2A8BF',
  '#ACB2C8',
  '#C1C7DA',
  '#E8AF53',
  '#E6C25A',
  '#E6D26F',
  '#E6E288',
  '#589599',
  '#68AD8E',
  '#79C47F',
  '#8CDB6A',
  '#AA94DC',
  '#C49EEB',
  '#BAACEE',
  '#D5C4FB',
  '#F597D2',
  '#FCB2E3',
  '#FDC5E8',
  '#F8D2E1',
  '#D1D269',
  '#C7C98D',
  '#CED09B',
  '#DAD9B6',
  '#DDD2C6',
  '#DDD6C7',
  '#EADED3',
  '#FED5C4',
  '#72A7D8',
  '#8FCAE3',
  '#64B3DA',
  '#52B2D4',
  '#90A4FF',
  '#A8BEF4',
  '#AEBDFF',
  '#C2CDFF',
  '#86C1B7',
  '#A6D8D0',
  '#A7D7A8',
  '#C8E4C9',
  '#FF9494',
  '#FFBDBD',
  '#DCA8A8',
  '#E3C4C4',
];

export const colorArrayTint = [
  '#EBFBEE',
  '#F0F5FF',
  '#FFF7E6',
  '#FFF2F2',
  '#F7FAFC',
  '#FAF5FF',
  '#F7FAF7',
  '#FFF5F5',
  '#F2F5FF',
  '#F5F5F5',
  '#F5FAF5',
  '#FFF5FA',
  '#F5F5FA',
  '#FAF5F5',
  '#E0F7FA',
  '#F7F0E0',
  '#F0E0F7',
  '#E0F7F0',
];
