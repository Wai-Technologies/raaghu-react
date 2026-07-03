import { Box, Typography, IconButton } from '@mui/material';
import { Close, InfoOutlined, ExpandMore } from '@mui/icons-material';
import RdsInput from '../../raaghu-elements/rds-input/rds-input';
import RdsAutocomplete from '../../raaghu-elements/rds-autocomplete/rds-autocomplete';
import RdsButton from '../../raaghu-elements/rds-button/rds-button';
import clsx from 'clsx';

export interface RdsCompProductTourProps {
    state: "Image" | "Carousel" | "GIF" | "Form";
    topLeft?: boolean;
    topRight?: boolean;
    bottomLeft?: boolean;
    bottomRight?: boolean;
    header?: string;
    description?: string;
    stepsIndicator?: string;
    controls?: {
        dismiss?: 'visible' | 'hidden';
        primary?: 'visible' | 'hidden';
        secondary?: 'visible' | 'hidden';
        tertiary?: 'visible' | 'hidden';
        visual?: 'visible' | 'hidden';
    };
    slides?: { id: number; imgUrl: string; }[];
    formTitle?: string;
    tabTitle?: string[];
    onClose?: () => void;
    [key: string]: unknown;
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
        <path d="M1 3.81H13M4.46 3.76V3.3C4.46 2.69 4.73 2.1 5.21 1.67C5.69 1.24 6.34 1 7.01 1C7.69 1 8.34 1.24 8.82 1.67C9.3 2.1 9.57 2.69 9.57 3.3V3.76M5.51 5.57V10.62M8.52 5.57V10.62M2.53 3.81H11.5V12.08C11.5 12.2 11.48 12.32 11.43 12.43C11.38 12.54 11.3 12.64 11.21 12.73C11.12 12.81 11.01 12.88 10.89 12.93C10.77 12.97 10.63 13 10.5 13H3.53C3.26 13 3.01 12.9 2.82 12.73C2.63 12.55 2.53 12.32 2.53 12.08V3.81H2.53Z" stroke="var(--rds-error-main)" strokeLinecap="round" strokeLinejoin="round" />
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

const renderNavigationButtons = (showSecondaryButton: boolean, showPrimaryButton: boolean, goPrev: () => void, goNext: () => void, variant = 'default') => (
    <Box className={clsx("rds-comp-product-tour__arrows", `rds-comp-product-tour__arrows--${variant}`)}>
        {showSecondaryButton && <button type="button" onClick={goPrev} aria-label="Previous" className="rds-comp-product-tour__arrow rds-comp-product-tour__arrow--prev">{arrowSvg(false)}</button>}
        {showPrimaryButton && <button type="button" onClick={goNext} aria-label="Next" className="rds-comp-product-tour__arrow rds-comp-product-tour__arrow--next">{arrowSvg(true)}</button>}
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
        {showSecondaryButton && <button type="button" onClick={goPrev} className={prevClassName}>{arrowSvg(false)}</button>}
        {showPrimaryButton && <button type="button" onClick={goNext} className={nextClassName}>{arrowSvg(true)}</button>}
    </>
);

const renderSkipButton = (showTertiaryButton: boolean, className: string) => showTertiaryButton && (
    <Typography className={className}>Skip</Typography>
);

export const renderNavRow = (currentIndicator: string, showTertiaryButton: boolean, showSecondaryButton: boolean, showPrimaryButton: boolean, goPrev: () => void, goNext: () => void, stepClass: string, skipClass: string, arrowClass: string) => (
    <Box className="rds-comp-product-tour__navigation-row">
        <Typography className={stepClass}>{currentIndicator}</Typography>
        {showTertiaryButton && <Typography className={skipClass}>Skip</Typography>}
        <Box className={arrowClass}>
            <Box className={clsx("rds-comp-product-tour__arrows", "rds-comp-product-tour__arrows--default")}>
                {showSecondaryButton && <button type="button" onClick={goPrev} aria-label="Previous" className="rds-comp-product-tour__arrow rds-comp-product-tour__arrow--prev">{arrowSvg(false)}</button>}
                {showPrimaryButton && <button type="button" onClick={goNext} aria-label="Next" className="rds-comp-product-tour__arrow rds-comp-product-tour__arrow--next">{arrowSvg(true)}</button>}
            </Box>
        </Box>
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
        <Box className="rds-comp-product-tour__form-input-row rds-comp-product-tour__form-input-row--team-members">
            <Box className="rds-comp-product-tour__form-input-row--group">
            <Box className="rds-comp-product-tour__form-input-container">
                <RdsAutocomplete
                    controlStyle="default"
                    helperText=""
                    hideClearAllOnMobile={true}
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
                    popupIcon={<ExpandMore sx={{ color: 'var(--rds-text-secondary)', fontSize: 'var(--rds-font-size-xl)' }} />}
                    selectSize="medium"
                    allowMultiple={true}
                    showHintText={false}
                    userIcon={true}
                    openOnFocus={true}
                    fullWidth
                    slotProps={{
                        popper: {
                            placement: 'bottom-start',
                            sx: { zIndex: 'var(--rds-z-index-popover, 1300)' },
                        },
                        paper: {
                            sx: {
                                maxWidth: '100%',
                                '& .MuiAutocomplete-option': { minWidth: 'unset' },
                            },
                        },
                    }}
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

const renderCarouselArrows = (showSecondaryButton: boolean, showPrimaryButton: boolean, goPrev: () => void, goNext: () => void) => (
    <Box className="rds-comp-product-tour__carousel-arrows">
        {showSecondaryButton && <button type="button" onClick={goPrev} className="rds-comp-product-tour__carousel-arrow-prev">{arrowSvg(false)}</button>}
        {showPrimaryButton && <button type="button" onClick={goNext} className="rds-comp-product-tour__carousel-arrow-next">{arrowSvg(true)}</button>}
    </Box>
);

export const renderCarouselNavigation = (currentIndicator: string, showTertiaryButton: boolean, showSecondaryButton: boolean, showPrimaryButton: boolean, goPrev: () => void, goNext: () => void) => (
    <Box className="rds-comp-product-tour__carousel-nav-row">
        <Typography className="rds-comp-product-tour__carousel-stepcount">{currentIndicator}</Typography>
        <Box className="rds-comp-product-tour__carousel-nav-group">
            {showTertiaryButton && <button type="button" className="rds-comp-product-tour__carousel-skip">Skip</button>}
            <Box className="rds-comp-product-tour__carousel-arrows">
                {showSecondaryButton && <button type="button" onClick={goPrev} className="rds-comp-product-tour__carousel-arrow-prev">{arrowSvg(false)}</button>}
                {showPrimaryButton && <button type="button" onClick={goNext} className="rds-comp-product-tour__carousel-arrow-next">{arrowSvg(true)}</button>}
            </Box>
        </Box>
    </Box>
);

const renderGifArrows = (showSecondaryButton: boolean, showPrimaryButton: boolean, goPrev: () => void, goNext: () => void) => (
    <Box className="rds-comp-product-tour__animation-nav-buttons">
        {showSecondaryButton && <button type="button" onClick={goPrev} className="rds-comp-product-tour__animation-nav-prev">{arrowSvg(false)}</button>}
        {showPrimaryButton && <button type="button" onClick={goNext} className="rds-comp-product-tour__animation-nav-next">{arrowSvg(true)}</button>}
    </Box>
);

export const renderGifNavigation = (currentIndicator: string, showTertiaryButton: boolean, showSecondaryButton: boolean, showPrimaryButton: boolean, goPrev: () => void, goNext: () => void) => (
    <Box className="rds-comp-product-tour__animation-navigation">
        <Typography className="rds-comp-product-tour__animation-stepcount">{currentIndicator}</Typography>
        <Box className="rds-comp-product-tour__animation-controls">
            {showTertiaryButton && <Typography className="rds-comp-product-tour__animation-skip">Skip</Typography>}
            <Box className="rds-comp-product-tour__animation-nav-buttons">
                {showSecondaryButton && <button type="button" onClick={goPrev} className="rds-comp-product-tour__animation-nav-prev">{arrowSvg(false)}</button>}
                {showPrimaryButton && <button type="button" onClick={goNext} className="rds-comp-product-tour__animation-nav-next">{arrowSvg(true)}</button>}
            </Box>
        </Box>
    </Box>
);

const renderFormArrows = (showSecondaryButton: boolean, showPrimaryButton: boolean, goPrev: () => void, goNext: () => void) => (
    <Box className="rds-comp-product-tour__form-arrows">
        {showSecondaryButton && <button type="button" onClick={goPrev} className="rds-comp-product-tour__form-arrow-prev">{arrowSvg(false)}</button>}
        {showPrimaryButton && <button type="button" onClick={goNext} className="rds-comp-product-tour__form-arrow-next">{arrowSvg(true)}</button>}
    </Box>
);

export const renderFormNavigation = (currentIndicator: string, showTertiaryButton: boolean, showSecondaryButton: boolean, showPrimaryButton: boolean, goPrev: () => void, goNext: () => void) => (
    <Box className="rds-comp-product-tour__form-navigation">
        <Typography className="rds-comp-product-tour__form-stepcount">{currentIndicator}</Typography>
        <Box className="rds-comp-product-tour__form-navigation-actions">
            {showTertiaryButton && <Typography className="rds-comp-product-tour__form-skip">Skip</Typography>}
            <Box className="rds-comp-product-tour__form-arrows">
                {showSecondaryButton && <button type="button" onClick={goPrev} className="rds-comp-product-tour__form-arrow-prev">{arrowSvg(false)}</button>}
                {showPrimaryButton && <button type="button" onClick={goNext} className="rds-comp-product-tour__form-arrow-next">{arrowSvg(true)}</button>}
            </Box>
        </Box>
    </Box>
);
