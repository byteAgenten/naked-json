import {Token, tokenize, TokenType} from "./tokenizer";
import {
    ArrayNode,
    AsonNodeType,
    BooleanNode,
    newArrayNode,
    newBooleanNode,
    newNullNode,
    newNumberNode,
    newObjectNode,
    newStringNode,
    NumberNode,
    ObjectNode,
    StringNode
} from "./models";
import formatObjectNode from "./formatter";

class NakedJSONParser {

    private _tokens: Token[] = [];

    public parse(source: string): ObjectNode {

        this._tokens = tokenize(source)

        let objectNode = newObjectNode()

        if (this.at().type === TokenType.OpenCurlyBracket) {
            objectNode = this.parseObject()
        } else {
            //error
        }
        return objectNode
    }

    public  stringify(source: any): string {

        const on = this.readObject(source)
        return formatObjectNode(on)
    }

    public  readObject(source: any): ObjectNode {

        const objectNode = newObjectNode()
        this.read(source, objectNode)
        return objectNode
    }

    private  readArray(source: any): ArrayNode {

        const objectNode = newArrayNode()
        this.read(source, objectNode)
        return objectNode
    }

    private  read(source: any, node: ObjectNode | ArrayNode): ObjectNode {

        Object.keys(source).forEach(key => {

            const value = source[key];

            if (value === undefined || value === null) {
                const nullNode = newNullNode();
                node.items.push(nullNode);
            } else if (typeof value === 'string') {
                const stringNode = newStringNode(value);
                node.items.push(stringNode);
            } else if (typeof value === 'number') {
                const numberNode = newNumberNode(value);
                node.items.push(numberNode);
            } else if (typeof value === 'boolean') {
                const booleanNode = newBooleanNode(value);
                node.items.push(booleanNode);
            } else if (typeof value === 'object') {

                if (Array.isArray(value)) {
                    const childArrayNode = this.readArray(value)
                    node.items.push(childArrayNode);
                } else {
                    const childObjectNode = this.readObject(value)
                    node.items.push(childObjectNode);
                }
            }
        })
        return node
    }

    private parseObject(asArray = false): ObjectNode | ArrayNode {

        const objectNode = asArray ? newArrayNode() : newObjectNode()

        this.eat()

        while (this.at().type !== (asArray ? TokenType.CloseSquareBracket : TokenType.CloseCurlyBracket)) {

            if (this.at().type === TokenType.String) {

                const stringNode = newStringNode(this.eat().value)
                objectNode.items.push(stringNode)

            } else if (this.at().type === TokenType.Number) {

                const numberNode = newNumberNode(Number.parseFloat(this.eat().value))
                objectNode.items.push(numberNode)

            } else if (this.at().type === TokenType.Identifier) {

                const identValue = this.eat().value

                if (identValue === 'true' || identValue === 'false') {
                    const booleanNode = newBooleanNode(identValue === 'true')
                    objectNode.items.push(booleanNode);
                } else if (identValue === 'null') {
                    objectNode.items.push(newNullNode())
                }

            } else if (this.at().type === TokenType.OpenCurlyBracket) {

                const childObjectNode = this.parseObject()
                objectNode.items.push(childObjectNode)

            } else if (this.at().type === TokenType.OpenSquareBracket) {

                const childObjectNode = this.parseObject(true)
                objectNode.items.push(childObjectNode)

            } else if (this.at().type === TokenType.Comma) {
                this.eat()
            } else {
                this.error(this.at(), 'Unexpected token')
                this.eat()
            }
        }
        this.eat()

        return objectNode
    }

    private at(): Token {
        return this._tokens[0];
    }

    private error(token: Token, errorMessage: string): void {

        throw new Error(errorMessage);
    }

    private eat(): Token {

        let token = this._tokens.shift() as Token;
        return token;
    }

    private expect(type: TokenType, errorMessage: string): Token {

        const token = this.at();

        if (token.type !== type) {
            this.error(token, errorMessage);
        }
        return this.eat();
    }

    deserialize(value:string, propNames:string[]):any {

        const objectNode = this.parse(value)
        return this.create(objectNode, propNames)
    }

    create(objectNode: ObjectNode, propNames: string[], depth: number = 0): any {

        const obj = {} as any

        const propsPrefix = '_'.repeat(depth)
        const regex = `^${propsPrefix}[A-Za-z].*$`

        objectNode.items.forEach(node => {

            let propName: string | undefined = undefined

            if (propNames.length > 0 && propNames[0].match(regex) !== null) {
                propName = propNames.shift();
                propName = propName?.substring(depth)
            }

            if (propName === undefined) {
                return
            }

            const nodeType = node.type;
            switch (nodeType) {
                case AsonNodeType.object:
                    obj[propName] = this.create(node as ObjectNode, propNames, depth + 1)
                    break
                case AsonNodeType.array:
                    obj[propName] = (node as ArrayNode).items
                    break
                case AsonNodeType.string:
                    obj[propName] = (node as StringNode).value
                    break
                case AsonNodeType.null:
                    obj[propName] = null
                    break
                case AsonNodeType.number:
                    obj[propName] = (node as NumberNode).value
                    break
                case AsonNodeType.boolean:
                    obj[propName] = (node as BooleanNode).value
                    break

                default:
                    throw new Error(`Invalid node type: ${nodeType}`);
            }

        })
        return obj
    }
}

const NakedJSON = new NakedJSONParser()
export default NakedJSON

