import React from 'react';
import { Circles } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div>
      <Circles
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} // 3 секунди
      />
    </div>
  );
};
