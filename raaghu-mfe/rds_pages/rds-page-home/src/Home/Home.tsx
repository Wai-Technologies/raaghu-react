import React, { useEffect, useState } from "react";
import { RdsAvatar, RdsButton, RdsLabel, } from "../../../rds-elements";
import { useTranslation } from "react-i18next";
import {
    authCodeService , hybridCodeService, implicitTokenService
} from "../../../../../raaghu-react-core/src/index"
import { access } from "fs";

const Home = () => {
	const { t } = useTranslation();
	function loginHandler() {
		if (localStorage.getItem("REACT_APP_GRANT_TYPE") === "authorization_code") {
			authCodeService(
				"code", // response_Type
				localStorage.getItem("REACT_APP_CLIENT_ID") || "", // client_Id
				localStorage.getItem("REACT_APP_URL") || "", // redirect_Url
				localStorage.getItem("REACT_APP_SCOPE") || "", // scope
				`${location.pathname}` // returnUrl
			)
			  .then((res: any) => {
				if (res.status === 200) {
				  localStorage.setItem("accessToken", "");
				  window.location.href = res.url;
				} else {
				  // Handle specific errors
				  if (res.data && res.data.error_description === "The specified 'code_verifier' is invalid.") {
					// Handle 'code_verifier' error here
					console.log("Invalid code verifier:", res.data.error_description);
				  } else {
					// Handle other errors here
					console.log("Login Error:", res.data.error_description);
				  }
				}
			  })
			  .catch((error: any) => {
				console.log("Login Error:", error);
			  });
		  }
		  else if (localStorage.getItem("REACT_APP_GRANT_TYPE")=="implicit"){
            implicitTokenService("token",                               // response_Type
            localStorage.getItem("REACT_APP_CLIENT_ID") || "",    // client_Id
            localStorage.getItem("REACT_APP_URL") || "",             // redirect_Url
            localStorage.getItem("REACT_APP_SCOPE") || "",
            "/").then((res: any) => {
                if (res.status === 200) {
                    localStorage.setItem("accessToken","")  
                    window.location.href = res.url;
                }
            }).catch((error: any) => {
                console.log(error)
            })
 
        }else if (localStorage.getItem("REACT_APP_GRANT_TYPE")=="hybrid"){
            hybridCodeService("code id_token token",                 // response_Type
            localStorage.getItem("REACT_APP_CLIENT_ID") || "",    // client_Id
            localStorage.getItem("REACT_APP_URL") || "",         // redirect_Url
            localStorage.getItem("REACT_APP_SCOPE") || "").then((res: any) => {
                if (res.status === 200) {
                    localStorage.setItem("accessToken","")  
                    window.location.href = res.url;
                }
            }).catch((error: any) => {
                console.log(error)
            })
        }
    }

	return (
		<>
			<div className="container-fluid bg-blue landing-banner">
				<div className="container">
					<div className="row align-items-center py-lg-5 py-xxl-0 py-xl-0 py-md-0 py-0">
						<div className="col-xxl-5 col-xl-6 col-lg-7 col-md-12 pt-md-5 mt-md-5 pt-xxl-0 pt-xl-0 pt-lg-0 pt-5 mt-xxl-0 mt-xl-0 mt-lg-0 mt-4 px-xxl-2 px-xl-3 px-lg-3 px-md-5 px-3">
							<div className="">
								<div className="d-flex align-items-center gap-3">
									<div className="d-flex align-items-center">
										<img src="assets/abp-commercial-logo.png" height="22px" className="abp-logo" alt="abp commercial logo" />
										<p className="mb-0 commercial">Commercial</p>
									</div>
									<div>
										<p className="mb-0 fs-5 fw-semibold landing__para">+</p>
									</div>
									<div className="d-flex align-items-center gap-2">
										<img src="assets/React-icon.png" height="22px" alt="abp commercial logo" />
										<p className="mb-0 landing__para">React</p>
									</div>
								</div>
								<div className="fw-bold pt-2">
									<p className="banner-gradient fw-bolder mb-0">micro frontend </p>
									<p className="banner-gradient-outline ds-grad mb-0"> design system  </p>
									<h6 className="fs-5 fw-normal lh-base pe-xxl-5 pe-lg-5 me-lg-4 pe-md-0 me-md-0 py-4 landing__para h6-mobile">Highly Customisable Dashboards, Built-in pages, Charts for your Modern Web applications</h6>
								</div>

								<div className="d-flex align-items-center gap-4 mobile-btn-rwo">
									{localStorage.getItem("accessToken") == "" && (
										<div className="d-flex pb-3 flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row gap-2">
											<RdsButton
												label={`${t("AbpUi.Login")}`}
												colorVariant="primary"
												showLoadingSpinner={true}
												block={false}
												tooltipTitle={""}
												type="submit"
												onClick={loginHandler}
												dataTestId="AbpUi.Login"
											/></div>
									)}
								</div>
							</div>
						</div>
						<div className="col-xxl-7 col-xl-6 col-lg-5 col-md-12">
							<img src="assets/landing-banner.png" className="banner-text" />
						</div>
					</div>
				</div>
			</div>


			{/* how to get started section */}
			<div className="container-fluid py-5 mb-4">
				<div className="container">
					<div className="mb-4 pb-5 pt-4 text-center">
						<RdsLabel
							fontWeight="semibold"
							label="How to get started"
							class="text-black fs-2"
						/>
					</div>

					<div className="row">
						<div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-12 mb-5">
							<div className="full-withradius border-0 card h-100 mx-4 px-xxl-5 px-xl-5 px-lg-5 px-md-3 px-0 mx-xl-0 mx-md-0 mx-xxl-4 py-5 text-center">
								<div className="pb-3">
									<img src="assets/landing-assets/prerequirements.png" height="60px" width="60px" alt="Pre Requirement" />
								</div>
								<div className="px-5 px-xl-0 px-xxl-5 px-md-0">
									<RdsLabel
										fontWeight="medium"
										label="1. Pre Requirements"
										class="fs-5 get-started"
									/>
								</div>
							</div>
						</div>

						<div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-12 mb-5">
							<div className="border-0 card full-withradius h-100 mx-4 px-xxl-5 px-xl-5 px-lg-5 px-md-3 px-0 mx-xl-0 mx-md-0 mx-xxl-4 py-5 text-center">
								<div className="pb-3">
									<img src="assets/landing-assets/clilogin.png" height="60px" width="60px" alt="Install ABP CLI & Login" />
								</div>
								<div className="px-5 px-xl-0 px-xxl-5 px-md-0">
									<RdsLabel
										fontWeight="medium"
										label="2. Install ABP CLI & Login"
										class="fs-5 get-started"
									/>
								</div>
							</div>
						</div>

						<div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-12 mb-5">
							<div className="border-0 card full-withradius h-100 mx-4 px-xxl-5 px-xl-5 px-lg-5 px-md-3 px-0 mx-xl-0 mx-md-0 mx-xxl-4 py-5 text-center">
								<div className="pb-3">
									<img src="assets/landing-assets/abpsuite.png" height="60px" width="60px" alt="Install ABP suite" />
								</div>
								<div className="px-5 px-xl-0 px-xxl-5 px-md-0">
									<RdsLabel
										fontWeight="medium"
										label="3. Install ABP suite"
										class="fs-5 get-started"
									/>
								</div>
							</div>
						</div>

						<div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-12 mb-5">
							<div className="border-0 card full-withradius h-100 mx-4 px-xxl-5 px-xl-5 px-lg-5 px-md-3 px-4 mx-xl-0 mx-md-0 mx-xxl-4 py-5 text-center">
								<div className="pb-3">
									<img src="assets/landing-assets/newsolution.png" height="60px" width="60px" alt="Create new solution, project & database" />
								</div>
								<div className="">
									<RdsLabel
										fontWeight="medium"
										label="4. Create new solution, project & database"
										class="fs-5 get-started"
									/>
								</div>
							</div>
						</div>

						<div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-12 mb-5">
							<div className="border-0 card full-withradius h-100 mx-4 px-xxl-5 px-xl-5 px-lg-5 px-md-3 px-0 mx-xl-0 mx-md-0 mx-xxl-4 py-5 text-center">
								<div className="pb-3">
									<img src="assets/landing-assets/serverside.png" height="60px" width="60px" alt="Create Server side" />
								</div>
								<div className="px-5 px-xl-0 px-xxl-5 px-md-0">
									<RdsLabel
										fontWeight="medium"
										label="5. Create Server side"
										class="fs-5 get-started"
									/>
								</div>
							</div>
						</div>

						<div className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-12 mb-5">
							<div className="border-0 card full-withradius h-100 mx-4 px-xxl-5 px-xl-5 px-lg-5 px-md-3 px-0 mx-xl-0 mx-md-0 mx-xxl-4 py-5 text-center">
								<div className="pb-3">
									<img src="assets/landing-assets/booklistpage.png" height="60px" width="60px" alt="Book list page & Create a new book" />
								</div>
								<div className="px-5 px-xl-0 px-xxl-4 px-md-0">
									<RdsLabel
										fontWeight="medium"
										label="6. Book list page & Create a new book"
										class="fs-5 get-started"
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="align-items-center d-block d-lg-flex d-md-flex d-xl-flex d-xxl-flex gap-2 justify-content-center text-center">
						<div>
							<RdsLabel
								fontWeight="normal"
								label="For technical overview see the"
								class="fs-5 get-started"
							/>
						</div>
						<div>
							<a href="https://docs.raaghu.io/en/raaghu/latest" target="_blank" className="fs-5 text-primary text-decoration-underline">documentation.</a>
						</div>
					</div>
				</div>
			</div>


			{/* technology stack */}
			<div className="container-fluid gradient-border"></div>
			<div className="container-fluid py-xxl-5 py-xl-5 py-lg-5 py-md-5 py-0 technology-stack" style={{ backgroundImage: "url('assets/technology-stack-bg.png')" }}>
				<div className="container">
					<div className="pb-3 pt-4 text-center">
						<RdsLabel
							fontWeight="semibold"
							label="Technology Stack"
							class="text-white fs-2"
						/>
					</div>

					<div className="technology-logo d-flex py-5 justify-content-between">
						<img src="assets/abp-logo.svg" alt="Abp commercial" />
						<img src="assets/bootstrap-logo.svg" alt="bootstrap" />
						<img src="assets/figma-logo.svg" alt="figma" />
						<img src="assets/typescript-logo.svg" alt="typescript" />
						<img src="assets/visual-studio-logo.svg" alt="visual studio" />
						<img src="assets/lottiefiles-logo.svg" alt="lottie files" />
						<img src="assets/storybook-logo.svg" alt="storybook" />
						<img src="assets/xd-logo.svg" alt="xd" />
					</div>
				</div>
			</div>


			{/* Pre-Built Application Modules */}
			<div className="container-fluid py-5 bg-black mt-7">
				<div className="container pb-5">
					<div className="py-5 mb-4 text-center">
						<RdsLabel
							fontWeight="semibold"
							label="Pre-Built Application Modules"
							class="text-white fs-2"
						/>
					</div>

					<div id="carouselExampleIndicators" className="carousel slide modules-slider" data-bs-ride="true">
						<div className="carousel-indicators">
							<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
							<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
							<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
							<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
						</div>
						<div className="carousel-inner">
							<div className="carousel-item module-items active">
								<div className="row w-75 mx-auto">
									<div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-5 pe-xxl-4 pe-xl-4 pe-lg-4">
										<div className="card border-gradient-primary bg-transparent border-0 px-xxl-5 px-xl-3 px-lg-0 px-md-0 px-0  py-3 h-100">
											<div className="card-body text-center">
												<div className="pb-1">
													<img src="assets/landing-assets/Account.svg" alt="Account" height="48px" width="40px" />
												</div>
												<RdsLabel
													fontWeight="semibold"
													label="Account"
													class="text-white pt-1 pb-3"
												/>
												<p className="fs-6 fw-light px-xxl-4 px-xl-0 px-lg-4 px-0 text-blue-50 px-md-0">Login, register, forgot password, email activation, social logins and other account related functionalities</p>
											</div>
										</div>
									</div>
									<div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-5 ps-xxl-4 ps-xl-4 ps-lg-4">
										<div className="card border-gradient-primary bg-transparent border-0 px-xxl-5 px-xl-3 px-lg-0 px-md-0 px-0  py-3 h-100">
											<div className="card-body text-center">
												<div className="pb-1">
													<img src="assets/landing-assets/Audit-Logging.svg" alt="Audit Logging" height="48px" width="40px" />
												</div>
												<RdsLabel
													fontWeight="semibold"
													label="Audit Logging"
													class="text-white pt-1 pb-3"
												/>
												<p className="fs-6 fw-light px-xxl-4 px-xl-0 px-lg-4 px-0 text-blue-50 px-md-0">Reporting the user audit logs and entity history in details</p>
											</div>
										</div>
									</div>
									<div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 pe-xxl-4 mb-5 pe-xl-4 pe-lg-4">
										<div className="card border-gradient-primary bg-transparent border-0 px-xxl-5 px-xl-3 px-lg-0 px-md-0 px-0  py-3 h-100">
											<div className="card-body text-center">
												<div className="pb-1">
													<img src="assets/landing-assets/Chat.svg" alt="Chat" height="48px" width="40px" />
												</div>
												<RdsLabel
													fontWeight="semibold"
													label="Chat"
													class="text-white pt-1 pb-3"
												/>
												<p className="fs-6 fw-light px-xxl-4 px-xl-0 px-lg-4 px-0 text-blue-50 px-md-0">Real time messaging between users</p>
											</div>
										</div>
									</div>
									<div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 ps-xxl-4 mb-5 ps-xl-4 ps-lg-4">
										<div className="card border-gradient-primary bg-transparent border-0 px-xxl-5 px-xl-3 px-lg-0 px-md-0 px-0  py-3 h-100">
											<div className="card-body text-center">
												<div className="pb-1">
													<img src="assets/landing-assets/CMS-Kit.svg" alt="CMS Kit" height="48px" width="40px" />
												</div>
												<RdsLabel
													fontWeight="semibold"
													label="CMS Kit"
													class="text-white pt-1 pb-3"
												/>
												<p className="fs-6 fw-light px-xxl-4 px-xl-0 px-lg-4 px-0 text-blue-50 px-md-0">Building blocks to create your own Content Management System</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="carousel-item module-items">
								<div className="row w-75 mx-auto">
									<div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-5 pe-xxl-4 pe-xl-4 pe-lg-4">
										<div className="card border-gradient-primary bg-transparent border-0 px-xxl-5 px-xl-3 px-lg-0 px-md-0 px-0  py-3 h-100">
											<div className="card-body text-center">
												<div className="pb-1">
													<img src="assets/landing-assets/File-Management.svg" alt="File Management" height="48px" width="40px" />
												</div>
												<RdsLabel
													fontWeight="semibold"
													label="File Management"
													class="text-white pt-1 pb-3"
												/>
												<p className="fs-6 fw-light px-xxl-4 px-xl-0 px-lg-4 px-0 text-blue-50 px-md-0">Organize, upload/download files as per hierarchy.</p>
											</div>
										</div>
									</div>
									<div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-5 ps-xxl-4 ps-xl-4 ps-lg-4">
										<div className="card border-gradient-primary bg-transparent border-0 px-xxl-5 px-xl-3 px-lg-0 px-md-0 px-0  py-3 h-100">
											<div className="card-body text-center">
												<div className="pb-1">
													<img src="assets/landing-assets/Forms.svg" alt="Forms" height="48px" width="40px" />
												</div>
												<RdsLabel
													fontWeight="semibold"
													label="Forms"
													class="text-white pt-1 pb-3"
												/>
												<p className="fs-6 fw-light px-xxl-4 px-xl-0 px-lg-4 px-0 text-blue-50">Create forms and surveys</p>
											</div>
										</div>
									</div>
									<div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 pe-xxl-4 mb-5 pe-xl-4 pe-lg-4">
										<div className="card border-gradient-primary bg-transparent border-0 px-xxl-5 px-xl-3 px-lg-0 px-md-0 px-0  py-3 h-100">
											<div className="card-body text-center">
												<div className="pb-1">
													<img src="assets/landing-assets/GDPR.svg" alt="GDPR" height="48px" width="40px" />
												</div>
												<RdsLabel
													fontWeight="semibold"
													label="GDPR"
													class="text-white pt-1 pb-3"
												/>
												<p className="fs-6 fw-light px-xxl-4 px-xl-0 px-lg-4 px-0 text-blue-50 px-md-0">This module allows users to download and delete their personal data collected by the application</p>
											</div>
										</div>
									</div>
									<div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 ps-xxl-4 mb-5 ps-xl-4 ps-lg-4">
										<div className="card border-gradient-primary bg-transparent border-0 px-xxl-5 px-xl-3 px-lg-0 px-md-0 px-0  py-3 h-100">
											<div className="card-body text-center">
												<div className="pb-1">
													<img src="assets/landing-assets/Language-Management.svg" alt="Language Management" height="48px" width="40px" />
												</div>
												<RdsLabel
													fontWeight="semibold"
													label="Language Management"
													class="text-white pt-1 pb-3"
												/>
												<p className="fs-6 fw-light px-xxl-4 px-xl-0 px-lg-4 px-0 text-blue-50 px-md-0">Add or remove languages and localize the application UI on the fly</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="carousel-item module-items">
								<div className="row w-75 mx-auto">
									<div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-5 pe-xxl-4 pe-xl-4 pe-lg-4">
										<div className="card border-gradient-primary bg-transparent border-0 px-xxl-5 px-xl-3 px-lg-0 px-md-0 px-0  py-3 h-100">
											<div className="card-body text-center">
												<div className="pb-1">
													<img src="assets/landing-assets/Raaghu-Theming.svg" alt="Raaghu Theming" height="48px" width="40px" />
												</div>
												<RdsLabel
													fontWeight="semibold"
													label="Raaghu Theming"
													class="text-white pt-1 pb-3"
												/>
												<p className="fs-6 fw-light px-xxl-4 px-xl-0 px-lg-4 px-0 text-blue-50 px-md-0">Switch to desired themes or customize as per brand guidelines</p>
											</div>
										</div>
									</div>
									<div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-5 ps-xxl-4 ps-xl-4 ps-lg-4">
										<div className="card border-gradient-primary bg-transparent border-0 px-xxl-5 px-xl-3 px-lg-0 px-md-0 px-0  py-3 h-100">
											<div className="card-body text-center">
												<div className="pb-1">
													<img src="assets/landing-assets/OpenIddict-UI.svg" alt="OpenIddict UI" height="48px" width="40px" />
												</div>
												<RdsLabel
													fontWeight="semibold"
													label="OpenIddict UI"
													class="text-white pt-1 pb-3"
												/>
												<p className="fs-6 fw-light px-xxl-4 px-xl-0 px-lg-4 px-0 text-blue-50 px-md-0">User, role, claims and permission management</p>
											</div>
										</div>
									</div>
									<div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 pe-xxl-4 mb-5 pe-xl-4 pe-lg-4">
										<div className="card border-gradient-primary bg-transparent border-0 px-xxl-5 px-xl-3 px-lg-0 px-md-0 px-0  py-3 h-100">
											<div className="card-body text-center">
												<div className="pb-1">
													<img src="assets/landing-assets/Payment.svg" alt="Payment" height="48px" width="40px" />
												</div>
												<RdsLabel
													fontWeight="semibold"
													label="Payment"
													class="text-white pt-1 pb-3"
												/>
												<p className="fs-6 fw-light px-xxl-4 px-xl-0 px-lg-4 px-0 text-blue-50 px-md-0">Provides integration for different payment gateways</p>
											</div>
										</div>
									</div>
									<div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 ps-xxl-4 mb-5 ps-xl-4 ps-lg-4">
										<div className="card border-gradient-primary bg-transparent border-0 px-xxl-5 px-xl-3 px-lg-0 px-md-0 px-0  py-3 h-100">
											<div className="card-body text-center">
												<div className="pb-1">
													<img src="assets/landing-assets/SaaS.svg" alt="SaaS" height="48px" width="40px" />
												</div>
												<RdsLabel
													fontWeight="semibold"
													label="SaaS"
													class="text-white pt-1 pb-3"
												/>
												<p className="fs-6 fw-light px-xxl-4 px-xl-0 px-lg-4 px-0 text-blue-50 px-md-0">Manage tenants, editions and features to create your multi-tenant / SaaS application</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="carousel-item module-items">
								<div className="row w-75 mx-auto">
									<div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-5 ps-xxl-4 ps-xl-4 ps-lg-4">
										<div className="card border-gradient-primary bg-transparent border-0 px-xxl-5 px-xl-3 px-lg-0 px-md-0 px-0  py-3 h-100">
											<div className="card-body text-center">
												<div className="pb-1">
													<img src="assets/landing-assets/Text-Template-Management.svg" alt="Text Template Management" height="48px" width="40px" />
												</div>
												<RdsLabel
													fontWeight="semibold"
													label="Text Template Management"
													class="text-white pt-1 pb-3"
												/>
												<p className="fs-6 fw-light px-xxl-4 px-xl-0 px-lg-4 px-0 text-blue-50 px-md-0">Edit text/email templates on the user interface</p>
											</div>
										</div>
									</div>
									<div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mb-5 pe-xxl-4 pe-xl-4 pe-lg-4">
										<div className="card border-gradient-primary bg-transparent border-0 px-xxl-5 px-xl-3 px-lg-0 px-md-0 px-0  py-3 h-100">
											<div className="card-body text-center">
												<div className="pb-1">
													<img src="assets/landing-assets/Account.svg" alt="Account" height="48px" width="40px" />
												</div>
												<RdsLabel
													fontWeight="semibold"
													label="Account"
													class="text-white pt-1 pb-3"
												/>
												<p className="fs-6 fw-light px-xxl-4 px-xl-0 px-lg-4 px-0 text-blue-50 px-md-0">Login, register, forgot password, email activation, social logins and other account related functionalities</p>
											</div>
										</div>
									</div>
									<div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 ps-xxl-4 mb-5 ps-xl-4 ps-lg-4">
										<div className="card border-gradient-primary bg-transparent border-0 px-xxl-5 px-xl-3 px-lg-0 px-md-0 px-0  py-3 h-100">
											<div className="card-body text-center">
												<div className="pb-1">
													<img src="assets/landing-assets/Blogging.svg" alt="Blogging" height="48px" width="40px" />
												</div>
												<RdsLabel
													fontWeight="semibold"
													label="Blogging"
													class="text-white pt-1 pb-3"
												/>
												<p className="fs-6 fw-light px-xxl-4 px-xl-0 px-lg-4 px-0 text-blue-50 px-md-0">Create and manage your own blogs</p>
											</div>
										</div>
									</div>
									<div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 pe-xxl-4 mb-5 pe-xl-4 pe-lg-4">
										<div className="card border-gradient-primary bg-transparent border-0 px-xxl-5 px-xl-3 px-lg-0 px-md-0 px-0 py-3 h-100">
											<div className="card-body text-center">
												<div className="pb-1">
													<img src="assets/landing-assets/Chat.svg" alt="Chat" height="48px" width="40px" />
												</div>
												<RdsLabel
													fontWeight="semibold"
													label="Chat"
													class="text-white pt-1 pb-3"
												/>
												<p className="fs-6 fw-light px-xxl-4 px-xl-0 px-lg-4 px-0 text-blue-50 px-md-0">Real time messaging between users</p>
											</div>
										</div>
									</div>

								</div>
							</div>
						</div>
						<button className="carousel-control-prev arrows" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
							<span className="carousel-control-prev-icon" aria-hidden="true"></span>
							<span className="visually-hidden">Previous</span>
						</button>
						<button className="carousel-control-next arrows" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
							<span className="carousel-control-next-icon" aria-hidden="true"></span>
							<span className="visually-hidden">Next</span>
						</button>
					</div>
				</div>
			</div>

		</>
	)
}
export default Home;