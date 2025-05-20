import React, { useRef, useState } from "react";
import { RdsIcon, RdsLabel } from "../rds-elements";

export interface RdsCompCopyTextProps { }

const RdsCompCopyText = (props: RdsCompCopyTextProps) => {

  const textToCopyRef1 = useRef<HTMLParagraphElement>(null);
  const textToCopyRef2 = useRef<HTMLParagraphElement>(null);;
  const textToCopyRef5 = useRef<HTMLParagraphElement>(null);

  const [copySuccess1, setCopySuccess1] = useState(false);
  const [copySuccess2, setCopySuccess2] = useState(false);
  const [copySuccess5, setCopySuccess5] = useState(false); // Add a new state variable

  const handleCopyClick = (ref: React.RefObject<HTMLParagraphElement>, setCopySuccess: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (ref.current) {
      const range = document.createRange();
      range.selectNode(ref.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      document.execCommand('copy');
      window.getSelection()?.removeAllRanges();
      setCopySuccess(true);
      setTimeout(() => { setCopySuccess(false) }, 3000);
    }
  };

  return (<>
    <div>
      <div className="px-md-5 px-2">
        <div className="row align-items-end">
          <div className="col-md-12">
            <h5 className="mb-3">COPY TEXT</h5>
            <div className="dark-form">

              <div className="row mb-3 pb-1">
                <div className="w-100">
                    <RdsLabel
                      fontWeight=""
                      label="Download the CLI tool"
                    />
                  <div className="card rounded mt-2">
                    <div className="card-body py-2 d-flex align-items-center justify-content-between clipboard">
                      <div>
                        <p ref={textToCopyRef1} className="text-install mb-0">dotnet tool install -g Waiin.Raaghu.Cli</p>
                      </div>
                      <div onClick={() => handleCopyClick(textToCopyRef1, setCopySuccess1)}>
                        {!copySuccess1 && (
                          <RdsIcon
                            colorVariant="primary"
                            height="17px"
                            name="clipboard"
                            stroke
                            width="17px"
                            isCursorPointer={true}
                          />
                        )}
                      </div>
                      {copySuccess1 && <span><RdsIcon name="clipboard_check" height="20px" width="20px" fill={false} stroke={true} /></span>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-3 pb-1">
                <div className="w-100">
                    <RdsLabel
                      fontWeight=""
                      label="Update the CLI tool to the latest version"
                    />
                  <div className="card rounded mt-2">
                    <div className="card-body py-2 d-flex align-items-center justify-content-between clipboard">
                      <div>
                        <p ref={textToCopyRef2} className="text-to-copy mb-0">dotnet tool update -g Waiin.Raaghu.Cli</p>
                      </div>
                      <div onClick={() => handleCopyClick(textToCopyRef2, setCopySuccess2)}>
                        {!copySuccess2 && (
                          <RdsIcon
                            colorVariant="primary"
                            height="17px"
                            name="clipboard"
                            stroke
                            width="17px"
                            isCursorPointer={true}
                          />
                        )}
                      </div>
                      {copySuccess2 && <span><RdsIcon name="clipboard_check" height="20px" width="20px" fill={false} stroke={true} /></span>}
                    </div>
                  </div>
                </div>
              </div>              
              {/* New paragraph and copy button */}
              <div className="row mb-2 pb-1">
                <div className="w-100">
                    <RdsLabel
                      fontWeight=""
                      label="Create a new solution "
                    />
                  <div className="card rounded   mt-2">
                    <div className="card-body py-2 d-flex align-items-center justify-content-between clipboard">
                      <div>
                        <p ref={textToCopyRef5} className="text-to-copy mb-0">{`raaghu new <solution-name> [options]`}</p>
                      </div>
                      <div onClick={() => handleCopyClick(textToCopyRef5, setCopySuccess5)}>
                        {!copySuccess5 && (
                          <RdsIcon
                            colorVariant="primary"
                            height="17px"
                            name="clipboard"
                            stroke
                            width="17px"
                            isCursorPointer={true}
                          />
                        )}
                      </div>
                      {copySuccess5 && <span><RdsIcon name="clipboard_check" height="20px" width="20px" fill={false} stroke={true} /></span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
};

export default RdsCompCopyText;