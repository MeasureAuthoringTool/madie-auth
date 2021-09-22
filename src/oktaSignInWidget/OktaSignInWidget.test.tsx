import React from "react";
import { render } from "@testing-library/react";
import OktaSignInWidget from "./OktaSignInWidget";

jest.mock("@okta/okta-signin-widget", () => {
  return jest.fn().mockImplementation(() => {
    return {
      showSignInToGetTokens: () =>
        new Promise((resolve, reject) => resolve(true)),
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
});
