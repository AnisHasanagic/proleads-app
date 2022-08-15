import React from 'react';
import './Form.scss';

export const Form = React.memo(
  ({ horizontal, children }: any) => {
    return (
      <section
        className={`form ${horizontal ? 'horizontal' : ''}`}
      >
        {children}
      </section>
    );
  },
);
