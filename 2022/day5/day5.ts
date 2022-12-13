const input_text : string = await Deno.readTextFile("day5.input.example");
const input_list : string[] = input_text.split("\n");


function parseCargo(input: string[]) {
    let cargo = new Map<number, string[]>();

    // Find number of cargo bays
    for (let i = 0; i < input.length; i++) {
        if (input[i].startsWith(" 1")) {
            let nr = input[i].split("  ").map((x) => x.trim());
            nr.forEach((x) => cargo.set(parseInt(x), []));
            break;
        };
    }

    for (let i = 0; i < input.length; i++) {
        // if we find 1 instruction, we've reached bottom of stack
        if (input[i].startsWith(" 1")) {
            break;
        }
        
        let count = 1;
        for (let j = 1; j < input[i].length; j+=4) {
            if (input[i][j] != " ") {
                cargo.get(count)!.push(input[i][j]);
            }
            count++;
        }
    }

    // Reverse the cargo lists
    cargo.forEach((value, key) => {
        cargo.set(key, value.reverse());
    });
    return cargo;
}

function parseInstructions(input: string[]) {
    let instructions : RegExpExecArray[] = [];
    let instruction_regexp = /move (\d+) from (\d+) to (\d+)/;

    input.forEach((line) => {
        if (line.startsWith("move")) {
            let found = instruction_regexp.exec(line);
            if (found) instructions.push(found);
        };
    });
    
    return instructions 
}


// part 1
console.log("PART 1:")
let cargo = parseCargo(input_list);
let instructions = parseInstructions(input_list);

instructions.forEach((instruction) => {
    const [, count, from, to ] = instruction;
    for (let i = 0; i < parseInt(count); i++) {
        cargo.get(parseInt(to))!
        .push(
            ...cargo.get(parseInt(from))!
            .splice(-1)
        );
    };
});

cargo.forEach((value, key) => {
    console.log(`Cargo ${key}: value: ${value[value.length-1]}`);
});


// part 2 
console.log("PART 2:")

cargo = parseCargo(input_list);
instructions = parseInstructions(input_list);
instructions.forEach((instruction) => {
    const [, count, from, to ] = instruction;

    // move count number of items from from to to
    cargo.get(parseInt(to))!
        .push(
            ...cargo.get(parseInt(from))!
                .splice(-parseInt(count))
        );
});

cargo.forEach((value, key) => {
    console.log(`Cargo ${key}: value: ${value[value.length-1]}`);
});