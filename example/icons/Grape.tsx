import * as React from 'react';

export const Grape = () => {
  return (
    <img
      className="fruit-img"
      src="data:image/png;base64,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"
      alt=""
    />
  );
};