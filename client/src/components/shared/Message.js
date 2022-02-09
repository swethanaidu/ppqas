import React from "react";
import { Alert } from "reactstrap";

const Message = ({ variant, children }) => {
  // console.log(variant);
  return <Alert color={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
