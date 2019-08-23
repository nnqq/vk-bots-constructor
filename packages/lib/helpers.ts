export interface IOAuthError {
  error: string;
  // eslint-disable-next-line camelcase
  error_description: string;
}

export const isOAuthError = (response: any): response is IOAuthError => {
  if (typeof response.error !== 'undefined'
    && typeof response.error_description !== 'undefined') return true;

  return false;
};
