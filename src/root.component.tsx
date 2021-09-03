import React from "react";
import tw from "twin.macro";

const Notice = tw.span`text-red-600`;
export default function Root(props) {
  return <Notice>{props.name} is mounted!</Notice>;
}
