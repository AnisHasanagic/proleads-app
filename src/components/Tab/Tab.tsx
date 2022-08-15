import React from 'react';

import './Tab.scss';

export const Tab = React.memo(
  ({ id, title, isActive, setActive }: any) => {
    return (
      <div
        className={`tab ${isActive ? 'active' : ''}`}
        onClick={(): void => setActive(id)}
      >
        <p>{title}</p>
      </div>
    );
  },
);
