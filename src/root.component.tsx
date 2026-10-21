import React from "react";
import "./root.component.scss";

export default function Root(props) {
  return <span className="auth-mount-notice">{props.name} is mounted!</span>;
}
