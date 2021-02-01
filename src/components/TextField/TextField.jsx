import React, { Fragment } from "react";
import PropTypes from "prop-types";
import "./TextField.scss";

const TextField = ({
  name,
  value,
  type,
  onBlur,
  onChange,
  placeholder,
  isDisable,
  error,
  className
}) => (
  <Fragment>
    <input
      className={`ss_textBox form-control ${className} ${error ? "is-invalid" : ""}`}
      type={type || "text"}
      name={name}
      value={value}
      placeholder={placeholder || ""}
      onBlur={onBlur}
      onChange={onChange}
      disabled={isDisable}
    />
    {error && <span className="invalid-feedback">{error}</span>}
  </Fragment>
);

TextField.propTypes = {
  name: PropTypes.string,
  // value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  disabled: PropTypes.string,
  className: PropTypes.string,
  // error: PropTypes.instanceOf(Array),
  error: PropTypes.string
};

export default TextField;

// Ex: how to use
// <TextField
//   type="text"
//   value={amount}
//   name="amount"
//   onChange={this.handleInputChange}
// />
