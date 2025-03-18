interface JWTClaims {
  sub: string;
  role: string[];
  exp: number;
  iat: number;
}

export const decodeJWT = (token: string): JWTClaims | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    );
    console.log(JSON.parse(jsonPayload));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const claims = decodeJWT(token);
  if (!claims) return true;
  const currentTime = Math.floor(Date.now() / 1000);
  return claims.exp < currentTime;
};