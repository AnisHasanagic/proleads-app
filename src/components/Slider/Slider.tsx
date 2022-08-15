import React from 'react';

import './Slider.scss';

export const Slider = React.memo(
  ({ label, isChecked, checkItem, disabled, title, light, small }: any) => {
    return (
      <div
        className={`inputSwitch ${light ? 'light' : ''} ${small ? 'small' : ''}`}
        data-title={title}
      >
        {label && <label className="realLabel">{label}</label>}
        <label className="switch">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(): void => checkItem()}
            disabled={disabled}
          />
          <span className="slider round"></span>
        </label>
      </div>
    );
  },
);
