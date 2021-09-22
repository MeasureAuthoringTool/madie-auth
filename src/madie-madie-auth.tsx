import React, { FC } from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import OktaSignInWidget from "./oktaSignInWidget/OktaSignInWidget";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});
export const LoginWidget: FC<{ props }> = OktaSignInWidget;
export const { bootstrap, mount, unmount } = lifecycles;
