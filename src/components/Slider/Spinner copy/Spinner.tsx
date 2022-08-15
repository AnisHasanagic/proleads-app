import React from 'react';
import './Spinner.scss';

export const Spinner = React.memo(({ dark }: any) => {
  return (
    <div className={`spinner ${dark ? 'dark' : ''}`}></div>
  );
});
