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
          <div className="col-md-4"></div>
          <div className="col-md-8">
            <div className="d-flex gap-3 align-items-center justify-content-end">
              <RdsButton
                colorVariant="outline-primary"
                icon="download_data"
                showLoadingSpinner
                size="medium"
                onClick={downloadInvoice}
              />
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

        <div className="actual-reciept">
          <div className="border border-1 border-opacity-50 border-secondary card mb-4 p-4 rounded">
            <div className="pb-5">
              <div className="row justify-content-between align-items-center">
                <div className="col-lg-6 col-12 text-center text-lg-start">
                  <img
                    src="./assets/WAi-logo.png"
                    alt="WAI logo"
                    className="img-fluid"
                    width="250px"
                  />
                </div>
                <div className="col-lg-6 col-12 text-lg-end text-center mt-4 mt-lg-0">
                  <h6 className="mb-1">Wai Technologies</h6>
                  <p className="fs-7 mb-0">Sadashiv Peth, Pune 411030,</p>
                  <p className="fs-7 mb-0">Maharashtra, India </p>
                  <p className="fs-7 mb-0">+91 98765 43210</p>
                </div>
              </div>

              <div className="row custom-grid pt-5 pb-3">
                <div className="col-12 col-md-6 col-lg-2 pb-3">
                  <p className="fs-7 mb-0 fw-normal">Billed To</p>
                  <p className="mb-0 fw-semibold">
                    {props.invoiceDetails?.billedTo}
                  </p>
                </div>
                <div className="col-12 col-md-6 col-lg-2 pb-3">
                  <p className="fs-7 mb-0 fw-normal">Purchase Date</p>
                  <p className="mb-0 fw-medium">{formattedDate}</p>
                </div>
                <div className="col-12 col-md-6 col-lg-3 pb-3">
                  <p className="fs-7 mb-0 fw-normal">Transaction ID</p>
                  <p className="mb-0 fw-medium">
                    {props.invoiceDetails?.transactionId}
                  </p>
                </div>
                <div className="col-12 col-md-6 col-lg-3 pb-3">
                  <p className="fs-7 mb-0 fw-normal">Invoice Number</p>
                  <p className="mb-0 fw-medium">
                    {props.invoiceDetails?.invoiceNumber}
                  </p>
                </div>
                <div className="col-12 col-lg-2 pb-3">
                  <p className="fs-7 mb-0 fw-normal">Amount Received</p>
                  <p className="mb-0">
                    <span className="fs-5 fw-normal">$</span>
                    <span className="fs-4 fw-bolder">
                      {props.invoiceDetails?.grandTotal}
                    </span>
                  </p>
                </div>
              </div>
              
            <div className="border-2 border-bottom border-dark border-opacity-75 border-top mt-3 py-4">
            <div className="container mt-4">
              <div className="row">
                <div className="col-12 px-0">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="text-start">Plan Name</th>
                          <th className="text-end">Rate</th>
                          <th className="text-end">Qty</th>
                          <th className="text-end">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.invoiceDetails?.invoiceItems?.map((item: any, index: number) => (
                          <tr>
                            <td className="text-start fw-bold">{item.itemName}</td>
                            <td className="text-end">
                              <span className="nowrap">$ {item.itemAmount}</span>
                            </td>
                            <td className="text-end">
                              <span className="nowrap">{item.quantity}</span>
                            </td>
                            <td className="text-end">
                              <span className="nowrap">$ {item.totalAmount}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            </div>



              <div className="row mt-5">
                <div className="col-lg-4 offset-lg-8 col-12">
                  <div className="row">
                    <div className="col-6 text-end border-bottom border-dark">
                      <p className="mb-2">Subtotal</p>
                      <p className="mb-2">Discount</p>
                    </div>
                    <div className="col-6 text-end border-bottom border-dark">
                      <p className="mb-2 fw-semibold">
                        $ {props.invoiceDetails?.subTotal}
                      </p>
                      <p className="mb-2 fw-semibold">
                        $ {props.invoiceDetails?.discount}
                      </p>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-6 text-end">
                      <p className="mb-0">Total</p>
                    </div>
                    <div className="col-6 text-end">
                      <p className="mb-0 fw-semibold">
                        $ {props.invoiceDetails?.grandTotal}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <p className="fw-semibold mb-2">Terms</p>
                <p className="fs-6 fw-normal mb-1 opacity-50 text-secondary">
                  Refunds will be issued in accordance with our refund policy.
                  Please refer to our website or contact us for more
                  information.
                </p>
                <p className="fs-6 fw-normal mb-1 opacity-50 text-secondary">
                  Payment Disputes: Any payment disputes must be raised within
                  30 days from the date of this receipt.
                </p>
                <p className="fs-6 fw-normal mb-1 opacity-50 text-secondary">
                  Taxes: All applicable taxes have been included in the payment
                  amount.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RdsCompInvoiceDetailReceipt;
