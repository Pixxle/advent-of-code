const input_text : string = await Deno.readTextFile("day2.input");
const input_list : string[] = input_text.split("\n");

/*
 A ROCK 1 
 B PAPER 2
 C SCISSORS 3

 X LOOSE 
 Y DRAW 
 Z WIN

 0 LOST
 3 DRAW
 6 WIN
*/

const rps_key = {
    "A X": 0 + 3,
    "A Y": 3 + 1,
    "A Z": 6 + 2,
    "B X": 0 + 1,
    "B Y": 3 + 2,
    "B Z": 6 + 3,
    "C X": 0 + 2,
    "C Y": 3 + 3,
    "C Z": 6 + 1,
}

let result = 0;
input_list.forEach( line => {
    result += Number(rps_key[line]);
});

console.log(result);