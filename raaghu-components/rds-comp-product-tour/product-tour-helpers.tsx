import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Close, InfoOutlined, ExpandMore } from '@mui/icons-material';
import { RdsInput, RdsAutocomplete, RdsButton } from '../../raaghu-elements';

export interface RdsCompProductTourProps {
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
    slides?: { id: number; imgUrl: string; }[];
    formTitle?: string;
    tabTitle?: any[];
    onClose?: () => void;
}

export const parseSteps = (s?: string) => {
    if (!s) return undefined;
    const m = s.match(/^\s*(\d+)\s*\/\s*(\d+)\s*$/);
    if (!m) return undefined;
    return { numerator: parseInt(m[1], 10), total: parseInt(m[2], 10) };
};

export const createEffectiveSlides = (slides: { id: number; imgUrl: string; }[] | undefined, totalSlides: number) => {
    const s = slides || [];
    if (totalSlides <= 0) return [];
    if (s.length === 0) {
        return Array.from({ length: totalSlides }, (_, i) => ({ id: i + 1, imgUrl: '' }));
    }
    if (s.length >= totalSlides) return s.slice(0, totalSlides);
    const res: { id: number; imgUrl: string }[] = [];
    let i = 0;
    while (res.length < totalSlides) {
        const src = s[i % s.length];
        res.push({ id: res.length + 1, imgUrl: src.imgUrl });
        i += 1;
    }
    return res;
};

