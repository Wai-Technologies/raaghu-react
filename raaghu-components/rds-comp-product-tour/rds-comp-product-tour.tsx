import React, { useState, useMemo, useId } from 'react';
import clsx from 'clsx';
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

const EMPTY_TOUR_SLIDES: RdsCompProductTourProps['slides'] = [];
const EMPTY_TAB_TITLES: string[] = [];

const RdsCompProductTour = ({
    state = "Image",
    topLeft = false,
    topRight = false,
    bottomLeft = false,
    bottomRight = false,
    header,
    description,
    stepsIndicator,
    controls,
    slides,
    formTitle,
    tabTitle,
    badge = "Badge",
    imageSrc = "/assets/animation.gif",
    onClose,
    onNext,
    onBack,
    onSkip,
    ...legacyProps
}: RdsCompProductTourProps) => {
    const legacyShowDismiss = typeof legacyProps['showDismiss'] === 'boolean' ? (legacyProps['showDismiss'] as boolean) : undefined;
    const legacyShowPrimaryButton = typeof legacyProps['showPrimaryButton'] === 'boolean' ? (legacyProps['showPrimaryButton'] as boolean) : undefined;
    const legacyShowSecondaryButton = typeof legacyProps['showSecondaryButton'] === 'boolean' ? (legacyProps['showSecondaryButton'] as boolean) : undefined;
    const legacyShowTertiaryButton = typeof legacyProps['showTertiaryButton'] === 'boolean' ? (legacyProps['showTertiaryButton'] as boolean) : undefined;
    const legacyShowVisualPlaceholder = typeof legacyProps['showVisualPlaceholder'] === 'boolean' ? (legacyProps['showVisualPlaceholder'] as boolean) : undefined;

    const showDismiss = controls?.dismiss ? controls.dismiss === 'visible' : (legacyShowDismiss ?? true);
    const showPrimaryButton = controls?.primary ? controls.primary === 'visible' : (legacyShowPrimaryButton ?? true);
    const showSecondaryButton = controls?.secondary ? controls.secondary === 'visible' : (legacyShowSecondaryButton ?? true);
    const showTertiaryButton = controls?.tertiary ? controls.tertiary === 'visible' : (legacyShowTertiaryButton ?? true);
    const showVisualPlaceholder = controls?.visual ? controls.visual === 'visible' : (legacyShowVisualPlaceholder ?? true);

    const [isVisible, setIsVisible] = useState(true);
    const headerId = useId();
    const resolvedSlides = slides ?? EMPTY_TOUR_SLIDES;
    const resolvedTabTitle = tabTitle ?? EMPTY_TAB_TITLES;

    const parsedSteps = useMemo(() => parseSteps(stepsIndicator), [stepsIndicator]);
    const totalSlides = parsedSteps?.total ?? resolvedSlides.length;
    const effectiveSlides = useMemo(() => createEffectiveSlides(resolvedSlides, totalSlides), [resolvedSlides, totalSlides]);
    const indexFromSteps = parsedSteps && totalSlides > 0 ? Math.max(0, Math.min(parsedSteps.numerator - 1, totalSlides - 1)) : 0;
    const [currentIndex, setCurrentIndex] = useState(indexFromSteps);
    const stepsKey = `${stepsIndicator}|${totalSlides}`;
    const [prevStepsKey, setPrevStepsKey] = useState(stepsKey);
    if (stepsKey !== prevStepsKey) {
        setPrevStepsKey(stepsKey);
        setCurrentIndex(indexFromSteps);
    }

    const currentIndicator = `${effectiveSlides.length ? currentIndex + 1 : 0}/${totalSlides}`;
    const carouselState = String(currentIndex + 1);

    const handleNext = () => {
        if (effectiveSlides.length === 0) return;
        setCurrentIndex((i) => (i + 1) % totalSlides);
        onNext?.();
    };
    const handleBack = () => {
        if (effectiveSlides.length === 0) return;
        setCurrentIndex((i) => (i - 1 + totalSlides) % totalSlides);
        onBack?.();
    };
    const handleClose = () => {
        setIsVisible(false);
        onClose?.();
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape' && showDismiss) {
            e.stopPropagation();
            handleClose();
        }
    };
    const dialogProps = {
        role: 'dialog',
        tabIndex: -1,
        'aria-labelledby': header ? headerId : undefined,
        onKeyDown: handleKeyDown,
    };

    const cornerDotsElement = renderCornerDots(topLeft, topRight, bottomLeft, bottomRight);
    const closeButtonElement = renderCloseButton(showDismiss, handleClose);
    const navArgs = [currentIndicator, showTertiaryButton, showSecondaryButton, showPrimaryButton, handleBack, handleNext] as const;

    if (!isVisible) {
        return null;
    }
    if (state === "Image") {
        return (
            <Paper {...dialogProps} className="rds-comp-product-tour__container rds-comp-product-tour__container--image">
                {cornerDotsElement}
                {closeButtonElement}
                {showVisualPlaceholder ? (
                    <Box className="rds-comp-product-tour__image-section">
                        <img src={effectiveSlides[currentIndex]?.imgUrl || undefined} alt="Tour Step" className="rds-comp-product-tour__image" />
                    </Box>
                ) : (
                    <Box className="rds-comp-product-tour__image-section" sx={{ height: 'calc(var(--rds-spacing-xl) * 7)', background: 'transparent' }} />
                )}
                <Box className="rds-comp-product-tour__info-nav-section">
                    {renderInfoSection(header, description, headerId)}
                    {renderNavRow(...navArgs, "rds-comp-product-tour__stepcount", "rds-comp-product-tour__skip", "rds-comp-product-tour__arrows", onSkip)}
                </Box>
            </Paper>
        );
    }
    if (state === "Carousel") {
        return (
            <Paper {...dialogProps} className="rds-comp-product-tour__container rds-comp-product-tour__container--carousel">
                {cornerDotsElement}
                {closeButtonElement}
                <Box className="rds-comp-product-tour__carousel-header">
                    <Typography id={headerId} variant="h6" className="rds-comp-product-tour__carousel-title">{header}</Typography>
                    <Typography variant="body2" className="rds-comp-product-tour__carousel-desc">{description}</Typography>
                </Box>
                <Box className="rds-comp-product-tour__carousel-wrapper">
                    <RdsCarousel showDots={false} showArrows={false} type="circle" style="default" height="var(--rds-carousel-height, 300px)" state={carouselState as unknown as '1' | '2' | '3' | '4' | undefined}>
                        {showVisualPlaceholder ? effectiveSlides.map((slide, index) => (
                            <img key={slide.imgUrl || `slide-${index}`} src={slide.imgUrl} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--rds-border-radius-md)' }} />
                        )) : []}
                    </RdsCarousel>
                </Box>
                <Box className="rds-comp-product-tour__carousel-dots">
                    {effectiveSlides.map((slide, idx) => (
                        <Box key={slide.imgUrl || `dot-${String(idx + 1)}`} className={clsx("rds-comp-product-tour__carousel-dot", idx === currentIndex && "rds-comp-product-tour__carousel-dot--active")} />
                    ))}
                </Box>
                <Box className="rds-comp-product-tour__carousel-spacer" />
                {renderCarouselNavigation(...navArgs, onSkip)}
            </Paper>
        );
    }
    if (state === "GIF") {
        return (
            <Paper {...dialogProps} className="rds-comp-product-tour__container rds-comp-product-tour__container--animation">
                {cornerDotsElement}
                {closeButtonElement}
                {showVisualPlaceholder ? (
                    <Box className="rds-comp-product-tour__animation-section">
                        <img src={imageSrc || undefined} alt="Tour Animation GIF" className="rds-comp-product-tour__gif" />
                    </Box>
                ) : (
                    <Box sx={{ height: 'calc(var(--rds-spacing-xl) * 7)', width: '100%', background: 'transparent' }} />
                )}
                <Box className="rds-comp-product-tour__animation-info">
                    <Typography id={headerId} variant="h5" className="rds-comp-product-tour__animation-title">{header}</Typography>
                    <Typography variant="body1" className="rds-comp-product-tour__animation-desc">{description}</Typography>
                </Box>
                {renderGifNavigation(...navArgs, onSkip)}
            </Paper>
        );
    }
    if (state === "Form") {
        return (
            <Paper {...dialogProps} className="rds-comp-product-tour__container rds-comp-product-tour__container--form">
                {cornerDotsElement}
                {closeButtonElement}
                <Box className="rds-comp-product-tour__form-header">
                    <Typography variant="h6" className="rds-comp-product-tour__form-subtitle">
                       {formTitle}
                    </Typography>
                </Box>
                <Box className="rds-comp-product-tour__form-content">
                    <Box className="rds-comp-product-tour__form-title-badge-row">
                        <Typography id={headerId} variant="h6" className="rds-comp-product-tour__form-title">{header}</Typography>
                        {badge && <RdsBadge badgeContent={badge} size="medium" colorVariant="primary" shape="pill" layout="text" />}
                    </Box>
                    <Typography variant="body2" className="rds-comp-product-tour__form-description">{description}</Typography>
                    <Box className="rds-comp-product-tour__form-tabs-wrapper">
                        <Box className="rds-comp-product-tour__form-tabs">
                            {resolvedTabTitle.map((title, index) => (
                                <Typography key={title || `tab-${index}`} className="rds-comp-product-tour__form-tab">{title}</Typography>
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
                    {renderFormNavigation(...navArgs, onSkip)}
                </Box>
            </Paper>
        );
    }
    return null;
};
RdsCompProductTour.displayName = "RdsCompProductTour";
export default RdsCompProductTour;
