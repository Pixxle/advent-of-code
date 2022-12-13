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

	var previous *int
	timesGrown := 0
	for scanner.Scan() {
		i, _ := strconv.Atoi(scanner.Text())
		if previous == nil {
			previous = &i
			continue
		}
		if i > *previous{
			timesGrown += 1
		}
		previous = &i
	}

	fmt.Printf("Times Grown: %d\n", timesGrown)
}
