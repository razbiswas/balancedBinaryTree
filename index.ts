interface Tree {
    id:          number,
    value:       number,
    rightChild?: Tree,
    leftChild?:  Tree,
}

class BinaryTree {
    private tree: Tree | null = null;
    private currentNodeValue: number;

    insert(currentNodeValue: number): void {
        this.currentNodeValue = currentNodeValue
        if(!this.currentNodeValue) return;
        !this.tree ? this.tree = this.initialNewTreeDataSet(this.currentNodeValue)
                   : this.tree = this.addNodeWithPosition(this.tree, this.currentNodeValue)
        this.onSelfBalance()                            // this method balance tree ownself           
        // this.render ()                               // its only make binary tree without balance      
    }

    addNodeWithPosition(tree: Tree, currentNodeValue: number): Tree {
        if (currentNodeValue < tree.value) {
            tree.leftChild ? this.addNodeWithPosition(tree.leftChild, currentNodeValue)   
                           : tree.leftChild = this.initialNewTreeDataSet(currentNodeValue)
        } else {
            tree.rightChild ? this.addNodeWithPosition(tree.rightChild, currentNodeValue) 
                            : tree.rightChild = this.initialNewTreeDataSet(currentNodeValue)
        }
        return tree;
    }
    
    onSelfBalance() : void{
        let inputedValues:number[] = []
        inputedValues              = this.getAllInputedValueAsArray(this.tree, inputedValues)
        // inputedValues = this.getRandomArray(10)          // for testing comment out and Click self Balnce button
        if (inputedValues.length) {
            inputedValues = inputedValues.sort((a,b) => a - b);
        }else {
            alert ('Please Input some data first.'); 
            return;
        }
        this.balanceBinaryTree(inputedValues)
    }

    balanceBinaryTree(inputedValues: number[]): void {
        this.tree = null;   
        this.makeBalanceBinaryTree(inputedValues, 0, inputedValues.length -1)
        this.render()
    }
    
    makeBalanceBinaryTree(inputedValues: number[], startLength: number, endLength: number): number {
        if (startLength > endLength) return null
        let centerNode: number  = Math.floor((startLength + endLength) / 2)
        let centerValue: number = inputedValues[centerNode]

        if (!this.tree) {
            this.tree = this.initialNewTreeDataSet(centerValue)
        } else {
            this.tree = this.addNodeWithPosition(this.tree, centerValue)
        }
        this.makeBalanceBinaryTree(inputedValues, startLength, centerNode - 1)
        this.makeBalanceBinaryTree(inputedValues, centerNode + 1, endLength)
        return centerValue
    }

    getAllInputedValueAsArray(tree: Tree, inputedValues: number[], deletedId: number = null): number[] {
        if(tree){
            if (tree.id !== deletedId){
                inputedValues = inputedValues.concat(tree.value)  
            }
            tree.leftChild  ? inputedValues = this.getAllInputedValueAsArray(tree.leftChild, inputedValues, deletedId)  : null
            tree.rightChild ? inputedValues = this.getAllInputedValueAsArray(tree.rightChild, inputedValues, deletedId) : null
        }
        return inputedValues
    }

    delete(id: number): void {
        let inputedValues:number[] = []
        inputedValues              = this.getAllInputedValueAsArray(this.tree, inputedValues, id)
        if (inputedValues.length) {
            inputedValues = inputedValues.sort((a,b) => a - b);
        }else {
            alert ('Please Input some data first.'); 
            return;
        }
        this.balanceBinaryTree(inputedValues)

    }

    initialNewTreeDataSet(currentNodeValue: number) : Tree {
        return { 
            id:         Math.floor(Math.random() * 1000),
            value:      currentNodeValue, 
            rightChild: null, 
            leftChild:  null 
        }
    }

    getRenderElement(item: Tree, elements: string): string {
        elements += "<li><a href='#'>" + item.value + 
        "</a> <button class='deleteBtn' onclick='binaryTree.delete("+item.id+");'>x</button>"
        if (item.leftChild || item.rightChild) {
            elements += "<ul>"
            item.leftChild ? elements   += this.getRenderElement(item.leftChild, "") : ""
            item.rightChild ? elements  += this.getRenderElement(item.rightChild, "") : ""
            elements                    += "</ul>"
        }
        elements += "</li>"
        return elements;
    }
    
    getRandomArray(size: number): number[] {
        let randomArray: number[] = []
        for (let i: number = 1; i <= size; i++) {
            randomArray = randomArray.concat(Math.floor(Math.random() * 1000))
        }
        return randomArray;
    }

    render(): void {
        let items: string                                   = ""
        items                                               += "<ul>"
        items                                               += this.getRenderElement(this.tree, "")
        items                                               += "</ul>"
        document.getElementById('binaryTreeItem').innerHTML = items
    }

}

const binaryTree = new BinaryTree()

function onInsertBinaryTree(): void {
    let treeDataInputElement: HTMLInputElement = (<HTMLInputElement>document.getElementById('inputedNumber'))
    binaryTree.insert(treeDataInputElement.valueAsNumber)
    treeDataInputElement.value = ""
}

function onBalanceBinaryTree(): void {
    binaryTree.onSelfBalance()
}


const treeInput = document.getElementById("inputedNumber");

treeInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("addBtn").click();
    }
  });
  