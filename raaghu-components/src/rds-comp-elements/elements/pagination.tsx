import React from "react";
import { RdsPagination } from "../../rds-elements";

export const code_actual = () => {
    return (
        <RdsPagination
            paginationType="default"
            totalRecords={22}
            recordsPerPage={5}
            size="lg"
            alignmentType="start"
        />
    );
};

export default code_actual;
