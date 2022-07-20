import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

// setup function
const setup = (jsx: React.ReactElement) => {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
};

export * from '@testing-library/react';
export { setup as render };
