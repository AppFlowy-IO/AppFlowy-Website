export function download(url: string, transfer = true) {
  const a = document.createElement('a');

  if (transfer) {
    a.href = `/progress?downloadUrl=${url}`;
  } else {
    a.href = url;
  }

  document.body.appendChild(a);
  a.style.display = 'none';
  a.click();
  document.body.removeChild(a);
}
