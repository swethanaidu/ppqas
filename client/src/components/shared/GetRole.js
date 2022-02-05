import React, { Component } from "react";

export default class GetRole extends Component {
  render() {
    let role;
    switch (`${this.props.rl}`) {
      case "PO":
        role = "Placement Officer";
        break;
      case "FC":
        role = "Faculty";
        break;
      case "SR":
        role = "Senior";
        break;
      case "JR":
        role = "Junior";
        break;
    }
    return (
      <div>
        <span className="sub-title">{role}</span>
      </div>
    );
  }
}
