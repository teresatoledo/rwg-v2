import { parseCookies, setCookie as setNookiesCookie, destroyCookie as destroyNookiesCookie } from 'nookies';

// Función para obtener el valor de una cookie
export function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') {
    return undefined;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const lastPart = parts.pop();
    if (lastPart) {
      return lastPart.split(';').shift();
    }
  }
  
  return undefined;
}



// Función para establecer una cookie
export const setCookie = (key: string, value: string, options?: any) => {
  setNookiesCookie(null, key, value, options);
};

// Función para eliminar una cookie
export const destroyCookie = (key: string) => {
  destroyNookiesCookie(null, key);
};