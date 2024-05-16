import React, { useEffect, useRef, useState } from 'react';
import "./styles.css";

export interface RdsOtpInputProps {
   otpSize?: number;
   fieldStyle?: 'Default' | 'Circle' | 'Square';
}

const RdsCompOtpInput = (props: RdsOtpInputProps) => {
   const { otpSize: initialOtpSize = 4 } = props;
   const [otpSize, setOtpSize] = useState(initialOtpSize);
   const [otp, setOtp] = useState(Array(initialOtpSize).fill(""));
   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
   const fieldClass = props.fieldStyle === 'Circle' ? 'otp-input-circle' :
      props.fieldStyle === 'Square' ? 'otp-input-square' :
         'otp-input-default';

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

      if (value && index < otp.length - 1) {
         inputRefs.current[index + 1]?.focus();
      }
      setOtp(newOtp);
   };

   const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && index > 0 && !otp[index]) {
         const newOtp = [...otp];
         newOtp[index - 1] = "";
         setOtp(newOtp);
         inputRefs.current[index - 1]?.focus();
      }
   };

   return (
      <>
         <div className="center-text">
            <p>Enter the {otpSize}-digit OTP you have received</p>
         </div>
         <div className="otp-container" style={{ width: `${otpSize * 50}px` }}>
            {otp.map((digit, index) => (
               <input
                  key={index}
                  className={fieldClass}
                  type="text"
                  maxLength={1}
                  value={digit}
                  name="otp"
                  autoFocus={index === 0}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  onChange={(e) => {
                     handleChange(index, e.target.value);
                  }}
                  onKeyDown={(e) => handleKeyDown(index, e)}
               />
            ))}
         </div>
      </>
   );
};

export default RdsCompOtpInput;