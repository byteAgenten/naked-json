import {tokenize} from "./tokenizer";

export function hello(str: string): string {

    const source = '{"root",[{"EventSystem",[]},{"Directional Light",[]},{"Global Volume",[]},{"Cube",[]},{"AppController",[]},{"XRRig",[{"Camera Offset",[{"Main Camera",[]}]}]},{"UI Canvas",[{"Panel",[]}]}]}'
    const tokens = tokenize(source);

    const repsonse = 'hello ' + str

    console.info(repsonse)

    return repsonse
}
