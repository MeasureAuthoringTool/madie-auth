import React, { useEffect, useRef, useState } from "react";
import "twin.macro";
import "styled-components/macro";
import OktaSignIn from "@okta/okta-signin-widget";
import TermsAndConditionsDialog from "./TermsAndConditionsDialog";
import "./OktaSignInWidget.scss";

export default function OktaSignInWidget({ props }) {
  const [termsAndConditionsModalStatus, setTermsAndConditionsModalStatus] =
    useState(false);

  const openTermsAndConditionsModal = () => {
    setTermsAndConditionsModalStatus(true);
  };

  const closeTermsAndConditionsModal = () => {
    setTermsAndConditionsModalStatus(false);
  };

  const widgetRef = useRef();

  useEffect(() => {
    const config = {
      ...props.config,
    };
    const widget = new OktaSignIn(config);

    widget
      .showSignInToGetTokens({
        el: widgetRef.current,
        scopes: ["openid", "profile"],
      })
      .then(props.onSuccess)
      .catch(props.onError);

    return () => widget.remove();
  }, [props.config, props.onSuccess, props.onError]);

  return (
    <>
      <TermsAndConditionsDialog
        open={termsAndConditionsModalStatus}
        closeTermsAndConditionsModal={closeTermsAndConditionsModal}
      />
      <h1 tw="invisible fixed -top-24">MADiE Login</h1>
      <div data-testid="signInWidget" ref={widgetRef} />
      <div tw="text-center">
        <p tw="text-sm">
          By logging in, you agree to the
          <button
            className="term-and-condition-button"
            data-testid="terms-and-conditions-button"
            onClick={openTermsAndConditionsModal}
          >
            Terms & Conditions
          </button>
        </p>
      </div>
    </>
  );
}
