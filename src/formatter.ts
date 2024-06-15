import {ArrayNode, AsonNodeType, BooleanNode, NumberNode, ObjectNode, StringNode} from "./models";


export default function formatObjectNode(node:ObjectNode, isArray = false):string {

    let result = isArray ? '[' : '{'

    node.items.forEach( (childNode, index) => {

        let childValue:string|undefined = undefined

        switch (childNode.type) {
            case AsonNodeType.null:
                childValue = `null`
                break;
            case AsonNodeType.object:
                childValue = formatObjectNode(childNode as ObjectNode)
                break;
            case AsonNodeType.array:
                childValue = formatObjectNode(childNode as ArrayNode, true)
                break;
            case AsonNodeType.string:
                childValue = `'${(childNode as StringNode).value}'`
                break;
            case AsonNodeType.number:
                childValue = `${(childNode as NumberNode).value}`
                break;
            case AsonNodeType.boolean:
                childValue = `${(childNode as BooleanNode).value ? 'true' : 'false'}`
                break;

        }
        if( childValue !== undefined) {
            if(result.length > 1) {
                result += ','
            }
            result += childValue
        }
    })
    result += isArray ? ']' : '}'
    return result
}

