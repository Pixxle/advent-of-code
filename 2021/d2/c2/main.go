package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main()  {
	file, _ := os.Open("input.txt")
	defer file.Close()
	scanner := bufio.NewScanner(file)

	x, y, aim := 0, 0, 0
	for scanner.Scan() {
		split := strings.Fields(scanner.Text())
		mod, _ := strconv.Atoi(split[1])

		switch split[0][0]{
		case 'f':
			x += mod
			y += mod * aim
		case 'd':
			aim += mod
		case 'u':
			aim -= mod
		}
	}
	fmt.Printf("Moved to X:%d, Y:%d, total: %d\n", x, y, x*y)
}