package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main(){
	file, _ := os.Open("input.txt")
	defer file.Close()


	scanner := bufio.NewScanner(file)

	var input []int
	for scanner.Scan() {
		t := scanner.Text()
		ti, _ := strconv.Atoi(t)
		input = append(input, ti)
	}

	var window []int
	for i := 0; i < len(input)-2; i++ {
		window = append(window, input[i]+input[i+1]+input[i+2])
	}

	prevIndex := 0
	timesGrown := 0
	for i := 1; i < len(window); i ++ {
		if window[i] > window[prevIndex] {
			timesGrown += 1
		}
		prevIndex = i
	}

	fmt.Printf("Times Grown: %d\n", timesGrown)
}
