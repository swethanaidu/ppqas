import React, { Component } from "react";
const { format } = require("date-fns");
export default class GetFormatedDate extends Component {
  render() {
    const date1 = new Date(`${this.props.date}`);

    const date = `${format(date1, "MMMM do, yyyy")}`;

    return <span className="posted-date">{date}</span>;
  }
}
