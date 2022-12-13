const input_text : string = await Deno.readTextFile("day1.input")
const input_list : string[] = input_text.split("\n");

type Elf = {
	Calories: number[]
	CalSum: number
}

function parseInput(inputs :string[]) {
	let result = [] as Elf[]
	
	let currentElf = 0
	for (let i = 0; i < inputs.length; i++) {
		if (result[currentElf] == undefined) {
			result[currentElf] = {Calories: [], CalSum: 0}
		}
		if (inputs[i] == "") {
			currentElf++
			continue
		}
		result[currentElf].Calories.push(parseInt(inputs[i]))
		result[currentElf].CalSum += parseInt(inputs[i])
	}
	return result
}

function sortElfsByCalories(elfs :Elf[]) {
	return elfs.sort((a, b) => (a.CalSum < b.CalSum) ? 1 : -1)
}

const elfs = parseInput(input_list)
const sortedElfs = sortElfsByCalories(elfs)
console.log(sortedElfs.slice(0,3).reduce((a, b) => a +  b.CalSum, 0))