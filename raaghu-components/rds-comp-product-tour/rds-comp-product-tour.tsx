import React, { useState, useEffect } from 'react';
import {
    RdsCompProductTourProps,
    parseSteps,
    createEffectiveSlides,
    ImageTourView,
    CarouselTourView,
    GifTourView,
    FormTourView,
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
    const totalSlides = parsedSteps?.total ?? slides?.length ?? 0;
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
        onClose?.();
    };

    if (!isVisible) {
        return null;
    }

    const sharedViewProps = {
        topLeft,
        topRight,
        bottomLeft,
        bottomRight,
        header,
        description,
        showDismiss,
        showPrimaryButton,
        showSecondaryButton,
        showTertiaryButton,
        showVisualPlaceholder,
        currentIndicator: displayIndicator,
        handleClose,
        goPrev,
        goNext,
    };

    if (state === "Image") {
        return (
            <ImageTourView
                {...sharedViewProps}
                effectiveSlides={effectiveSlides}
                currentIndex={currentIndex}
            />
        );
    }
    if (state === "Carousel") {
        return (
            <CarouselTourView
                {...sharedViewProps}
                effectiveSlides={effectiveSlides}
                currentIndex={currentIndex}
                carouselState={String(currentIndex + 1)}
            />
        );
    }
    if (state === "GIF") {
        return <GifTourView {...sharedViewProps} />;
    }
    if (state === "Form") {
        return (
            <FormTourView
                {...sharedViewProps}
                formTitle={formTitle}
                tabTitle={tabTitle}
            />
        );
    }
    return null;
};
RdsCompProductTour.displayName = "RdsCompProductTour";
export default RdsCompProductTour;
