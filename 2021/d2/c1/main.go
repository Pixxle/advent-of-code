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

	x, y := 0,0
	for scanner.Scan() {
		split := strings.Fields(scanner.Text())
		mov, _ := strconv.Atoi(split[1])

		switch split[0][0]{
		case 'f':
			x += mov
		case 'd':
			y += mov
		case 'u':
			y -=mov
		}
	}
	fmt.Printf("Moved to X:%d, Y:%d, total: %d", x, y, x*y)

}