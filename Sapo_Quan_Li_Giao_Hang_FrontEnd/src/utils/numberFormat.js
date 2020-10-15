import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

function NumberFormatCustom(props) {
  const {inputRef,onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
       
      }}
      
      thousandSeparator={true}
      isNumericString
    />
  );
}
NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default NumberFormatCustom