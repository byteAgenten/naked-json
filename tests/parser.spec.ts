import Parser from "../src/parser";
import {StringNode} from "../src/models";
import NakedJSON from "../src/parser";

describe("A parser suite", function () {
    it("It should parse", function () {

        const source = '{"root",[{"EventSystem",[]},{"Directional Light",[]},{"Global Volume",[]},{"Cube",[]},{"AppController",[]},{"XRRig",[{"Camera Offset",[{"Main Camera",[]}]}]},{"UI Canvas",[{"Panel",[]}]}]}'

        const objectNode = NakedJSON.parse(source)

        expect('root').toEqual((objectNode.items[0] as StringNode).value)
    });

    it("It should format", function () {

        const testObject = {
            firstName: 'John',
            lastName: 'Doe',
            gender: null,
            isMarried: true,
            numberOfChildren: 2,
            contact: {
                email: 'john.doe@byteagenten.de',
                phone: '+49 177 849002233',
                address: {
                    street: 'Nordostpark 25',
                    city: '90411 Nürnberg',
                    country: 'Germany'
                }
            },
            experiences: [
                {
                    'technologie': 'Java',
                    'level': 10,
                    'yearsOfExperience': 5
                },
                {
                    'technologie': 'C#',
                    'level': 6,
                    'yearsOfExperience': 3
                },
                {
                    'technologie': 'Angular',
                    'level': 8,
                    'yearsOfExperience': 5
                }
            ],
            dateOfBirth: {
                year: 1992,
                month: 10,
                day: 7
            }
        }

        const nakedJson = NakedJSON.stringify(testObject)
        const json = JSON.stringify(testObject)



        console.log(json)
        console.log(nakedJson)

       // const propNames = ['firstName', 'lastName', 'isMarried', 'numberOfChildren', 'contact', '_email', '_phone', '_address', '__street', '__city', '__country', 'experiences', 'numbers', 'bools']
        //const obj = parser.deserialize(format, propNames)

        //console.log(obj)

        expect(true).toEqual(false)
    });
});
