
export enum TokenType {
    Number,
    String,
    Boolean,
    Comma,
    Identifier,
    OpenCurlyBracket, CloseCurlyBracket,
    OpenSquareBracket, CloseSquareBracket,
}

export interface Token {
    value: string;
    type: TokenType;
}

function createToken(value: string, type: TokenType): Token {
    return {value: value, type: type};
}

class SourceReader {

    source: string
    isEOF = false
    charIndex = -1

    constructor(private sourceCode: string) {

        this.source = sourceCode.replaceAll('\n', '')
            .replaceAll('\t', '')
    }

    get current(): string {
        return this.source.charAt(this.charIndex);
    }

    get hasNext(): boolean {
        return !this.isEOF;
    }

    public shift(): string {

        if (this.isEOF) return '';

        const currentValue = this.current;

        if (this.charIndex < this.source.length - 1) {
            this.charIndex++;
        } else {
            this.isEOF = true;
        }
        return currentValue;
    }

    get isInt(): boolean {
        if (this.isEOF) return false;
        const charCode = this.current.charCodeAt(0);
        const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)]
        return charCode >= bounds[0] && charCode <= bounds[1];
    }

    get isAlpha(): boolean {
        if (this.isEOF) return false;
        const current = this.current;
        return current.toUpperCase() !== current.toLowerCase();
    }
}

function readNumber(src: SourceReader): Token {

    let number = '';
    let dotOccurred = false;
    while (src.isInt || (src.current == '.' && !dotOccurred)) {
        number += src.shift();
    }
    return createToken(number, TokenType.Number);
}

function readString(src: SourceReader, terminalCharacter:string): Token {

    let stringValue = '';

    src.shift(); //Eat open quote
    while (!src.isEOF && src.current !== terminalCharacter) {
        stringValue += src.shift();
    }
    src.shift(); //Eat close quote
    return createToken(stringValue, TokenType.String);
}

function readIdentifier(src: SourceReader):Token {
    let identifier = '';
    while (src.isAlpha || src.isInt || src.current === '_') {
        identifier += src.shift();
    }
    return createToken(identifier, TokenType.Identifier);
}

export function tokenize(sourceCode: string): Token[] {

    const tokens = new Array<Token>();

    const src = new SourceReader(sourceCode);

    while (src.hasNext) {

        const currentChar = src.current;
        if (currentChar == '{') {
            tokens.push(createToken(src.shift(), TokenType.OpenCurlyBracket))
        } else if (currentChar == '}') {
            tokens.push(createToken(src.shift(), TokenType.CloseCurlyBracket))
        } else if (currentChar == '[') {
            tokens.push(createToken(src.shift(), TokenType.OpenSquareBracket))
        } else if (currentChar == ']') {
            tokens.push(createToken(src.shift(), TokenType.CloseSquareBracket))
        } else if (currentChar == ',') {
            tokens.push(createToken(src.shift(), TokenType.Comma))
        } else if (currentChar == '"') {
            tokens.push(readString(src, '"'));
        } else if (currentChar == '\'') {
            tokens.push(readString(src, '\''));
        } else if (src.isInt) {
            tokens.push(readNumber(src));
        } else if( src.isAlpha ) {
            tokens.push(readIdentifier(src))
        } else {
            src.shift();
        }
    }

    return tokens;
}
