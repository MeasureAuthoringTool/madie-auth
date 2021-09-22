import React, { useEffect, useRef } from "react";
import OktaSignIn from "@okta/okta-signin-widget";

export default function OktaSignInWidget({ props }) {
  const widgetRef = useRef();
  // @ts-ignore
  useEffect(() => {
    const widget = new OktaSignIn(props.config);

    widget
      .showSignInToGetTokens({
        el: widgetRef.current,
      })
      .then(props.onSuccess)
      .catch(props.onError);

    return () => widget.remove();
  }, [props.config, props.onSuccess, props.onError]);

  return <div data-testid="signInWidget" ref={widgetRef} />;
}
