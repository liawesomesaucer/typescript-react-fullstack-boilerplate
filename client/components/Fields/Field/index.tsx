import React from 'react';

interface FieldProps {
  input: any;
  meta: any;
}

const Field: React.SFC<FieldProps> = ({ input, meta }) => {
  const { touched, error } = meta;
  const inputClassName = (touched && error) ? 'error' : undefined;

  return (
    <div className="input-group">
      <input
        type="text"
        {...input}
        className={inputClassName}
      />
      {touched && error && <p className="input__error-msg">{error}</p>}
    </div>
  );
};

export default Field;
