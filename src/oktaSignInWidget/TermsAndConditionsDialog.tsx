import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const TermsAndConditionsDialog = (props) => {
  return (
    <Dialog
      maxWidth="md"
      open={props.open}
      keepMounted
      onClose={() => props.closeTermsAndConditionsModal}
      aria-describedby="alert-dialog-slide-description"
      data-testid={`terms-and-conditions-dialog-${
        props.open ? "visible" : "hidden"
      }`}
    >
      <DialogTitle>Terms and Conditions</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <p>
            OMB No.0938-1236 |{" "}
            <a href="https://www.cms.gov/regulations-and-guidance/legislation/paperworkreductionactof1995">
              {" "}
              Paperwork Reduction Act
            </a>
          </p>
          <p>
            Updated Departmental Standard Warning Banner for HHS Information
            Systems, Memo dated July 14, 2016
          </p>
          <p>
            This warning banner provides privacy and security notices consistent
            with applicable federal laws, directives, and other federal guidance
            for accessing this Government system, which includes (1) this
            computer network, (2) all computers connected to this network, and
            (3) all devices and storage media attached to this network or to a
            computer on this network. This information system is provided for
            Government-authorized use only.
          </p>
          <p>
            Unauthorized or improper use of this system is prohibited and may
            result in disciplinary action and/or civil and criminal penalties.
          </p>
          <p>
            Personal use of social media and networking sites on this system is
            limited as to not interfere with official work duties and is subject
            to monitoring.
          </p>
          <p>
            By using this system, you understand and consent to the following:
            The Government may monitor, record, and audit your usage, including
            usage of personal devices and email systems for official duties or
            to conduct HHS business. Therefore, you have no reasonable
            expectation of privacy regarding any communication or data
            transiting or stored on this system. At any time, and for any lawful
            Government purpose, the government may monitor, intercept, and
            search and seize any communication or data transiting or stored on
            this system.
          </p>
          <p>
            Any communication or data transiting or stored on this system may be
            disclosed or used for any lawful Government purpose.
          </p>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          data-testid="terms-and-conditions-close-button"
          onClick={props.closeTermsAndConditionsModal}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TermsAndConditionsDialog;
