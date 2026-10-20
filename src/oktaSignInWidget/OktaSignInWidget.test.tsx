import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import OktaSignInWidget from "./OktaSignInWidget";
import userEvent from "@testing-library/user-event";

const mockShowSignInToGetTokens = jest.fn();
const mockRemove = jest.fn();

jest.mock("@okta/okta-signin-widget", () => {
  return jest.fn().mockImplementation(() => {
    return {
      showSignInToGetTokens: mockShowSignInToGetTokens,
      remove: mockRemove,
    };
  });
});

describe("okta signin widget component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockShowSignInToGetTokens.mockResolvedValue(true);
  });

  it("should be in the document", () => {
    const compProps = {
      props: { config: {}, onSuccess: () => {}, onError: () => {} },
    };
    const { getByTestId } = render(<OktaSignInWidget {...compProps} />);
    expect(getByTestId("signInWidget")).toBeInTheDocument();
  });

  it("should display a dialog for terms and conditions", async () => {
    const user = userEvent.setup();
    const compProps = {
      props: { config: {}, onSuccess: () => {}, onError: () => {} },
    };
    const { getByTestId } = render(<OktaSignInWidget {...compProps} />);
    const termsAndConditionsButton = getByTestId("terms-and-conditions-button");
    expect(termsAndConditionsButton).toBeInTheDocument();
    expect(
      getByTestId("terms-and-conditions-dialog-hidden")
    ).toBeInTheDocument();
    await user.click(termsAndConditionsButton);
    await waitFor(() =>
      expect(
        getByTestId("terms-and-conditions-dialog-visible")
      ).toBeInTheDocument()
    );
  });

  it("should close the terms and conditions dialog", async () => {
    const user = userEvent.setup();
    const compProps = {
      props: { config: {}, onSuccess: () => {}, onError: () => {} },
    };
    const { getByTestId } = render(<OktaSignInWidget {...compProps} />);
    const termsAndConditionsButton = getByTestId("terms-and-conditions-button");
    expect(termsAndConditionsButton).toBeInTheDocument();
    expect(
      getByTestId("terms-and-conditions-dialog-hidden")
    ).toBeInTheDocument();
    await user.click(termsAndConditionsButton);
    await user.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => {
      expect(
        getByTestId("terms-and-conditions-dialog-hidden")
      ).toBeInTheDocument();
    });
  });

  it("forwards tokens and removes the widget on unmount", async () => {
    const tokens = { accessToken: { accessToken: "test-token" } };
    mockShowSignInToGetTokens.mockResolvedValue(tokens);
    const onSuccess = jest.fn();
    const onError = jest.fn();
    const { unmount } = render(
      <OktaSignInWidget props={{ config: {}, onSuccess, onError }} />
    );
    await waitFor(() => expect(onSuccess).toHaveBeenCalledWith(tokens));
    expect(onError).not.toHaveBeenCalled();
    unmount();
    expect(mockRemove).toHaveBeenCalledTimes(1);
  });

  it("forwards sign-in errors", async () => {
    const error = new Error("Sign-in failed");
    mockShowSignInToGetTokens.mockRejectedValue(error);
    const onSuccess = jest.fn();
    const onError = jest.fn();
    render(<OktaSignInWidget props={{ config: {}, onSuccess, onError }} />);
    await waitFor(() => expect(onError).toHaveBeenCalledWith(error));
    expect(onSuccess).not.toHaveBeenCalled();
  });
});
