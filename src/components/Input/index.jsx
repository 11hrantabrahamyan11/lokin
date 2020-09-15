import React from "react";
import PropTypes from "prop-types";
import InputMask from "react-input-mask";

const Input = ({ value, onChange }) => (
  <InputMask
    mask="99:99"
    maskChar=""
    onChange={onChange}
    value={value}
    placeholder="00:00"
  />
);

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
