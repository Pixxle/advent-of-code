const input_text : string = await Deno.readTextFile("day6.input");

// part 1

// Iterate over string and find where 4 unique characters are found
for (let i = 0; i < input_text.length; i++) {
    let unique_chars = new Set();
    for (let j = 0; j < 4; j++) {
        unique_chars.add(input_text[i+j]);
    }
    if (unique_chars.size == 4) {
        console.log(i+4);
        console.log(input_text.slice(i, i+4));
        break;
    }
}

// part 2 
// Iterate over string and find where 14 unique characters are found
for (let i = 0; i < input_text.length; i++) {
    let unique_chars = new Set();
    for (let j = 0; j < 14; j++) {
        unique_chars.add(input_text[i+j]);
    }
    if (unique_chars.size == 14) {
        console.log(i+14);
        console.log(input_text.slice(i, i+4));
        break;
    }
}