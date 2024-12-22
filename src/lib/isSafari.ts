export const isSafariIOS = (): boolean => {
  const ua = navigator.userAgent;
  return !!ua.match(/(iPhone|iPad|iPod).*Safari/i);
};
