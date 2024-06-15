import {tokenize} from "../src/tokenizer";

describe("A suite", function() {
    it("contains spec with an expectation", function() {

        const source = '{"root",[{"EventSystem",[]},{"Directional Light",[]},{"Global Volume",[]},{"Cube",[]},{"AppController",[]},{"XRRig",[{"Camera Offset",[{"Main Camera",[]}]}]},{"UI Canvas",[{"Panel",[]}]}]}'
        const tokens = tokenize(source);


        expect(true).toEqual(true)
    });
});
