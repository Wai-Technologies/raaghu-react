import React from "react";
import { RdsButton } from "../rds-elements";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export interface RdsCompInvoiceDetailReceiptProps {
  invoiceDetails?: any;
}

const RdsCompInvoiceDetailReceipt = (
  props: RdsCompInvoiceDetailReceiptProps
) => {
  const date = new Date(props.invoiceDetails?.purchaseDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const downloadInvoice = () => {
    const capture = document.querySelector(".actual-reciept") as HTMLElement;
    html2canvas(capture, { scrollX: 0, scrollY: 0 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF("p", "mm", "a4");
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = doc.internal.pageSize.getHeight();
      const imgWidth = pdfWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgX = (pdfWidth - imgWidth) / 2;
      const imgY = (pdfHeight - imgHeight) / 12;
      doc.addImage(imgData, "JPEG", imgX, imgY, imgWidth, imgHeight);
      doc.save(formattedDate + "-invoice.pdf");
    });
  };

  return (
    <>

<div className="container mt-4 mx-auto pt-5">
        <div className="row mb-4">
          <div className="col-md-4">
            {/* <div>
							{props.showCalenderButton ? (
								<RdsButton
									colorVariant="light"
									icon="chevron_left"
									label="BACK TO HOME"
									showLoadingSpinner
									size="medium"
									onClick={handleClick}
								/>
							) : (
								<RdsDatepicker
									type="advanced"
									isDropdownOpen
								/>
							)}

						</div> */}
          </div>
          <div className="col-md-8">
           
               <div className="d-flex gap-3 align-items-center justify-content-end">
               <div>
                 <div>
                   <RdsButton
                     colorVariant="outline-primary"
                     icon="download_data"
                     showLoadingSpinner
                     size="medium"
                     onClick={downloadInvoice}
                   />
                 </div>
               </div>
               <div>
                 <div>
                   <RdsButton
                     colorVariant="primary"
                     label="Send"
                     showLoadingSpinner
                     size="medium"
                     //onClick={goToLogin}
                   />
                 </div>
               </div>
             </div>
          </div>
        </div>
      <div className="actual-reciept">
        <div className="border border-1 border-opacity-50 border-secondary card mb-4 p-lg-5 p-md-4 p-4 rounded">
          <div className="vh-100 vh-sm-auto pb-5 mb-5">
            <div className="d-lg-flex justify-content-between align-items-center">
              <div className="pb-lg-0 pb-4">
                <img
                  src="./assets/WAi-logo.png"
                  alt="WAI logo"
                  height="auto"
                  width="250px"
                />
              </div>
              <div className="text-lg-end">
                <h6 className="mb-1">Wai Technologies</h6>
                <div className="d-grid">
                  <p className="fs-7 mb-0">Sadashiv Peth, Pune 411030,</p>
                  <p className="fs-7 mb-0">Maharashtra, India </p>
                  <p className="fs-7 mb-0">+91 98765 43210</p>
                </div>
              </div>
            </div>
            {/* {invoiceDetails && invoiceDetails?.invoice?.map((item: any, index: number) => ( */}
            <>
              <div className="row custom-grid pt-5 pb-3">
                <div className="bill-grid col-2 pb-3 pb-lg-0">
                  <div>
                    <p className="fs-7 mb-0 fw-normal">Billed To</p>
                    <p className="mb-0 fw-semibold">
                      {props.invoiceDetails?.billedTo}
                    </p>
                    {/* <p className="mb-0 fw-normal">Sublime Ltd.</p> */}
                  </div>
                </div>
                <div className="bill-grid col-2 pb-3 pb-lg-0">
                  <div>
                    <p className="fs-7 mb-0 fw-normal">Purchase Date</p>
                    <p className="mb-0 fw-medium">{formattedDate}</p>
                  </div>
                </div>
                <div className="bill-grid col-3 pb-3 pb-lg-0">
                  <div>
                    <p className="fs-7 mb-0 fw-normal">Transaction ID</p>
                    <p className="mb-0 fw-medium">
                      {props.invoiceDetails?.transactionId}
                    </p>
                  </div>
                </div>
                <div className="bill-grid col-3 pb-3 pb-lg-0">
                  <div>
                    <p className="fs-7 mb-0 fw-normal">Invoice Number</p>
                    <p className="mb-0 fw-medium">
                      {props.invoiceDetails?.invoiceNumber}
                    </p>
                  </div>
                </div>
                <div className="bill-grid col-2 pb-3 pb-lg-0">
                  <div>
                    <p className="fs-7 mb-0 fw-normal">Amount Received</p>
                    <p className="mb-0">
                      <span className="fs-5 fw-normal">$</span>
                      <span className="fs-4 fw-bolder">
                        {props.invoiceDetails?.grandTotal}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-2 border-bottom border-dark border-opacity-75 border-top mt-3 py-4">
                <div className="row grid-sm">
                  <div className="col-lg-6 col-md-3 pe-0">
                    <div className="invoice-header px-3 py-1">
                      <p className="mb-0">Plan Name</p>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-3 px-0">
                    <div className="invoice-header text-end px-3 py-1">
                      <p className="mb-0">Rate</p>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-3 px-0">
                    <div className="invoice-header text-end px-3 py-1">
                      <p className="mb-0">Qty</p>
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-3 ps-0">
                    <div className="invoice-header text-end px-3 py-1">
                      <p className="mb-0">Total</p>
                    </div>
                  </div>
                </div>
                {props.invoiceDetails?.invoiceItems?.map(
                  (item: any, index: number) => (
                    <div className="row grid-sm" key={index}>
                      <div className="col-lg-6 col-md-3 pe-0">
                        <div className="invoice-body">
                          <ul className="list-unstyled pt-3 mb-0 px-3">
                            <li className="mb-3">
                              <p className="fw-semibold mb-0">
                                {item.itemName}
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-3 px-0">
                        <div className="invoice-body text-end">
                          <ul className="list-unstyled pt-3 mb-0 px-3">
                            <li className="mb-3">
                              <p className="mb-0">$ {item.itemAmount}</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-3 px-0">
                        <div className="invoice-body text-end">
                          <ul className="list-unstyled pt-3 mb-0 px-3">
                            <li className="mb-3">
                              <p className="mb-0">{item.quantity}</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-3 ps-0">
                        <div className="invoice-body text-end">
                          <ul className="list-unstyled pt-3 mb-0 px-3">
                            <li className="mb-3">
                              <p className="mb-0">$ {item.totalAmount}</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div>
                <div className="row">
                  <div className="col-xl-4 offset-xl-8 col-lg-5 offset-lg-7 col-md-8 offset-md-4 col-7 offset-5 pe-md-0 pe-4">
                    <div className="row">
                      <div className="col-md-6 pe-md-0">
                        <div className="invoice-body text-end border-bottom border-opacity-10 border-2 border-dark">
                          <ul className="list-unstyled pt-3 px-3">
                            <li className="pb-2">
                              <p className="mb-0">Subtotal</p>
                            </li>
                            {/* <li className="pb-2">
                              <p className="mb-0">Tax {props.invoiceDetails?.taxPercentage}%</p>
                            </li> */}
                            <li className="pb-2">
                              <p className="mb-0">Discount</p>
                            </li>
                          </ul>
                        </div>
                        <div className="invoice-header text-end px-3 py-2 mt-2">
                          <p className="mb-0">Total</p>
                        </div>
                      </div>
                      <div className="col-md-6 ps-md-0">
                        <div className="invoice-body text-end border-bottom border-opacity-10 border-2 border-dark">
                          <ul className="list-unstyled pt-3 px-3">
                            <li className="pb-2">
                              <p className="mb-0 fw-semibold">$ {props.invoiceDetails?.subTotal}</p>
                            </li>
                            {/* <li className="pb-2">
                              <p className="mb-0 fw-semibold">$ {props.invoiceDetails?.taxAmount}</p>
                            </li> */}
                            <li className="pb-2">
                              <p className="mb-0 fw-semibold">
                                $ {props.invoiceDetails?.discount}
                              </p>
                            </li>
                          </ul>
                        </div>
                        <div className="invoice-header text-end px-3 py-2 mt-2">
                          <p className="mb-0 fw-semibold">
                            $ {props.invoiceDetails?.grandTotal}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
            {/* ))} */}
          </div>

          <div className="mt-5 pt-5">
            <p className="fw-semibold mb-2">Terms</p>
            <p className="fs-6 fw-normal mb-1 opacity-50 text-secondary">
              Refunds will be issued in accordance with our refund policy.
              Please refer to our website or contact us for more information.
            </p>
            <p className="fs-6 fw-normal mb-1 opacity-50 text-secondary">
              Payment Disputes: Any payment disputes must be raised within 30
              days from the date of this receipt.
            </p>
            <p className="fs-6 fw-normal mb-1 opacity-50 text-secondary">
              Taxes: All applicable taxes have been included in the payment
              amount.
            </p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default RdsCompInvoiceDetailReceipt;