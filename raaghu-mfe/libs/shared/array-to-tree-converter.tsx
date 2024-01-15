import { filter as _filter, forEach as _forEach } from "lodash-es";
export  const  createTree=(
    array: any[],
    parentIdProperty:any,
    idProperty:any,
    parentIdValue:any,
    childrenProperty: string,
    fieldMappings:any,
    level:any,
): any =>{
    const tree:any = [];
    const nodes = _filter(array, [parentIdProperty, parentIdValue]);
    _forEach(nodes, (node:any) => {
        const newNode:any = {
            data: node,
            level: level,
            selected: false
        };
        mapFields(node, newNode, fieldMappings);
        newNode[childrenProperty] = createTree(
            array,
            parentIdProperty,
            idProperty,
            node[idProperty],
            childrenProperty,
            fieldMappings,
            level + 1
        );
        tree.push(newNode);
    });
    return tree;
};
const mapFields=(node:any, newNode:any, fieldMappings:any): void =>{
    _forEach(fieldMappings, (fieldMapping:any) => {
        if (!fieldMapping["target"]) {
            return;
        }
        if (fieldMapping.hasOwnProperty("value")) {
            newNode[fieldMapping["target"]] = fieldMapping["value"];
        } else if (fieldMapping["source"]) {
            newNode[fieldMapping["target"]] = node[fieldMapping["source"]];
        } else if (fieldMapping["targetFunction"]) {
            newNode[fieldMapping["target"]] = fieldMapping["targetFunction"](node);
        }
    });
};
