// import { Item } from "./CheckboxList";
// import { CheckboxState, ItemState } from "../rds-comp-permission-tree";

// export const updateItemStates = (oldState: ItemState[], items: Item[], clickedId: number) => {
//     const newState = oldState.map((i) => ({ ...i }));
//     // getters
//     const getItemState = (id: number) => {
//         const item = newState.find((i) => i.id === id);
//         return item ? item.state : undefined;
//     };
//     // setters
//     const updateParent = (id: number) => {
//         const item = items.find((i) => i.id === id);
//         const parent = items.find((i) => i.id === item!.parentId);
//         if (!parent) return;
//         const childIds = items.filter((i) => i.parentId === parent.id).map((i) => i.id);
//         const childStates = childIds.map((childId) => getItemState(childId));
//         if (childStates.length === childStates.filter((s) => s === CheckboxState.CHECKED).length) {
//             const item = newState.find((i) => i.id === parent.id);
//             item ? item.state = CheckboxState.CHECKED : undefined;
//             // newState.find((i) => i.id === parent.id).state = CheckboxState.CHECKED;
//         } else if (childStates.length === childStates.filter((s) => s === CheckboxState.UNCHECKED).length) {
//             const item = newState.find((i) => i.id === parent.id);
//             item ? item.state = CheckboxState.UNCHECKED : undefined;
//             // newState.find((i) => i.id === parent.id).state = CheckboxState.UNCHECKED;
//         } else {
//             const item = newState.find((i) => i.id === parent.id);
//             item ? item.state = CheckboxState.INDETERMINATE : undefined;
//             // newState.find((i) => i.id === parent.id).state = CheckboxState.INDETERMINATE;
//         }
//         updateParent(parent.id);
//     };
//     const setUnchecked = (id: number) => {
//         const item = newState.find((i) => i.id === id);
//         item ? item.state = CheckboxState.UNCHECKED : undefined;
//         // newState.find((i) => i.id === id).state = CheckboxState.UNCHECKED;
//         items
//             .filter((i) => i.parentId === id)
//             .map((i) => i.id)
//             .forEach((childId) => setUnchecked(childId));
//         updateParent(id);
//     };
//     const setChecked = (id: number) => {
//         const item = newState.find((i) => i.id === id);
//         item ? item.state = CheckboxState.CHECKED : undefined;
//         // newState.find((i) => i.id === id).state = CheckboxState.CHECKED;
//         items
//             .filter((i) => i.parentId === id)
//             .map((i) => i.id)
//             .forEach((childId) => setChecked(childId));
//         updateParent(id);
//     };
//     // actual logic
//     const itemState = getItemState(clickedId);
//     if (itemState === CheckboxState.CHECKED) {
//         setUnchecked(clickedId);
//     } else {
//         setChecked(clickedId);
//     }
//     return newState;
// };
