
import { RdsCompDatatable } from "../../raaghu-components/src";
import { ActionPosition } from "../../raaghu-components/src/rds-comp-data-table/rds-comp-data-table";
import "./MemberActivity.css";

const MemberActivity = () => {
  return (
    <RdsCompDatatable
      actionPosition={ActionPosition.Left}
      actions={[
        {
          displayName: "Delete",
          id: "delete",
        },
        {
          displayName: "Edit",
          id: "edit",
        },
      ]}
      enableRadioButtonselection
      enablecheckboxselection
      isClickable
      pagination
      recordsPerPage={10}
      tableData={[
        {
          id: 1,
          member: "Jaylon Aminoff",
          text: "Soft Developer",
          cases: 76,
          active: 52,
          closed: "10",
          rate: "37",
          avatar: {
            name: "Jaylon Aminoff",
            src: "avatar1.jpg",
          },
        },
        {
          id: 2,
          member: "Martin Aminoff",
          text: "Senior Developer",
          cases: 77,
          active: 79,
          closed: "23",
          rate: "64",
          avatar: {
            name: "Martin Aminoff",
            src: "avatar2.jpg",
          },
        },
        {
          id: 3,
          member: "Justin Herwitz",
          text: "Sales Executive",
          cases: 36,
          active: 32,
          closed: "20",
          rate: "99",
          avatar: {
            name: "Justin Herwitz",
            src: "avatar3.jpg",
          },
        },
        {
          id: 4,
          member: "Gustavo Lubin",
          text: "Senior Developer",
          cases: 22,
          active: 90,
          closed: "34",
          rate: "77",
          avatar: {
            name: "Gustavo Lubin",
            src: "avatar1.jpg",
          },
        },
        {
          id: 5,
          member: "Ruben Donin",
          text: "Soft Developer",
          cases: 26,
          active: 76,
          closed: "16",
          rate: "73",
          avatar: {
            name: "Ruben Donin",
            src: "avatar2.jpg",
          },
        },
        {
          id: 6,
          member: "Jaydon Stanton",
          text: "Soft Developer",
          cases: 36,
          active: 38,
          closed: "16",
          rate: "21",
          avatar: {
            name: "Jaydon Stanton",
            src: "avatar3.jpg",
          },
        },
        {
          id: 7,
          member: "Leo Aminoff",
          text: "Soft Developer",
          cases: 63,
          active: 36,
          closed: "94",
          rate: "26",
          avatar: {
            name: "Leo Aminoff",
            src: "avatar1.jpg",
          },
        }
      ]}
      tableHeaders={[
        {
          dataLength: 50,
          datatype: "text",
          displayName: "Members",
          key: "member",
          required: true,
          sortable: true
        },
        {
          dataLength: 50,
          datatype: "text",
          displayName: "Cases",
          key: "cases",
          required: false
        },
        {
          dataLength: 30,
          datatype: "text",
          displayName: "Active",
          key: "active",
          required: true,
          sortable: true
        },
        {
          dataLength: 50,
          datatype: "text",
          displayName: "Closed",
          key: "closed",
          required: false
        },
        {
          dataLength: 30,
          datatype: "text",
          displayName: "Rate",
          key: "rate",
          required: true,
          sortable: true
        }
      ]}
    />
  );
};

export default MemberActivity;