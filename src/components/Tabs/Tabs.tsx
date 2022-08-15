import React from 'react';

import './Tabs.scss';

import { Tab } from '../Tab/Tab';

export const Tabs = React.memo(({ tabs, small }: any) => {
  return (
    <div className={`tabs ${small ? 'small' : ''}`}>
      {tabs.map((tab: any, index: number) => (
        <Tab key={index} {...tab} />
      ))}
    </div>
  );
});
