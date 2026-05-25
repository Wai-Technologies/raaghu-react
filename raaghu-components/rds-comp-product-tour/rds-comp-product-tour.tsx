import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { RdsCarousel, RdsBadge, RdsFileUploader } from '../../raaghu-elements';
import {
    RdsCompProductTourProps,
    parseSteps,
    createEffectiveSlides,
    deleteIcon,
    renderCornerDots,
    renderCloseButton,
    renderNavRow,
    renderInfoSection,
    renderFormInputs,
    renderCarouselNavigation,
    renderGifNavigation,
    renderFormNavigation
} from './product-tour-helpers';
import './rds-comp-product-tour.scss';

const RdsCompProductTour: React.FC<RdsCompProductTourProps> = ({
    state = "Image",
    topLeft = false,
    topRight = false,
    bottomLeft = false,
    bottomRight = false,
    header,
    description,
    stepsIndicator,
    showDismiss = true,
    showPrimaryButton = true,
    showSecondaryButton = true,
    showTertiaryButton = true,
    showVisualPlaceholder = true,
    slides = [],
    formTitle,
    tabTitle = [],
    onClose,
}) => {
    const [isVisible, setIsVisible] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    const parsedSteps = parseSteps(stepsIndicator);
    const totalSlides = parsedSteps?.total ?? (slides ? slides.length : 0);
    const effectiveSlides = createEffectiveSlides(slides, totalSlides);
    const computedIndicator = `${effectiveSlides && effectiveSlides.length ? currentIndex + 1 : 0}/${totalSlides}`;
    const [displayIndicator, setDisplayIndicator] = useState<string>(stepsIndicator ?? computedIndicator);

    useEffect(() => {
        if (stepsIndicator !== undefined) {
            setDisplayIndicator(stepsIndicator);
            const parsed = parseSteps(stepsIndicator);
            if (parsed) {
                const newIndex = Math.max(0, Math.min(parsed.numerator - 1, totalSlides - 1));
                setCurrentIndex(newIndex);
            }
        }
    }, [stepsIndicator, totalSlides]);

    useEffect(() => {
        setDisplayIndicator(computedIndicator);
    }, [currentIndex, effectiveSlides.length]);

    useEffect(() => {
        setIsVisible(true);
    }, [state]);

    const goNext = () => {
        if (!effectiveSlides || effectiveSlides.length === 0) return;
        setCurrentIndex((i) => {
            const next = i + 1;
            return next % totalSlides;
        });
    };

    const goPrev = () => {
        if (!effectiveSlides || effectiveSlides.length === 0) return;
        setCurrentIndex((i) => {
            const prev = i - 1;
            return (prev + totalSlides) % totalSlides;
        });
    };
    const handleClose = () => {
        setIsVisible(false);
        if (onClose) {
            onClose();
        }
    };

    const currentIndicator = displayIndicator;
    const carouselState = String(currentIndex + 1);
    
    if (!isVisible) {
        return null;
    }
    if (state === "Image") {
        return (
            <Paper className="rds-comp-product-tour__container rds-comp-product-tour__container--image">
                {renderCornerDots(topLeft, topRight, bottomLeft, bottomRight)}
                {renderCloseButton(showDismiss, handleClose)}
                {showVisualPlaceholder ? (
                    <Box className="rds-comp-product-tour__image-section">
                        <img src={effectiveSlides[currentIndex] ? effectiveSlides[currentIndex].imgUrl : ""} alt="Tour Step" className="rds-comp-product-tour__image" />
                    </Box>
                ) : (
                    <Box className="rds-comp-product-tour__image-section" sx={{ height: 'calc(var(--rds-spacing-xl) * 7)', background: 'transparent' }} />
                )}
                <Box className="rds-comp-product-tour__info-nav-section">
                    {renderInfoSection(header, description)}
                    {renderNavRow(currentIndicator, showTertiaryButton, showSecondaryButton, showPrimaryButton, goPrev, goNext, "rds-comp-product-tour__stepcount", "rds-comp-product-tour__skip", "rds-comp-product-tour__arrows")}
                </Box>
            </Paper>
        );
    }
    if (state === "Carousel") {
        return (
            <Paper className="rds-comp-product-tour__container rds-comp-product-tour__container--carousel">
                {renderCornerDots(topLeft, topRight, bottomLeft, bottomRight)}
                {renderCloseButton(showDismiss, handleClose)}
                <Box className="rds-comp-product-tour__carousel-header">
                    <Typography variant="h6" className="rds-comp-product-tour__carousel-title">{header}</Typography>
                    <Typography variant="body2" className="rds-comp-product-tour__carousel-desc">{description}</Typography>
                </Box>
                <Box className="rds-comp-product-tour__carousel-wrapper">
                    <RdsCarousel showDots={false} showArrows={false} type="circle" style="default" height="var(--rds-carousel-height, 300px)" state={carouselState as unknown as '1' | '2' | '3' | '4' | undefined}>
                        {showVisualPlaceholder ? effectiveSlides.map((slide, index) => (
                            <img key={index} src={slide.imgUrl} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--rds-border-radius-md)' }} />
                        )) : []}
                    </RdsCarousel>
                </Box>
                <Box className="rds-comp-product-tour__carousel-dots">
                    {effectiveSlides.map((_, idx) => (
                        <Box key={idx} className={`rds-comp-product-tour__carousel-dot ${idx === currentIndex ? 'rds-comp-product-tour__carousel-dot--active' : ''}`} />
                    ))}
                </Box>
                <Box className="rds-comp-product-tour__carousel-spacer" />
                {renderCarouselNavigation(currentIndicator, showTertiaryButton, showSecondaryButton, showPrimaryButton, goPrev, goNext)}
            </Paper>
        );
    }
    if (state === "GIF") {
        return (
            <Paper className="rds-comp-product-tour__container rds-comp-product-tour__container--animation">
                {renderCornerDots(topLeft, topRight, bottomLeft, bottomRight)}
                {renderCloseButton(showDismiss, handleClose)}
                {showVisualPlaceholder ? (
                    <Box className="rds-comp-product-tour__animation-section">
                        <img src="/assets/animation.gif" alt="Tour Animation GIF" className="rds-comp-product-tour__gif" />
                    </Box>
                ) : (
                    <Box sx={{ height: 'calc(var(--rds-spacing-xl) * 7)', width: '100%', background: 'transparent' }} />
                )}
                <Box className="rds-comp-product-tour__animation-info">
                    <Typography variant="h5" className="rds-comp-product-tour__animation-title">{header}</Typography>
                    <Typography variant="body1" className="rds-comp-product-tour__animation-desc">{description}</Typography>
                </Box>
                {renderGifNavigation(currentIndicator, showTertiaryButton, showSecondaryButton, showPrimaryButton, goPrev, goNext)}
            </Paper>
        );
    }
    if (state === "Form") {
        return (
            <Paper className="rds-comp-product-tour__container rds-comp-product-tour__container--form">
                {renderCornerDots(topLeft, topRight, bottomLeft, bottomRight)}
                {renderCloseButton(showDismiss, handleClose)}
                <Box className="rds-comp-product-tour__form-header">
                    <Typography variant="h6" className="rds-comp-product-tour__form-subtitle">
                       {formTitle}
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
                            {tabTitle.map((title, index) => (
                                <Typography key={index} className="rds-comp-product-tour__form-tab">{title}</Typography>
                            ))}
                        </Box>
                        <Box className="rds-comp-product-tour__form-tabs-line"></Box>
                    </Box>
                    {renderFormInputs()}
                    <Box className="rds-comp-product-tour__file-upload-container">
                        <Box className="rds-comp-product-tour__file-upload-container-wrapper">
                            <RdsFileUploader accept=".pdf,.doc,.docx" dragAndDrop hintText="Maximum 5MB" isMandatory maxFiles={1} maxSize={2097152} mode="standard" onFilesChange={() => { }} showHint showPreview showTitle> {deleteIcon} </RdsFileUploader>
                        </Box>
                    </Box>
                    {renderFormNavigation(currentIndicator, showTertiaryButton, showSecondaryButton, showPrimaryButton, goPrev, goNext)}
                </Box>
            </Paper>
        );
    }
    return null;
};
RdsCompProductTour.displayName = "RdsCompProductTour";
export default RdsCompProductTour;
