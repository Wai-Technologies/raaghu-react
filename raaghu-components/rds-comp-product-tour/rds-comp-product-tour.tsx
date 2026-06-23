import { useState, useMemo, useCallback } from 'react';
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
    onClose,
    ...legacyProps
}) => {
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
    const [currentIndexState, setCurrentIndexState] = useState(0);
    const resolvedSlides = slides ?? EMPTY_TOUR_SLIDES;
    const resolvedTabTitle = tabTitle ?? EMPTY_TAB_TITLES;

    const parsedSteps = useMemo(() => parseSteps(stepsIndicator), [stepsIndicator]);
    const totalSlides = useMemo(() => parsedSteps?.total ?? resolvedSlides.length, [parsedSteps, resolvedSlides]);
    const effectiveSlides = useMemo(() => createEffectiveSlides(resolvedSlides, totalSlides), [resolvedSlides, totalSlides]);
    const controlledIndex = useMemo(() => {
        if (stepsIndicator === undefined) {
            return undefined;
        }
        const parsed = parseSteps(stepsIndicator);
        if (!parsed || totalSlides <= 0) {
            return 0;
        }
        return Math.max(0, Math.min(parsed.numerator - 1, totalSlides - 1));
    }, [stepsIndicator, totalSlides]);
    const currentIndex = controlledIndex ?? currentIndexState;
    const computedIndicator = `${effectiveSlides && effectiveSlides.length ? currentIndex + 1 : 0}/${totalSlides}`;

    const goNext = useCallback(() => {
        if (!effectiveSlides || effectiveSlides.length === 0 || controlledIndex !== undefined) return;
        setCurrentIndexState((i) => {
            const next = i + 1;
            return next % totalSlides;
        });
    }, [controlledIndex, effectiveSlides, totalSlides]);

    const goPrev = useCallback(() => {
        if (!effectiveSlides || effectiveSlides.length === 0 || controlledIndex !== undefined) return;
        setCurrentIndexState((i) => {
            const prev = i - 1;
            return (prev + totalSlides) % totalSlides;
        });
    }, [controlledIndex, effectiveSlides, totalSlides]);
    const currentIndicator = stepsIndicator ?? computedIndicator;
    const carouselState = String(currentIndex + 1);
    const handleClose = useCallback(() => {
        setIsVisible(false);
        if (onClose) {
            onClose();
        }
    }, [onClose]);

    const cornerDotsElement = useMemo(
        () => renderCornerDots(topLeft, topRight, bottomLeft, bottomRight),
        [topLeft, topRight, bottomLeft, bottomRight]
    );
    const closeButtonElement = useMemo(
        () => renderCloseButton(showDismiss, handleClose),
        [showDismiss, handleClose]
    );
    const infoSectionElement = useMemo(
        () => renderInfoSection(header, description),
        [header, description]
    );
    const navRowElement = useMemo(
        () => renderNavRow(currentIndicator, showTertiaryButton, showSecondaryButton, showPrimaryButton, goPrev, goNext, "rds-comp-product-tour__stepcount", "rds-comp-product-tour__skip", "rds-comp-product-tour__arrows"),
        [currentIndicator, showTertiaryButton, showSecondaryButton, showPrimaryButton, goPrev, goNext]
    );
    const carouselNavigationElement = useMemo(
        () => renderCarouselNavigation(currentIndicator, showTertiaryButton, showSecondaryButton, showPrimaryButton, goPrev, goNext),
        [currentIndicator, showTertiaryButton, showSecondaryButton, showPrimaryButton, goPrev, goNext]
    );
    const gifNavigationElement = useMemo(
        () => renderGifNavigation(currentIndicator, showTertiaryButton, showSecondaryButton, showPrimaryButton, goPrev, goNext),
        [currentIndicator, showTertiaryButton, showSecondaryButton, showPrimaryButton, goPrev, goNext]
    );
    const formInputsElement = useMemo(() => renderFormInputs(), []);
    const formNavigationElement = useMemo(
        () => renderFormNavigation(currentIndicator, showTertiaryButton, showSecondaryButton, showPrimaryButton, goPrev, goNext),
        [currentIndicator, showTertiaryButton, showSecondaryButton, showPrimaryButton, goPrev, goNext]
    );
    
    if (!isVisible) {
        return null;
    }
    if (state === "Image") {
        return (
            <Paper className="rds-comp-product-tour__container rds-comp-product-tour__container--image">
                {cornerDotsElement}
                {closeButtonElement}
                {showVisualPlaceholder ? (
                    <Box className="rds-comp-product-tour__image-section">
                        <img src={effectiveSlides[currentIndex] ? effectiveSlides[currentIndex].imgUrl : ""} alt="Tour Step" className="rds-comp-product-tour__image" />
                    </Box>
                ) : (
                    <Box className="rds-comp-product-tour__image-section" sx={{ height: 'calc(var(--rds-spacing-xl) * 7)', background: 'transparent' }} />
                )}
                <Box className="rds-comp-product-tour__info-nav-section">
                    {infoSectionElement}
                    {navRowElement}
                </Box>
            </Paper>
        );
    }
    if (state === "Carousel") {
        return (
            <Paper className="rds-comp-product-tour__container rds-comp-product-tour__container--carousel">
                {cornerDotsElement}
                {closeButtonElement}
                <Box className="rds-comp-product-tour__carousel-header">
                    <Typography variant="h6" className="rds-comp-product-tour__carousel-title">{header}</Typography>
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
                {carouselNavigationElement}
            </Paper>
        );
    }
    if (state === "GIF") {
        return (
            <Paper className="rds-comp-product-tour__container rds-comp-product-tour__container--animation">
                {cornerDotsElement}
                {closeButtonElement}
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
                {gifNavigationElement}
            </Paper>
        );
    }
    if (state === "Form") {
        return (
            <Paper className="rds-comp-product-tour__container rds-comp-product-tour__container--form">
                {cornerDotsElement}
                {closeButtonElement}
                <Box className="rds-comp-product-tour__form-header">
                    <Typography variant="h6" className="rds-comp-product-tour__form-subtitle">
                       {formTitle}
                    </Typography>
                </Box>
                <Box className="rds-comp-product-tour__form-content">
                    <Box className="rds-comp-product-tour__form-title-badge-row">
                        <Typography variant="h6" className="rds-comp-product-tour__form-title">{header}</Typography>
                        <RdsBadge badgeContent="Badge" size="medium" colorVariant="primary" shape="pill" layout="text" />
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
                    {formInputsElement}
                    <Box className="rds-comp-product-tour__file-upload-container">
                        <Box className="rds-comp-product-tour__file-upload-container-wrapper">
                            <RdsFileUploader accept=".pdf,.doc,.docx" dragAndDrop hintText="Maximum 5MB" isMandatory maxFiles={1} maxSize={2097152} mode="standard" onFilesChange={() => { }} showHint showPreview showTitle> {deleteIcon} </RdsFileUploader>
                        </Box>
                    </Box>
                    {formNavigationElement}
                </Box>
            </Paper>
        );
    }
    return null;
};
RdsCompProductTour.displayName = "RdsCompProductTour";
export default RdsCompProductTour;
