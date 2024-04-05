import "./OTPModal.scss";
import React, { useState } from "react";
import { Box, Modal, TextField } from "@mui/material";

export interface ICancelProps {
    onClose: () => void;
}

export function OTPModal({ onClose }: Readonly<ICancelProps>) {
    const [otp, setOtp] = useState("");
    const [submit, setSubmit] = useState(false);
    const [otpError, setOtpError] = useState("");

    const handleClose = () => {
        onClose();
    };

    const handleSubmit = () => {
        if (otp.length !== 6) {
            setOtpError("OTP must be 6 characters long");
            setSubmit(false);
            return;
        }
        if (/\D/.test(otp)) {
            setOtpError("OTP must contain only numbers");
            setSubmit(false);
            return;
        }
        setSubmit(true);
        setOtpError("");
    };

    const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(event.target.value);
    };

    return (
        <Modal
            open={true}
            onClose={handleClose}
            className="cancel-room"
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="cancel-otp-modal">
                {!submit && (
                    <div>
                        <div className="cancellation-title">
                            Enter OTP for cancelling the room booking
                        </div>
                        <div className="cancel-otp-enter">
                            <button
                                className="cancellation-close-modal-btn"
                                onClick={handleClose}
                            >
                                X
                            </button>
                            <TextField
                                type="number"
                                className="cancel-otp-input"
                                fullWidth
                                required
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={handleOtpChange}
                                error={Boolean(otpError)}
                                helperText={otpError}
                            />
                            <div className="cancel-btn-div">
                                <button
                                    className="cancellation-btn"
                                    onClick={handleSubmit}
                                >
                                    CONFIRM OTP
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {submit && (
                    <div className="cancellation-success">
                        Cancellation Successful!
                    </div>
                )}
            </Box>
        </Modal>
    );
}
