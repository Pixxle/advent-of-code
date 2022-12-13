
import {readLines} from "https://deno.land/std@0.140.0/io/bufio.ts"
const f = await Deno.open("day1.input.large");

let current = 0;
let top1 = 0;
let top2 = 0;
let top3 = 0;

for await (const line of readLines(f)){
	if (line === "") {
		if (current > top1) {
			top3 = top2;
			top2 = top1;
			top1 = current;
			current = 0;
			continue;
		}

		if (current > top2) {
			top3 = top2;
			top2 = current;
			continue;
		}

		current = 0;
		continue;
	}

	current += parseInt(line);
}

console.log(top1 + top2 + top3);