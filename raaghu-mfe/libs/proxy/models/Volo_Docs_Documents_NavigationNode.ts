/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Volo_Docs_Documents_NavigationNode = {
    text?: string | null;
    path?: string | null;
    items?: Array<Volo_Docs_Documents_NavigationNode> | null;
    readonly isLeaf?: boolean;
    readonly hasChildItems?: boolean;
    readonly isEmpty?: boolean;
    creationTime?: string | null;
    lastUpdatedTime?: string | null;
    lastSignificantUpdateTime?: string | null;
};

