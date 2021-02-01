import React, { Component, Fragment } from 'react';
import "./CardOne.scss"

//card component
class CardOne extends Component {
  render() {
    const style = this.props.style;
    const className = this.props.className;
    let passProps = {};
    let newClassName = '';
    if (style) passProps.style = style;
    if (className) {
      newClassName += ' ' + className;
    }
    passProps.className = newClassName;
    const containerClassName = this.props.containerClassName;
    return (
      <Fragment>
        <div id={this.props.id} className={`card ss_card_one ${containerClassName}`}>
          <div className={`card-body ${className} `}>
            {this.props.children}
          </div>
        </div>
      </Fragment>
    );
  }
}
export default CardOne;