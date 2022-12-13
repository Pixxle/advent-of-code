package main

import (
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

type Elf struct {
	Calories []int
	CalSum   int
}

func PanicIfErr(err error) {
	if err != nil {
		panic(err)
	}
}

func parseInput() []Elf {
	byteArr, err := os.ReadFile("day1.input")
	PanicIfErr(err)
	inputstr := string(byteArr)
	inputarr := strings.Split(inputstr, "\n")

	elfs := []Elf{}
	currentelf := 0

	for _, v := range inputarr {
		if len(elfs) <= currentelf {
			elfs = append(elfs, Elf{Calories: nil, CalSum: 0})
		}

		if v == "" {
			currentelf++
			continue
		}

		intval, err := strconv.Atoi(v)
		PanicIfErr(err)
		elfs[currentelf].Calories = append(elfs[currentelf].Calories, intval)
		elfs[currentelf].CalSum += intval
	}

	return elfs
}

func sortElfsByCalories(elfs []Elf) {
	sort.Slice(elfs, func(i, j int) bool {
		return elfs[i].CalSum > elfs[j].CalSum
	})
}

func main() {
	elfs := parseInput()
	sortElfsByCalories(elfs)
	fmt.Printf("%v", elfs[0].CalSum+elfs[1].CalSum+elfs[2].CalSum)
}
