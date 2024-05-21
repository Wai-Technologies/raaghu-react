import React, { useEffect, useRef, useState } from 'react';
import "./styles.css";
import { RdsInput } from '../rds-elements';

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
      const valueFoucs = value;   
      console.log("valueFoucs", valueFoucs)
      if (!/^\d*$/.test(value)) {
         return;
      }
      const newOtp = [...otp];
      setOtp(newOtp);

      if (value && index < otpSize - 1) {
         inputRefs.current[index + 1]?.focus();
      }
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
         <div className="text-center">
            <p>Enter the {otpSize}-digit OTP you have received</p>
         </div>
         <div className="d-flex justify-content-center mx-auto">
            {otp.map((digit, index) => (
               <RdsInput
                  key={index}
                  customClasses={fieldClass}
                  inputType="otp"
                  maxLength={0}
                  value={digit}
                  singleDigit={true}
                  name="otp"
                  autoFocus={index === 0}
                  ref={(ref:any) => (inputRefs.current[index] = ref)}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
               />
            ))}
         </div>
      </>
   );
};

export default RdsCompOtpInput;