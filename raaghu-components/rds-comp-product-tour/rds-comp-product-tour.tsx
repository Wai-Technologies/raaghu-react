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

const RdsCompProductTour: FC<RdsCompProductTourProps> = ({
    state = "Image",
    topLeft = false,
    topRight = false,
    bottomLeft = false,
    bottomRight = false,
    header,
    title,
    badge,
    imageSrc = '/assets/animation.gif',
    children,
    onNext,
    onBack,
    onSkip,
    description,
    stepsIndicator,
    controls,
    slides,
    formTitle,
    tabTitle,
    onClose,
    ...legacyProps
}) => {
    if (header !== undefined) warnDeprecatedProp('RdsCompProductTour', 'header', '`title`');
    const resolvedHeader = title ?? header;
    const headerId = useId();
    const rootProps = {
        role: 'dialog' as const,
        'aria-labelledby': resolvedHeader ? headerId : undefined
    };
    const legacyShowDismiss = typeof legacyProps.showDismiss === 'boolean' ? legacyProps.showDismiss : undefined;
    const legacyShowPrimaryButton = typeof legacyProps.showPrimaryButton === 'boolean' ? legacyProps.showPrimaryButton : undefined;
    const legacyShowSecondaryButton = typeof legacyProps.showSecondaryButton === 'boolean' ? legacyProps.showSecondaryButton : undefined;
    const legacyShowTertiaryButton = typeof legacyProps.showTertiaryButton === 'boolean' ? legacyProps.showTertiaryButton : undefined;
    const legacyShowVisualPlaceholder = typeof legacyProps.showVisualPlaceholder === 'boolean' ? legacyProps.showVisualPlaceholder : undefined;

    const showDismiss = controls?.dismiss ? controls.dismiss === 'visible' : (legacyShowDismiss ?? true);
    const showPrimaryButton = controls?.primary ? controls.primary === 'visible' : (legacyShowPrimaryButton ?? true);
    const showSecondaryButton = controls?.secondary ? controls.secondary === 'visible' : (legacyShowSecondaryButton ?? true);
    const showTertiaryButton = controls?.tertiary ? controls.tertiary === 'visible' : (legacyShowTertiaryButton ?? true);
    const showVisualPlaceholder = controls?.visual ? controls.visual === 'visible' : (legacyShowVisualPlaceholder ?? true);

    const [isVisible, setIsVisible] = useState(true);
    const resolvedSlides = slides ?? EMPTY_TOUR_SLIDES;
    const resolvedTabTitle = tabTitle ?? EMPTY_TAB_TITLES;

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
    const carouselState = String(currentIndex + 1);
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

    const cornerDotsElement = renderCornerDots(topLeft, topRight, bottomLeft, bottomRight);
    const closeButtonElement = renderCloseButton(showDismiss, handleClose);
    const infoSectionElement = renderInfoSection(resolvedHeader, description, headerId);
    const navRowElement = renderNavRow(currentIndicator, showTertiaryButton, showSecondaryButton, showPrimaryButton, handleBack, handleNext, "rds-comp-product-tour__stepcount", "rds-comp-product-tour__skip", "rds-comp-product-tour__arrows", onSkip);
    const carouselNavigationElement = renderCarouselNavigation(currentIndicator, showTertiaryButton, showSecondaryButton, showPrimaryButton, handleBack, handleNext, onSkip);
    const gifNavigationElement = renderGifNavigation(currentIndicator, showTertiaryButton, showSecondaryButton, showPrimaryButton, handleBack, handleNext, onSkip);
    const formInputsElement = children ?? renderFormInputs();
    const formNavigationElement = renderFormNavigation(currentIndicator, showTertiaryButton, showSecondaryButton, showPrimaryButton, handleBack, handleNext, onSkip);

    if (!isVisible) {
        return null;
    }
    if (state === "Image") {
        return (
            <Paper {...rootProps} className="rds-comp-product-tour__container rds-comp-product-tour__container--image">
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
            <Paper {...rootProps} className="rds-comp-product-tour__container rds-comp-product-tour__container--carousel">
                {cornerDotsElement}
                {closeButtonElement}
                <Box className="rds-comp-product-tour__carousel-header">
                    <Typography variant="h6" id={headerId} className="rds-comp-product-tour__carousel-title">{resolvedHeader}</Typography>
                    <Typography variant="body2" className="rds-comp-product-tour__carousel-desc">{description}</Typography>
                </Box>
                <Box className="rds-comp-product-tour__carousel-wrapper">
                    <RdsCarousel showIndicators={false} showArrows={false} type="circle" style="default" height="var(--rds-carousel-height, 300px)" state={carouselState as unknown as '1' | '2' | '3' | '4' | undefined}>
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
            <Paper {...rootProps} className="rds-comp-product-tour__container rds-comp-product-tour__container--animation">
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
                    <Typography variant="h5" id={headerId} className="rds-comp-product-tour__animation-title">{resolvedHeader}</Typography>
                    <Typography variant="body1" className="rds-comp-product-tour__animation-desc">{description}</Typography>
                </Box>
                {gifNavigationElement}
            </Paper>
        );
    }
    if (state === "Form") {
        return (
            <Paper {...rootProps} className="rds-comp-product-tour__container rds-comp-product-tour__container--form">
                {cornerDotsElement}
                {closeButtonElement}
                <Box className="rds-comp-product-tour__form-header">
                    <Typography variant="h6" className="rds-comp-product-tour__form-subtitle">
                       {formTitle}
                    </Typography>
                </Box>
                <Box className="rds-comp-product-tour__form-content">
                    <Box className="rds-comp-product-tour__form-title-badge-row">
                        <Typography variant="h6" id={headerId} className="rds-comp-product-tour__form-title">{resolvedHeader}</Typography>
                        {badge !== null && <RdsBadge badgeContent={badge === undefined ? "Badge" : badge} size="medium" colorVariant="primary" shape="pill" layout="text" />}
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
                            <RdsFileUploader accept=".pdf,.doc,.docx" dragAndDrop helperText="Maximum 5MB" required maxFiles={1} maxSize={2097152} mode="standard" onFilesChange={() => { }} showHint showPreview showTitle> {deleteIcon} </RdsFileUploader>
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
