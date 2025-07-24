export const setCookie = (name: string, value: string, minutes: number) => {
  const expires = new Date(Date.now() + minutes * 60000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

export const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=0; path=/`;
};
