import React, { Component } from "react";

export default class GetInitials extends Component {
  render() {
    let fn;
    const fname = JSON.stringify(`${this.props.fn}`);
    const lname = JSON.stringify(`${this.props.ln}`);
    if (lname === null) {
      const fullName = fname.split(" ");
      fn = fullName.shift().charAt(0) + fullName.pop().charAt(1);
      fn = fn.toUpperCase();
    } else {
      fn = fname.substring(1, 2) + lname.substring(1, 2);
    }
    return (
      <div>
        <span className="user-avatar mr-3">{fn}</span>
      </div>
    );
  }
}
