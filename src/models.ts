export function newObjectNode(): ObjectNode {
    return {type: AsonNodeType.object, items: []}
}

export function newArrayNode(): ArrayNode {
    return {type: AsonNodeType.array, items: []}
}

export function newStringNode(value: string): StringNode {
    return {type: AsonNodeType.string, value: value}
}

export function newNullNode(): NullNode {
    return {type: AsonNodeType.null}
}


export function newNumberNode(value: number): NumberNode {
    return {type: AsonNodeType.number, value: value}
}

export function newBooleanNode(value: boolean): BooleanNode {
    return {type: AsonNodeType.boolean, value: value}
}

export enum AsonNodeType {
    null,
    object,
    array,
    string,
    number,
    boolean,
}

export interface Node {
    type: AsonNodeType
}

export interface ObjectNode extends Node {
    type: AsonNodeType
    items: Node[]
}

export interface ArrayNode extends Node {
    type: AsonNodeType
    items: Node[]
}

export interface StringNode extends Node {
    type: AsonNodeType
    value: string
}

export interface NullNode extends Node {
    type: AsonNodeType
}

export interface NumberNode extends Node {
    type: AsonNodeType
    value: number
}

export interface BooleanNode extends Node {
    type: AsonNodeType
    value: boolean
}
