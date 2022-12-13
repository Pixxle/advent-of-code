const input_text : string = await Deno.readTextFile("day3.input");
//let input_list = ["vJrwpWtwJgWrhcsFMMfFFhFp"]
const input_list : string[] = input_text.split("\n");

let priority_sum = 0
input_list.forEach((line) => {
    // split into subgroups a and b
    const [string_a, string_b] = (line.slice(0, line.length/2) + "," + line.slice(line.length/2))
    
    // Create an object with the letters as keys, this will be used to check if the letters have been used
    let already_checked = Object.create(null);

    // We know the strings are the same length, so we can just use one of them
    for (let i = 0; i < string_a.length; i++) {
        const char_loc = string_b.indexOf(string_a[i])

        // If the letter is not in the other string, or if it has already been checked, we can skip it
        if (char_loc != -1 && already_checked[string_a[i]] === undefined) {
            already_checked[string_a[i]] = true
            if (string_a[i] == string_a[i].toUpperCase()) {
                priority_sum += string_a.charCodeAt(i) - 38;
                continue;
            }
            priority_sum += string_a.charCodeAt(i) - 96
        }
    }
})

// part 1 answer
console.log(priority_sum);

let sum_part_2 = 0

for(let i = 0; i < input_list.length; i+=3) {
    let list_a = input_list[i];
    let list_b = input_list[i+1];
    let list_c = input_list[i+2];
    let already_checked = Object.create(null);

    for (let j = 0; j < list_a.length; j++) {
        if (list_b.includes(list_a[j]) && list_c.includes(list_a[j]) && already_checked[list_a[j]] === undefined) {
            already_checked[list_a[j]] = true
            if (list_a[j] == list_a[j].toUpperCase()) {
                sum_part_2 += list_a.charCodeAt(j) - 38;
                continue;
            }
            sum_part_2 += list_a.charCodeAt(j) - 96 
        }
    }
}

console.log(sum_part_2);