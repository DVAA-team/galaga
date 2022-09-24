import { useEffect, useState } from 'react';

import { useAppSelector } from './store';

export const useCSRFToken = () => {
  const token = useAppSelector((state) => state.csfr.token);
  const [csrfToken, setCsrfToken] = useState(token);

  useEffect(() => {
    setCsrfToken(token);
  }, [token]);

  return csrfToken;
};
