//var generateName = require('sillyname');


import generateName from "sillyname";
import superheroes, { randomSuperhero } from "superheroes";
var sillyName = generateName();

console.log(`I am ${randomSuperhero()}!`);
console.log(`my name is ${sillyName}.`);