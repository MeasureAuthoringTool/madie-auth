import React from "react";
import { render, waitFor } from "@testing-library/react";
import OktaSignInWidget from "./OktaSignInWidget";
import userEvent from "@testing-library/user-event";

jest.mock("@okta/okta-signin-widget", () => {
  return jest.fn().mockImplementation(() => {
    return {
      showSignInToGetTokens: () => new Promise((resolve) => resolve(true)),
      remove: () => {
        return true;
      },
    };
  });
});

describe("okta signin widget component", () => {
  it("should be in the document", () => {
    const compProps = {
      props: { config: {}, onSuccess: () => {}, onError: () => {} },
    };
    const { getByTestId } = render(<OktaSignInWidget {...compProps} />);
    expect(getByTestId("signInWidget")).toBeInTheDocument();
  });

  it("should display a dialog for terms and conditions", () => {
    const compProps = {
      props: { config: {}, onSuccess: () => {}, onError: () => {} },
    };
    const { getByTestId } = render(<OktaSignInWidget {...compProps} />);
    const termsAndConditionsButton = getByTestId("terms-and-conditions-button");
    expect(termsAndConditionsButton).toBeInTheDocument();
    expect(
      getByTestId("terms-and-conditions-dialog-hidden")
    ).toBeInTheDocument();
    userEvent.click(termsAndConditionsButton);
    waitFor(() =>
      expect(
        getByTestId("terms-and-conditions-dialog-visible")
      ).toBeInTheDocument()
    );
  });

  it("should close the terms and conditions dialog", () => {
    const compProps = {
      props: { config: {}, onSuccess: () => {}, onError: () => {} },
    };
    const { getByTestId } = render(<OktaSignInWidget {...compProps} />);
    const termsAndConditionsButton = getByTestId("terms-and-conditions-button");
    expect(termsAndConditionsButton).toBeInTheDocument();
    expect(
      getByTestId("terms-and-conditions-dialog-hidden")
    ).toBeInTheDocument();
    userEvent.click(termsAndConditionsButton);
    waitFor(() => {
      userEvent.click(getByTestId("terms-and-conditions-close-button"));
      expect(
        getByTestId("terms-and-conditions-dialog-hidden")
      ).toBeInTheDocument();
    });
  });
});
