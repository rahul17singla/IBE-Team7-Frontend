import "./OTPModal.scss";
import React, { useState } from "react";
import { Box, Modal, TextField } from "@mui/material";
import axios from "axios";
import { BACKEND_URL } from "../../constants/Constants";

export interface ICancelProps {
    onClose: () => void;
    otpFromMail: number;
    bookingId: string;
}

export function OTPModal({
    onClose,
    otpFromMail,
    bookingId,
}: Readonly<ICancelProps>) {
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
        console.log(otp);
        console.log(otpFromMail);
        if (parseInt(otp) !== otpFromMail) {
            setOtpError("OTP is incorrect");
            setSubmit(false);
        } else {
            setOtpError("");
            setSubmit(true);
            axios.get(`${BACKEND_URL}/cancelRoom?${bookingId}`);
        }
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
