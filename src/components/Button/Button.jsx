import React from "react";
//PropTypes
import PropTypes from "prop-types";
//css
import "./Button.scss";

const propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func
};

const defaultProps = {
  text: "Button",
  type: "button",
  color: "btn-warning",
  size: "md",
  onClick: () => {},
  btnClass: "",
  isLoading: false
};

// how to use
// Ex1: <Button text="Signin" />
// Ex2: <Button type="button" text="Signin" onClick={this.handleSignin} />

const Button = ({
  text,
  type,
  color,
  size,
  onClick,
  isDisable,
  btnClass,
  isLoading
}) => {
  const btnEvent = isLoading ? "btn_event" : "";
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${color} ss_btn ss_button w-button ${"btn-" +
        size} ${btnClass} ${btnEvent}`}
      disabled={isDisable}
    >
      {isLoading ? (
        <span style={{ position: "relative" }}>
          <i className="btn_spinner"></i>
          <span style={{ opacity: "0.2" }}>{text}</span>
        </span>
      ) : (
        text
      )}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
