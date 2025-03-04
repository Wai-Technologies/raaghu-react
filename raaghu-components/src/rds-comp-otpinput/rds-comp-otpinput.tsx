import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import { RdsButton, RdsIcon, RdsInput } from "../rds-elements";

export interface RdsOtpInputProps {
  otpSize?: number;
  fieldStyle?: "Default" | "Circle" | "Square" | "Advance";
  iconUrl?: string;
}

const RdsCompOtpInput = (props: RdsOtpInputProps) => {
  const { otpSize: initialOtpSize = 4 } = props;
  const [otpSize, setOtpSize] = useState(initialOtpSize);
  const [otp, setOtp] = useState(Array(initialOtpSize).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const fieldClass =
    props.fieldStyle === "Circle"
      ? "otp-input-circle"
      : props.fieldStyle === "Square"
      ? "otp-input-square"
      : "otp-input-default";

  useEffect(() => {
    if (initialOtpSize !== otpSize) {
      setOtpSize(initialOtpSize);
      setOtp(Array(initialOtpSize).fill(""));
    }
  }, [initialOtpSize]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, [otpSize, props.fieldStyle]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) {
      return;
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otpSize - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };
  const handleVerify = () => {
    window.alert(`Entered OTP: ${otp.join("")}`);
  };
  const handleResendOtp = () => {
   window.alert("OTP has been resent to your registered email address.");
   // Add your logic to resend the OTP here
 };
  return (
    <>
      {props.fieldStyle != "Advance" && (
        <>
          <div className="text-center">
            <p>Enter the {otpSize}-digit OTP you received</p>
          </div>
          <div className="d-flex justify-content-center mx-auto">
            {otp.map((digit, index) => (
              <RdsInput
                key={index}
                customClasses={fieldClass}
                inputType="otp"
                maxLength={1}
                value={digit}
                singleDigit={true}
                name="OTP"
                ref={(ref: any) => (inputRefs.current[index] = ref)}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>
        </>
      )}
      {props.fieldStyle == "Advance" && (
        <div className="otp-verification-container">
          <div className="iconotpalert">
            <RdsIcon
              name={props.iconUrl}
              height="3rem"
              width="4rem"
              colorVariant="primary"
              fill={false}
              stroke={false}
            />
          </div>
          <h2 id="otpverification">OTP Verification</h2>
          <p className="otpdescription text-muted">One-Time OTP sent to your registered email address</p>
          <div className="otp-inputs">
            {otp.map((value, index) => (
              <RdsInput
                key={index}
                customClasses={fieldClass}
                inputType="otp"
                maxLength={1}
                value={value}
                singleDigit={true}
                name="otp"
                placeholder="0"
                ref={(ref: any) => (inputRefs.current[index] = ref)}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>
          <p className="resend-text">
            Don’t receive the OTP?{" "}
            <span className="resend-link text-primary" onClick={handleResendOtp}>Resend OTP</span>
          </p>

          <RdsButton
            label="VERIFY"
            type="submit"
            colorVariant="primary"
            onClick={handleVerify}
            size="small"
          ></RdsButton>
        </div>
      )}
    </>
  );
};

export default RdsCompOtpInput;
