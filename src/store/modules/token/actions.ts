export function setToken(token: string | null) {
  return {
    type: 'SET_TOKEN',
    payload: token,
  };
}

export function invalidateToken() {
  return {
    type: 'INVALIDATE_TOKEN',
  };
}