export const arrowSvg = (isNext: boolean) => (
    <svg width="16" height="16" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={isNext ? "M.5,20.5L11.236,11.038c.337-.279,.354-.746,.038-1.044-.012-.011-.025-.022-.038-.033L.5,.5" : "M11.5,.5L.764,9.962c-.337,.279-.354,.746-.038,1.044,.012,.011,.025,.022,.038,.033l10.736,9.462"}
                stroke={isNext ? "currentColor" : "var(--rds-primary-main)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const deleteIcon = (
    <svg fill="none" height="20" viewBox="0 0 14 14" width="20" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 3.80979H13M4.46201 3.75519V3.2968C4.46201 2.68765 4.73087 2.10346 5.20946 1.67273C5.68806 1.242 6.33718 1 7.01401 1C7.69084 1 8.33995 1.242 8.81854 1.67273C9.29714 2.10346 9.566 2.68765 9.566 3.2968V3.75581M5.51067 5.572V10.624M8.51733 5.572V10.624M2.53067 3.814H11.498V12.0814C11.4997 12.2006 11.4752 12.3189 11.4261 12.4296C11.3769 12.5403 11.304 12.6411 11.2115 12.7264C11.119 12.8118 11.0087 12.8798 10.887 12.9268C10.7653 12.9737 10.6344 12.9986 10.502 13H3.53C3.26259 12.997 3.00746 12.8986 2.82069 12.7263C2.63392 12.554 2.5308 12.3221 2.53401 12.0814V3.814H2.53067Z" stroke="var(--rds-error-main)" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const renderCornerDots = (topLeft: boolean, topRight: boolean, bottomLeft: boolean, bottomRight: boolean) => (
    <>
        {topLeft && <Box className="rds-comp-product-tour__corner-dot rds-comp-product-tour__corner-dot--top-left" />}
        {topRight && <Box className="rds-comp-product-tour__corner-dot rds-comp-product-tour__corner-dot--top-right" />}
        {bottomLeft && <Box className="rds-comp-product-tour__corner-dot rds-comp-product-tour__corner-dot--bottom-left" />}
        {bottomRight && <Box className="rds-comp-product-tour__corner-dot rds-comp-product-tour__corner-dot--bottom-right" />}
    </>
);

export const renderCloseButton = (showDismiss: boolean, handleClose: () => void) => showDismiss && (
    <IconButton
        className="rds-comp-product-tour__close-btn"
        aria-label="Close"
        onClick={handleClose}
        sx={{
            position: 'absolute',
            top: 'calc(var(--rds-spacing-sm) + var(--rds-spacing-xs))',
            right: 'calc(var(--rds-spacing-sm) + var(--rds-spacing-xs) + var(--rds-border-radius-xs))',
            zIndex: 'var(--rds-z-index-popover)',
            color: 'var(--rds-text-secondary)'
        }}
    >
        <Close />
    </IconButton>
);

export const renderNavigationButtons = (showSecondaryButton: boolean, showPrimaryButton: boolean, goPrev: () => void, goNext: () => void, variant = 'default') => (
    <Box className={`rds-comp-product-tour__arrows rds-comp-product-tour__arrows--${variant}`}>
        {showSecondaryButton && <button onClick={goPrev} aria-label="Previous" className="rds-comp-product-tour__arrow rds-comp-product-tour__arrow--prev">{arrowSvg(false)}</button>}
        {showPrimaryButton && <button onClick={goNext} aria-label="Next" className="rds-comp-product-tour__arrow rds-comp-product-tour__arrow--next">{arrowSvg(true)}</button>}
    </Box>
);

const renderDirectionalButtons = (
    showSecondaryButton: boolean,
    showPrimaryButton: boolean,
    goPrev: () => void,
    goNext: () => void,
    prevClassName: string,
    nextClassName: string
) => (
    <>
        {showSecondaryButton && <button onClick={goPrev} className={prevClassName}>{arrowSvg(false)}</button>}
        {showPrimaryButton && <button onClick={goNext} className={nextClassName}>{arrowSvg(true)}</button>}
    </>
);

export const renderSkipButton = (showTertiaryButton: boolean, className: string) => showTertiaryButton && (
    <Typography className={className}>Skip</Typography>
);

export const renderNavRow = (currentIndicator: string, showTertiaryButton: boolean, showSecondaryButton: boolean, showPrimaryButton: boolean, goPrev: () => void, goNext: () => void, stepClass: string, skipClass: string, arrowClass: string) => (
    <Box className="rds-comp-product-tour__navigation-row">
        <Typography className={stepClass}>{currentIndicator}</Typography>
        {renderSkipButton(showTertiaryButton, skipClass)}
        <Box className={arrowClass}>{renderNavigationButtons(showSecondaryButton, showPrimaryButton, goPrev, goNext)}</Box>
    </Box>
);

export const renderInfoSection = (header?: string, description?: string) => (
    <Box className="rds-comp-product-tour__info">
        <Typography variant="h6" className="rds-comp-product-tour__title">{header}</Typography>
        <Typography variant="body2" className="rds-comp-product-tour__desc">{description}</Typography>
    </Box>
);

export const renderFormInputs = () => (
    <>
        <Box className="rds-comp-product-tour__form-input-row">
             <Box className="rds-comp-product-tour__form-input-row--group">
            <Box className="rds-comp-product-tour__form-input-container">
                <RdsInput
                    placeholder="Enter Project Name"
                    size="small"
                    layout="text"
                    showIcon={true}
                    variant="outlined"
                    icon={<InfoOutlined sx={{ color: 'var(--rds-text-secondary)', fontSize: 'var(--rds-font-size-3xl)' }} />}
                />
            </Box>
            <Box className="rds-comp-product-tour__form-action-btn">
                <RdsButton text="Create" style="outlined" size="medium" layout="text-only" />
            </Box>
        </Box>
        </Box>
        <Box className="rds-comp-product-tour__form-input-row">
            <Box className="rds-comp-product-tour__form-input-row--group">
            <Box className="rds-comp-product-tour__form-input-container">
                <RdsAutocomplete
                    controlStyle="default"
                    helperText=""
                    isMandatory={false}
                    isShowCheckbox={true}
                    isShowRadio={false}
                    isShowUser={true}
                    label={undefined}
                    options={[
                        { label: 'Option 1', value: 1 },
                        { label: 'Option 2', value: 2 },
                        { label: 'Option 3', value: 3 },
                        { label: 'Option 4', value: 4 },
                        { label: 'Option 5', value: 5 }
                    ]}
                    placeholder="Add Team Members"
                    popupIcon={<ExpandMore sx={{ color: 'var(--rds-text-secondary)', fontSize: 'var(--rds-font-size-3xl)' }} />}
                    selectSize="medium"
                    allowMultiple={true}
                    showHintText={false}
                    userIcon={true}
                    openOnFocus={true}
                    fullWidth
                />
                </Box>
                <Box className="rds-comp-product-tour__form-action-btn">
                    <RdsButton text="Add" style="outlined" size="medium" layout="text-only" />
                </Box>
            </Box>
        </Box>
        <Box className="rds-comp-product-tour__form-textarea-container">
            <RdsInput placeholder="Enter Project Description" multiline rows={1} variant="outlined" size="medium" />
        </Box>
        <Box className="rds-comp-product-tour__form-button-right">
            <Box className="rds-comp-product-tour__form-action-btn">
                <RdsButton text="Add" style="outlined" size="medium" layout="text-only" />
            </Box>
        </Box>
    </>
);

export const renderCarouselArrows = (showSecondaryButton: boolean, showPrimaryButton: boolean, goPrev: () => void, goNext: () => void) => (
    <Box className="rds-comp-product-tour__carousel-arrows">
        {renderDirectionalButtons(showSecondaryButton, showPrimaryButton, goPrev, goNext, "rds-comp-product-tour__carousel-arrow-prev", "rds-comp-product-tour__carousel-arrow-next")}
    </Box>
);

export const renderCarouselNavigation = (currentIndicator: string, showTertiaryButton: boolean, showSecondaryButton: boolean, showPrimaryButton: boolean, goPrev: () => void, goNext: () => void) => (
    <Box className="rds-comp-product-tour__carousel-nav-row">
        <Typography className="rds-comp-product-tour__carousel-stepcount">{currentIndicator}</Typography>
        <Box className="rds-comp-product-tour__carousel-nav-group">
            {showTertiaryButton && <button className="rds-comp-product-tour__carousel-skip">Skip</button>}
            {renderCarouselArrows(showSecondaryButton, showPrimaryButton, goPrev, goNext)}
        </Box>
    </Box>
);

export const renderGifArrows = (showSecondaryButton: boolean, showPrimaryButton: boolean, goPrev: () => void, goNext: () => void) => (
    <Box className="rds-comp-product-tour__animation-nav-buttons">
        {renderDirectionalButtons(showSecondaryButton, showPrimaryButton, goPrev, goNext, "rds-comp-product-tour__animation-nav-prev", "rds-comp-product-tour__animation-nav-next")}
    </Box>
);

export const renderGifNavigation = (currentIndicator: string, showTertiaryButton: boolean, showSecondaryButton: boolean, showPrimaryButton: boolean, goPrev: () => void, goNext: () => void) => (
    <Box className="rds-comp-product-tour__animation-navigation">
        <Typography className="rds-comp-product-tour__animation-stepcount">{currentIndicator}</Typography>
        <Box className="rds-comp-product-tour__animation-controls">
            {showTertiaryButton && <Typography className="rds-comp-product-tour__animation-skip">Skip</Typography>}
            {renderGifArrows(showSecondaryButton, showPrimaryButton, goPrev, goNext)}
        </Box>
    </Box>
);

export const renderFormArrows = (showSecondaryButton: boolean, showPrimaryButton: boolean, goPrev: () => void, goNext: () => void) => (
    <Box className="rds-comp-product-tour__form-arrows">
        {renderDirectionalButtons(showSecondaryButton, showPrimaryButton, goPrev, goNext, "rds-comp-product-tour__form-arrow-prev", "rds-comp-product-tour__form-arrow-next")}
    </Box>
);

export const renderFormNavigation = (currentIndicator: string, showTertiaryButton: boolean, showSecondaryButton: boolean, showPrimaryButton: boolean, goPrev: () => void, goNext: () => void) => (
    <Box className="rds-comp-product-tour__form-navigation">
        <Typography className="rds-comp-product-tour__form-stepcount">{currentIndicator}</Typography>
        <Box className="rds-comp-product-tour__form-navigation-actions">
            {showTertiaryButton && <Typography className="rds-comp-product-tour__form-skip">Skip</Typography>}
            {renderFormArrows(showSecondaryButton, showPrimaryButton, goPrev, goNext)}
        </Box>
    </Box>
);
