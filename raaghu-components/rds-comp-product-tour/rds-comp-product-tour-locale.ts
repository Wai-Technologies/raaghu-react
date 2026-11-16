/** Overridable UI strings of `RdsCompProductTour`. */
export interface RdsCompProductTourLocaleText {
    close: string;
    previous: string;
    next: string;
    skip: string;
    create: string;
    add: string;
    projectNamePlaceholder: string;
    teamMembersPlaceholder: string;
    projectDescriptionPlaceholder: string;
    tourStepAlt: string;
    tourAnimationAlt: string;
    slideAlt: (index: number) => string;
}

export const DEFAULT_RDS_COMP_PRODUCT_TOUR_LOCALE_TEXT: RdsCompProductTourLocaleText = {
    close: 'Close',
    previous: 'Previous',
    next: 'Next',
    skip: 'Skip',
    create: 'Create',
    add: 'Add',
    projectNamePlaceholder: 'Enter Project Name',
    teamMembersPlaceholder: 'Add Team Members',
    projectDescriptionPlaceholder: 'Enter Project Description',
    tourStepAlt: 'Tour Step',
    tourAnimationAlt: 'Tour Animation GIF',
    slideAlt: (index) => `Slide ${index}`,
};
