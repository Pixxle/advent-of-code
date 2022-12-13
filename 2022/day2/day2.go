package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	RPSKey := map[string]int{
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

	// 1. Read input
	data, _ := os.ReadFile("day2.input")
	// 2. Split input into lines
	lines := strings.Split(string(data), "\n")
	// 3. Loop over lines and lookup line in RPSkey, add result to result
	result := 0
	for _, line := range lines {
		result += RPSKey[line]
	}
	fmt.Println(result)
}
