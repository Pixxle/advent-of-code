const input_text : string = await Deno.readTextFile("day4.input");
const input_list : string[] = input_text.split("\n");


// part 1
let fully_contained = 0
input_list.forEach((pairs) => {
    const [pair_a, pair_b] = pairs.split(",");
    const [a1, a2] = pair_a.split("-");
    const [b1, b2] = pair_b.split("-");
    const a_array = Array.from({length: parseInt(a2) - parseInt(a1) + 1}, (_, i) => parseInt(a1) + i);
    const b_array = Array.from({length: parseInt(b2) - parseInt(b1) + 1}, (_, i) => parseInt(b1) + i);

    if (a_array.includes(Number(b1)) && a_array.includes(Number(b2)) || b_array.includes(Number(a1)) && b_array.includes(Number(a2))) {
        fully_contained++;
    }
});

console.log(fully_contained);

// part 2
let overlapping = 0
input_list.forEach((pairs) => {
    const [pair_a, pair_b] = pairs.split(",");
    const [a1, a2] = pair_a.split("-");
    const [b1, b2] = pair_b.split("-");
    const a_array = Array.from({length: Number(a2) - Number(a1) + 1}, (_, i) => Number(a1) + i);
    const b_array = Array.from({length: Number(b2) - Number(b1) + 1}, (_, i) => Number(b1) + i);

    if (a_array.some((a) => b_array.includes(a))) {
        overlapping++;
    }
});

//console.log(overlapping);