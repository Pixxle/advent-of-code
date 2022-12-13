const input_text : string = await Deno.readTextFile("day7.input");
const input_list : string[] = input_text.split("\n");

class TreeNode {
    name : string;
    parent : TreeNode | null;
    children : TreeNode[];
    files : Map<string, number>;

    constructor(name : string, parent : TreeNode | null) {
        this.name = name;
        this.parent = parent;
        this.children = [];
        this.files = new Map();
    }

    getSize() : number {
        const nodeSize = Array.from(this.files.values()).reduce((acc, size) => acc + size, 0);
        return nodeSize + Array.from(this.children.values()).reduce((acc, child) => acc + child.getSize(), 0);
    }

    print() : void {
        console.log(`${this.name} (${this.getSize()} bytes)`);
        console.log(`  Files: ${Array.from(this.files.keys()).join(", ")}`);
        console.log(`  Children: ${this.children.map((child) => child.name).join(", ")}`);
        for (const child of this.children) {
            child.print();
        }
    }

    getCurrentNodeSizeExcludingChildren() : number {
        return Array.from(this.files.values()).reduce((acc, size) => acc + size, 0);
    }

    getFolderSizes() : number[]{
        const folderSizes = Array.from(this.children.values()).map((child) => child.getSize());
        return folderSizes.concat(Array.from(this.children.values()).map((child) => child.getFolderSizes()).reduce((acc, childFolderSizes) => acc.concat(childFolderSizes), []));
    }
};

const findNode = (root : TreeNode, path : string) : TreeNode | undefined => {
    if (path === "/") return root;
    const pathParts = path.split("/");
    let node : TreeNode | undefined = root;
    for (const part of pathParts) {
        if (part === "") continue;
        node = node.children.find((child) => child.name === part);
        if (node === undefined) return undefined;
    }
    return node;
};

const parseInput = (input : string[]) : TreeNode => {
    const root : TreeNode = new TreeNode("/", null);
    let currentNode : TreeNode = root;

    for (const line of input.slice(1, input.length)) {
        const cmd = line.split(" ");
        if (cmd[1] === "cd") {
            if (cmd[2] === "..") {
                if (currentNode.parent !== null) {
                    currentNode = currentNode.parent;
                }
                continue;
            } else if (cmd[2] === "/") {
                this.currentNode = root;
                continue;
            }
            const node  = findNode(currentNode, `${cmd[2]}`);
            if (node !== undefined) {
                currentNode = node;
            }

        } else if (cmd[1] === "ls") {
            // if we LS a directory, continue
            continue;
        } else if (cmd[0] === "dir") {
            // if we find a DIR, add node to tree if it doesn't exist
            if (findNode(currentNode, `/${cmd[1]}`) === undefined) {
                currentNode.children.push(new TreeNode(cmd[1], currentNode));
            }
        } else {
            // if we find a FILE, add it to the current node
            currentNode.files.set(cmd[1], parseInt(cmd[0]));
        }
    }

    return root;
};

// find all nodes that have value less than 100000
const sumLessThan100000 = (node : TreeNode) : number => {
    if (node.children.length === 0) {
        if (node.getCurrentNodeSizeExcludingChildren() < 100000) {
            return node.getSize();
        }
        return 0;
    }
    return (node.getSize() < 100000 ? node.getSize() : 0) + Array.from(node.children.values()).reduce((acc, child) => acc + sumLessThan100000(child), 0);
};

const root : TreeNode = parseInput(input_list);

// part 1 
console.log(sumLessThan100000(root));

// part 2 
const unusedSpace = 70000000 - root.getSize();
const requiredSpace = 30000000;
let folders = root.getFolderSizes();
folders.sort((a, b) => a - b);
for(let i = 0; i < folders.length; i++) {
    if (unusedSpace + folders[i] >= requiredSpace) {
        console.log(folders[i]);
        break;
    }
};