import React from 'react';

import './TabContent.scss';

export const TabContent = React.memo(
  ({ isActive, children }: any) => {
    return (
      <div
        className={`tabContent ${isActive ? 'active' : ''}`}
      >
        <div>{children}</div>
      </div>
    );
  },
);
