import { useState, useMemo, useCallback, useId } from 'react';
import type { FC } from 'react';
import clsx from 'clsx';
import { Box, Typography, Paper } from '@mui/material';
import RdsCarousel from '../../raaghu-elements/rds-carousel/rds-carousel';
import RdsBadge from '../../raaghu-elements/rds-badge/rds-badge';
import RdsFileUploader from '../../raaghu-elements/rds-file-uploader/rds-file-uploader';
import { warnDeprecatedProp } from '../../raaghu-elements/shared/utils/deprecation';
import {
    RdsCompProductTourProps,
    parseSteps,
    createEffectiveSlides,
    deleteIcon,
    resolveCornerDots,
    renderCornerDots,
    renderCloseButton,
    renderNavRow,
    renderInfoSection,
    renderCarouselNavigation,
    renderGifNavigation,
    renderFormNavigation
} from './product-tour-helpers';
import './rds-comp-product-tour.scss';

const EMPTY_TOUR_SLIDES: RdsCompProductTourProps['slides'] = [];
const EMPTY_TAB_TITLES: string[] = [];

const RdsCompProductTour: FC<RdsCompProductTourProps> = ({
    variant,
    anchorCorner,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
    header,
    title,
    badge,
    imageSrc = '/assets/animation.gif',
    children,
    onNext,
    onBack,
    onSkip,
    description,
    steps,
    activeStep,
    stepsIndicator: legacyStepsIndicator,
    controls,
    slides,
    subtitle,
    formTitle,
    items,
    tabTitle,
    onClose,
    showDismiss: legacyShowDismissProp,
    showPrimaryButton: legacyShowPrimaryButtonProp,
    showSecondaryButton: legacyShowSecondaryButtonProp,
    showTertiaryButton: legacyShowTertiaryButtonProp,
    showVisualPlaceholder: legacyShowVisualPlaceholderProp,
    className,
    sx,
    ref,
    ...rest
}) => {
    if (header !== undefined) warnDeprecatedProp('RdsCompProductTour', 'header', '`title`');
    if (formTitle !== undefined) warnDeprecatedProp('RdsCompProductTour', 'formTitle', '`subtitle`');
    if (tabTitle !== undefined) warnDeprecatedProp('RdsCompProductTour', 'tabTitle', '`items`');
    if (legacyStepsIndicator !== undefined) warnDeprecatedProp('RdsCompProductTour', 'stepsIndicator', '`steps` and `activeStep`');
    Object.entries({ topLeft, topRight, bottomLeft, bottomRight }).forEach(([k, v]) => {
        if (v !== undefined) warnDeprecatedProp('RdsCompProductTour', k, '`anchorCorner`');
    });
    const resolvedVariant = variant ?? "Image";
    const resolvedHeader = title ?? header;
    const resolvedSubtitle = subtitle ?? formTitle;
    const corners = resolveCornerDots(anchorCorner, { topLeft, topRight, bottomLeft, bottomRight });
    const headerId = useId();
    const rootProps = {
        ...rest,
        role: 'dialog' as const,
        'aria-labelledby': resolvedHeader ? headerId : undefined,
        sx,
        ref,
    };
    const legacyShowDismiss = legacyShowDismissProp;
    const legacyShowPrimaryButton = legacyShowPrimaryButtonProp;
    const legacyShowSecondaryButton = legacyShowSecondaryButtonProp;
    const legacyShowTertiaryButton = legacyShowTertiaryButtonProp;
    const legacyShowVisualPlaceholder = legacyShowVisualPlaceholderProp;

    const showDismiss = controls?.dismiss ? controls.dismiss === 'visible' : (legacyShowDismiss ?? true);
    const showPrimaryButton = controls?.primary ? controls.primary === 'visible' : (legacyShowPrimaryButton ?? true);
    const showSecondaryButton = controls?.secondary ? controls.secondary === 'visible' : (legacyShowSecondaryButton ?? true);
    const showTertiaryButton = controls?.tertiary ? controls.tertiary === 'visible' : (legacyShowTertiaryButton ?? true);
    const showVisualPlaceholder = controls?.visual ? controls.visual === 'visible' : (legacyShowVisualPlaceholder ?? true);

    const [isVisible, setIsVisible] = useState(true);
    const resolvedSlides = slides ?? EMPTY_TOUR_SLIDES;
    const resolvedTabTitle = items ?? tabTitle ?? EMPTY_TAB_TITLES;
    const stepsIndicator = steps !== undefined || activeStep !== undefined ? `${activeStep ?? 1}/${steps ?? resolvedSlides.length}` : legacyStepsIndicator;

    const parsedSteps = useMemo(() => parseSteps(stepsIndicator), [stepsIndicator]);
    const totalSlides = useMemo(() => parsedSteps?.total ?? resolvedSlides.length, [parsedSteps, resolvedSlides]);
    const effectiveSlides = useMemo(() => createEffectiveSlides(resolvedSlides, totalSlides), [resolvedSlides, totalSlides]);
    const [currentIndex, setCurrentIndex] = useState(() => {
        const parsed = parseSteps(stepsIndicator);
        if (!parsed || parsed.total <= 0) {
            return 0;
        }
        return Math.max(0, Math.min(parsed.numerator - 1, parsed.total - 1));
    });

    const [prevStepsIndicator, setPrevStepsIndicator] = useState(stepsIndicator);
    const [prevTotalSlides, setPrevTotalSlides] = useState(totalSlides);

    if (stepsIndicator !== prevStepsIndicator || totalSlides !== prevTotalSlides) {
        setPrevStepsIndicator(stepsIndicator);
        setPrevTotalSlides(totalSlides);
        if (stepsIndicator !== undefined) {
            const parsed = parseSteps(stepsIndicator);
            if (parsed && totalSlides > 0) {
                setCurrentIndex(Math.max(0, Math.min(parsed.numerator - 1, totalSlides - 1)));
            }
        }
    }

    const currentIndicator = `${effectiveSlides && effectiveSlides.length ? currentIndex + 1 : 0}/${totalSlides}`;

    const goNext = useCallback(() => {
        if (!effectiveSlides || effectiveSlides.length === 0) return;
        setCurrentIndex((i) => (i + 1) % totalSlides);
    }, [effectiveSlides, totalSlides]);

    const goPrev = useCallback(() => {
        if (!effectiveSlides || effectiveSlides.length === 0) return;
        setCurrentIndex((i) => (i - 1 + totalSlides) % totalSlides);
    }, [effectiveSlides, totalSlides]);
    const handleClose = useCallback(() => {
        setIsVisible(false);
        if (onClose) {
            onClose();
        }
    }, [onClose]);

    const handleNext = () => {
        goNext();
        onNext?.();
    };
    const handleBack = () => {
        goPrev();
        onBack?.();
    };

    const cornerDotsElement = renderCornerDots(corners.topLeft, corners.topRight, corners.bottomLeft, corners.bottomRight);
    const closeButtonElement = renderCloseButton(showDismiss, handleClose);
    const infoSectionElement = renderInfoSection(resolvedHeader, description, headerId);
    const navRowElement = renderNavRow(currentIndicator, showTertiaryButton, showSecondaryButton, showPrimaryButton, handleBack, handleNext, "rds-comp-product-tour__stepcount", "rds-comp-product-tour__skip", "rds-comp-product-tour__arrows", onSkip);
    const carouselNavigationElement = renderCarouselNavigation(currentIndicator, showTertiaryButton, showSecondaryButton, showPrimaryButton, handleBack, handleNext, onSkip);
    const gifNavigationElement = renderGifNavigation(currentIndicator, showTertiaryButton, showSecondaryButton, showPrimaryButton, handleBack, handleNext, onSkip);
    const formInputsElement = children ?? null;
    const formNavigationElement = renderFormNavigation(currentIndicator, showTertiaryButton, showSecondaryButton, showPrimaryButton, handleBack, handleNext, onSkip);

    if (!isVisible) {
        return null;
    }
    if (resolvedVariant === "Image") {
        return (
            <Paper {...rootProps} className={clsx("rds-comp-product-tour", "rds-comp-product-tour__container", "rds-comp-product-tour__container--image", className)}>
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
    if (resolvedVariant === "Carousel") {
        return (
            <Paper {...rootProps} className={clsx("rds-comp-product-tour", "rds-comp-product-tour__container", "rds-comp-product-tour__container--carousel", className)}>
                {cornerDotsElement}
                {closeButtonElement}
                <Box className="rds-comp-product-tour__carousel-header">
                    <Typography variant="inherit" component="h2" id={headerId} className="rds-comp-product-tour__carousel-title">{resolvedHeader}</Typography>
                    <Typography variant="inherit" component="p" className="rds-comp-product-tour__carousel-desc">{description}</Typography>
                </Box>
                <Box className="rds-comp-product-tour__carousel-wrapper">
                    <RdsCarousel showIndicators={false} showArrows={false} type="circle" variant="default" height="var(--rds-carousel-height)" activeIndex={currentIndex}>
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
    if (resolvedVariant === "GIF") {
        return (
            <Paper {...rootProps} className={clsx("rds-comp-product-tour", "rds-comp-product-tour__container", "rds-comp-product-tour__container--animation", className)}>
                {cornerDotsElement}
                {closeButtonElement}
                {showVisualPlaceholder ? (
                    <Box className="rds-comp-product-tour__animation-section">
                        <img src={imageSrc} alt="Tour Animation GIF" className="rds-comp-product-tour__gif" />
                    </Box>
                ) : (
                    <Box sx={{ height: 'calc(var(--rds-spacing-xl) * 7)', width: '100%', background: 'transparent' }} />
                )}
                <Box className="rds-comp-product-tour__animation-info">
                    <Typography variant="inherit" component="h2" id={headerId} className="rds-comp-product-tour__animation-title">{resolvedHeader}</Typography>
                    <Typography variant="inherit" component="p" className="rds-comp-product-tour__animation-desc">{description}</Typography>
                </Box>
                {gifNavigationElement}
            </Paper>
        );
    }
    if (resolvedVariant === "Form") {
        return (
            <Paper {...rootProps} className={clsx("rds-comp-product-tour", "rds-comp-product-tour__container", "rds-comp-product-tour__container--form", className)}>
                {cornerDotsElement}
                {closeButtonElement}
                <Box className="rds-comp-product-tour__form-header">
                    <Typography variant="inherit" component="p" className="rds-comp-product-tour__form-subtitle">
                       {resolvedSubtitle}
                    </Typography>
                </Box>
                <Box className="rds-comp-product-tour__form-content">
                    <Box className="rds-comp-product-tour__form-title-badge-row">
                        <Typography variant="inherit" component="h2" id={headerId} className="rds-comp-product-tour__form-title">{resolvedHeader}</Typography>
                        {badge !== null && <RdsBadge badgeContent={badge === undefined ? "Badge" : badge} size="medium" colorVariant="primary" shape="pill" layout="text" />}
                    </Box>
                    <Typography variant="inherit" component="p" className="rds-comp-product-tour__form-description">{description}</Typography>
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
                            <RdsFileUploader accept=".pdf,.doc,.docx" dragAndDrop helperText="Maximum 2MB" required maxFiles={1} maxSize={2097152} mode="standard" onChange={() => { }} showHint showPreview showTitle> {deleteIcon} </RdsFileUploader>
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
