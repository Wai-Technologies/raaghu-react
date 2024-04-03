export interface TextTemplateItem {
    defaultCultureName: string;
    displayName: string;
    isInlineLocalized: boolean;
    isLayout: boolean;
    layout: string;
    name: string;
}

export interface TextTemplate {
    items: TextTemplateItem[]
}
