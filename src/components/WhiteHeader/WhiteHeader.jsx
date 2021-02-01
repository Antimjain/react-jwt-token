import React, { Fragment } from "react";
// css
import "./WhiteHeader.scss";

//WhiteHeader
const WhiteHeader = props => {
  return (
    <Fragment>
      <div id="ss_white_header" className={props.className}>
        <div className="ss_white_header_item_1">
          <div>{props.label}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default WhiteHeader;
