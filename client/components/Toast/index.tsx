import React from 'react';

interface ToastProps {
  text: string;
  type?: string;
}

const Toast: React.SFC<ToastProps> = ({ text, type }) => {
  return (
    <div className={`toast ${type}`}>
      {text}
    </div>
  );
};

export default Toast;
