import React from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { RdsCarousel, RdsBadge, RdsInput, RdsButton, RdsFileUploader } from '../../raaghu-elements';
import './rds-comp-product-tour.scss';
interface RdsCompProductTourProps {
    state: "Image" | "Carousel" | "GIF" | "Form";
    topLeft?: boolean;
    topRight?: boolean;
    bottomLeft?: boolean;
    bottomRight?: boolean;
    header?: string;
    description?: string;
    stepsIndicator?: string;
    showDismiss?: boolean;
    showPrimaryButton?: boolean;
    showSecondaryButton?: boolean;
    showTertiaryButton?: boolean;
    showVisualPlaceholder?: boolean;
}
const RdsCompProductTour: React.FC<RdsCompProductTourProps> = ({
    state = "Image",
    topLeft = false,
    topRight = false,
    bottomLeft = false,
    bottomRight = false,
    header = "Tour Title",
    description = "Tour Description",
    stepsIndicator = "1/3",
    showDismiss = true,
    showPrimaryButton = true,
    showSecondaryButton = true,
    showTertiaryButton = true,
    showVisualPlaceholder = true,
}) => {
    const slides = [
        { id: 1, imgUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", name: header, subTitle: description },
        { id: 2, imgUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80", name: header, subTitle: description },
        { id: 3, imgUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", name: header, subTitle: description },
    ];
    const renderCornerDots = () => (
        <>
            {topLeft && <Box className="rds-comp-product-tour__corner-dot rds-comp-product-tour__corner-dot--top-left" />}
            {topRight && <Box className="rds-comp-product-tour__corner-dot rds-comp-product-tour__corner-dot--top-right" />}
            {bottomLeft && <Box className="rds-comp-product-tour__corner-dot rds-comp-product-tour__corner-dot--bottom-left" />}
            {bottomRight && <Box className="rds-comp-product-tour__corner-dot rds-comp-product-tour__corner-dot--bottom-right" />}
        </>
    );
    const renderCloseButton = () => showDismiss && (
        <IconButton className="rds-comp-product-tour__close-btn" aria-label="Close" sx={{ position: 'absolute', top: 12, right: 14, zIndex: 10, color: '#9E9E9E' }}>
            <Close />
        </IconButton>
    );
    const arrowSvg = (isNext: boolean) => (
        <svg width="16" height="16" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={isNext ? "M.5,20.5L11.236,11.038c.337-.279,.354-.746,.038-1.044-.012-.011-.025-.022-.038-.033L.5,.5" : "M11.5,.5L.764,9.962c-.337,.279-.354,.746-.038,1.044,.012,.011,.025,.022,.038,.033l10.736,9.462"}
                stroke={isNext ? "currentColor" : "#7C3AED"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
    const renderNavigationButtons = (variant = 'default') => (
        <Box className={`rds-comp-product-tour__arrows rds-comp-product-tour__arrows--${variant}`}>
            {showSecondaryButton && <button className="rds-comp-product-tour__arrow rds-comp-product-tour__arrow--prev">{arrowSvg(false)}</button>}
            {showPrimaryButton && <button className="rds-comp-product-tour__arrow rds-comp-product-tour__arrow--next">{arrowSvg(true)}</button>}
        </Box>
    );
    const renderSkipButton = (className: string) => showTertiaryButton && (
        <Typography className={className}>Skip</Typography>
    );
    const renderNavRow = (stepClass: string, skipClass: string, arrowClass: string) => (
        <Box className="rds-comp-product-tour__navigation-row">
            <Typography className={stepClass}>{stepsIndicator}</Typography>
            {renderSkipButton(skipClass)}
            <Box className={arrowClass}>{renderNavigationButtons()}</Box>
        </Box>
    );
    const renderInfoSection = () => (
        <Box className="rds-comp-product-tour__info">
            <Typography variant="h6" className="rds-comp-product-tour__title">{header}</Typography>
            <Typography variant="body2" className="rds-comp-product-tour__desc">{description}</Typography>
        </Box>
    );
    const deleteIcon = (
        <svg fill="none" height="20" viewBox="0 0 14 14" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 3.80979H13M4.46201 3.75519V3.2968C4.46201 2.68765 4.73087 2.10346 5.20946 1.67273C5.68806 1.242 6.33718 1 7.01401 1C7.69084 1 8.33995 1.242 8.81854 1.67273C9.29714 2.10346 9.566 2.68765 9.566 3.2968V3.75581M5.51067 5.572V10.624M8.51733 5.572V10.624M2.53067 3.814H11.498V12.0814C11.4997 12.2006 11.4752 12.3189 11.4261 12.4296C11.3769 12.5403 11.304 12.6411 11.2115 12.7264C11.119 12.8118 11.0087 12.8798 10.887 12.9268C10.7653 12.9737 10.6344 12.9986 10.502 13H3.53C3.26259 12.997 3.00746 12.8986 2.82069 12.7263C2.63392 12.554 2.5308 12.3221 2.53401 12.0814V3.814H2.53067Z" stroke="#BD0D1D" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
    const renderFormInputs = () => (
        <>
            <Box className="rds-comp-product-tour__form-input-row">
                <Box className="rds-comp-product-tour__form-input-container">
                    <RdsInput placeholder="Enter Project Name" size="medium" layout="text" showIcon={true} variant="outlined" />
                </Box>
            </Box>
            <Box className="rds-comp-product-tour__form-input-row">
                <Box className="rds-comp-product-tour__form-input-container">
                    <RdsInput placeholder="Add Team Members" size="medium" layout="text" showIcon={true} variant="outlined" />
                </Box>
                <RdsButton text="Add" style="outlined" size="medium" inputSize="medium" layout="text-only" />
            </Box>
            <Box className="rds-comp-product-tour__form-textarea-container">
                <RdsInput placeholder="Enter Project Description" multiline rows={3} variant="outlined" size="medium" />
            </Box>
            <Box className="rds-comp-product-tour__form-button-right">
                <RdsButton text="Add" style="outlined" size="medium" inputSize="medium" layout="text-only" />
            </Box>
        </>
    );
    const renderCarouselArrows = () => (
        <Box className="rds-comp-product-tour__carousel-arrows">
            {showSecondaryButton && <button className="rds-comp-product-tour__carousel-arrow-prev">{arrowSvg(false)}</button>}
            {showPrimaryButton && <button className="rds-comp-product-tour__carousel-arrow-next">{arrowSvg(true)}</button>}
        </Box>
    );
    const renderCarouselNavigation = () => (
        <Box className="rds-comp-product-tour__carousel-nav-row">
            <Typography className="rds-comp-product-tour__carousel-stepcount">{stepsIndicator}</Typography>
            <Box className="rds-comp-product-tour__carousel-nav-group">
                {showTertiaryButton && <button className="rds-comp-product-tour__carousel-skip">Skip</button>}
                {renderCarouselArrows()}
            </Box>
        </Box>
    );
    const renderGifArrows = () => (
        <Box className="rds-comp-product-tour__animation-nav-buttons">
            {showSecondaryButton && <button className="rds-comp-product-tour__animation-nav-prev">{arrowSvg(false)}</button>}
            {showPrimaryButton && <button className="rds-comp-product-tour__animation-nav-next">{arrowSvg(true)}</button>}
        </Box>
    );
    const renderGifNavigation = () => (
        <Box className="rds-comp-product-tour__animation-navigation">
            <Typography className="rds-comp-product-tour__animation-stepcount">{stepsIndicator}</Typography>
            <Box className="rds-comp-product-tour__animation-controls">
                {showTertiaryButton && <Typography className="rds-comp-product-tour__animation-skip">Skip</Typography>}
                {renderGifArrows()}
            </Box>
        </Box>
    );
    const renderFormArrows = () => (
        <Box className="rds-comp-product-tour__form-arrows">
            {showSecondaryButton && <button className="rds-comp-product-tour__form-arrow-prev">{arrowSvg(false)}</button>}
            {showPrimaryButton && <button className="rds-comp-product-tour__form-arrow-next">{arrowSvg(true)}</button>}
        </Box>
    );
    const renderFormNavigation = () => (
        <Box className="rds-comp-product-tour__form-navigation">
            <Typography className="rds-comp-product-tour__form-stepcount">{stepsIndicator}</Typography>
            <Box className="rds-comp-product-tour__form-navigation-actions">
                {showTertiaryButton && <Typography className="rds-comp-product-tour__form-skip">Skip</Typography>}
                {renderFormArrows()}
            </Box>
        </Box>
    );
    if (state === "Image") {
        return (
            <Paper className="rds-comp-product-tour__container rds-comp-product-tour__container--image">
                {renderCornerDots()}
                {renderCloseButton()}                
                {showVisualPlaceholder ? (
                    <Box className="rds-comp-product-tour__image-section">
                        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" alt="Tour Step" className="rds-comp-product-tour__image" />
                    </Box>
                ) : (
                    <Box className="rds-comp-product-tour__image-section" sx={{ height: "220px", background: "transparent" }} />
                )}
                <Box className="rds-comp-product-tour__info-nav-section">
                    {renderInfoSection()}
                    {renderNavRow("rds-comp-product-tour__stepcount", "rds-comp-product-tour__skip", "rds-comp-product-tour__arrows")}
                </Box>
            </Paper>
        );
    }
    if (state === "Carousel") {
        return (
            <Paper className="rds-comp-product-tour__container rds-comp-product-tour__container--carousel">
                {renderCornerDots()}
                {renderCloseButton()}
                <Box className="rds-comp-product-tour__carousel-header">
                    <Typography variant="h6" className="rds-comp-product-tour__carousel-title">{header}</Typography>
                    <Typography variant="body2" className="rds-comp-product-tour__carousel-desc">{description}</Typography>
                </Box>
                <Box className="rds-comp-product-tour__carousel-wrapper">
                    <RdsCarousel showDots={false} showArrows={false} type="circle" style="default" height="300px">
                        {showVisualPlaceholder ? slides.map((slide, index) => (
                            <img key={index} src={slide.imgUrl} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                        )) : []}
                    </RdsCarousel>
                </Box>
                <Box className="rds-comp-product-tour__carousel-dots">
                    <Box className="rds-comp-product-tour__carousel-dot rds-comp-product-tour__carousel-dot--active" />
                    <Box className="rds-comp-product-tour__carousel-dot" />
                    <Box className="rds-comp-product-tour__carousel-dot" />
                </Box>
                <Box className="rds-comp-product-tour__carousel-spacer" />
                {renderCarouselNavigation()}
            </Paper>
        );
    }
    if (state === "GIF") {
        return (
            <Paper className="rds-comp-product-tour__container rds-comp-product-tour__container--animation">
                {renderCornerDots()}
                {renderCloseButton()}            
                {showVisualPlaceholder ? (
                    <Box className="rds-comp-product-tour__animation-section">
                        <img src="stories/assets/animation.gif" alt="Tour Animation GIF" className="rds-comp-product-tour__gif" />
                    </Box>
                ) : (
                    <Box sx={{ height: "220px", width: "100%", background: "transparent" }} />
                )}                
                <Box className="rds-comp-product-tour__animation-info">
                    <Typography variant="h5" className="rds-comp-product-tour__animation-title">{header}</Typography>
                    <Typography variant="body1" className="rds-comp-product-tour__animation-desc">{description}</Typography>
                </Box>
                {renderGifNavigation()}
            </Paper>
        );
    }
    if (state === "Form") {
        return (
            <Paper className="rds-comp-product-tour__container rds-comp-product-tour__container--form">
                {renderCornerDots()}
                {renderCloseButton()}
                <Box className="rds-comp-product-tour__form-header">
                    <Typography variant="h6" className="rds-comp-product-tour__form-subtitle">
                        Getting Started Tour
                    </Typography>
                </Box>
                <Box className="rds-comp-product-tour__form-content">
                    <Box className="rds-comp-product-tour__form-title-badge-row">
                        <Typography variant="h6" className="rds-comp-product-tour__form-title">{header}</Typography>
                        <RdsBadge count={undefined} badgeContent="Badge" size="medium" colorVariant="primary" shape="pill" layout="text" />
                    </Box>
                    <Typography variant="body2" className="rds-comp-product-tour__form-description">{description}</Typography>
                    <Box className="rds-comp-product-tour__form-tabs-wrapper">
                        <Box className="rds-comp-product-tour__form-tabs">
                            <Typography className="rds-comp-product-tour__form-tab">Designers</Typography>
                            <Typography className="rds-comp-product-tour__form-tab">Developers</Typography>
                            <Typography className="rds-comp-product-tour__form-tab">Managers</Typography>
                        </Box>
                        <Box className="rds-comp-product-tour__form-tabs-line"></Box>
                    </Box>
                    {renderFormInputs()}
                    <Box className="rds-comp-product-tour__file-upload-container">
                        <Box sx={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box', overflow: 'hidden' }}>
                            <RdsFileUploader accept=".pdf,.doc,.docx" dragAndDrop hintText="Maximum 5MB" isMandatory maxFiles={1} maxSize={2097152} mode="standard" onFilesChange={() => {}} showHint showPreview showTitle> {deleteIcon} </RdsFileUploader>
                        </Box>
                    </Box>
                    {renderFormNavigation()}
                </Box>
            </Paper>
        );
    }
    return null;
};
export default RdsCompProductTour;
