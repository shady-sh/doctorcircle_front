export function openInNewTab(url) {
  if (url === undefined || url == null) {
    return;
  }
  const win = window.open(url, "_blank");
  win.focus();
}
