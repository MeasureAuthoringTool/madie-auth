import React, { FC } from "react";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import OktaSignInWidget from "./oktaSignInWidget/OktaSignInWidget";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: Root,
  renderType: "createRoot",
});
export const LoginWidget: FC<{ props }> = OktaSignInWidget;
export const { bootstrap, mount, unmount } = lifecycles;
