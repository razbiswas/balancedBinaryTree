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
        this.binarySelfBalance()                                       
                                           
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
    
    binarySelfBalance() : void {
        let sortedExistingValues: number[] = this.getSortedExistingValues()
        this.makeBalanceBinaryTree(sortedExistingValues)
    }

    makeBalanceBinaryTree(existingValues: number[]): void {
        this.tree = null;   
        this.recursivelyTreeDataSet(existingValues, 0, existingValues.length -1)
        render(this.tree)
    }
    
    recursivelyTreeDataSet(existingValues: number[], startLength: number, endLength: number): number {
        if (startLength > endLength) return null
        let centerNode: number  = Math.floor((startLength + endLength) / 2)
        let centerValue: number = existingValues[centerNode]

        !this.tree ? this.tree = this.initialNewTreeDataSet(centerValue) :
                     this.tree = this.addNodeWithPosition(this.tree, centerValue)

        this.recursivelyTreeDataSet(existingValues, startLength, centerNode - 1)
        this.recursivelyTreeDataSet(existingValues, centerNode + 1, endLength)
        return centerValue
    }
    getSortedExistingValues(id: number = null): number[] {
        let existingValues: number[] = this.getAllExistingValues(this.tree, [], id)
        if (existingValues.length) {
            existingValues = existingValues.sort((a,b) => a - b);
        } else {
            alert ('Please Input some data first.'); 
            return;
        }
        return existingValues
    }

    getAllExistingValues(tree: Tree, existingValues: number[], deletedId: number = null): number[] {
        if(tree){
            if (tree.id !== deletedId){
                existingValues = existingValues.concat(tree.value)  
            }
            tree.leftChild  ? existingValues = this.getAllExistingValues(tree.leftChild, existingValues, deletedId)  : null
            tree.rightChild ? existingValues = this.getAllExistingValues(tree.rightChild, existingValues, deletedId) : null
        }
        return existingValues
    }


    delete(id: number): void {
        let sortedExistingValues: number[] = this.getSortedExistingValues(id)

        this.makeBalanceBinaryTree(sortedExistingValues)

    }

    initialNewTreeDataSet(currentNodeValue: number) : Tree {
        return { 
            id:         Math.floor(Math.random() * 1000),
            value:      currentNodeValue, 
            rightChild: null, 
            leftChild:  null 
        }
    }

    

}

const binaryTree = new BinaryTree()

function onInsertBinaryTree(): void {
    let treeDataInputElement: HTMLInputElement = (<HTMLInputElement>document.getElementById('inputedNumber'))
    binaryTree.insert(treeDataInputElement.valueAsNumber)
    treeDataInputElement.value = ""
}


function render(tree: Tree): void {
    let items: string                                   = ""
    items                                               += "<ul>"
    items                                               += getRenderElement(tree, "")
    items                                               += "</ul>"
    document.getElementById('binaryTreeItem').innerHTML = items
}


function getRenderElement(item: Tree, elements: string): string {
    elements += "<li><a href='#'>" + item.value + 
    "</a> <button class='deleteBtn' onclick='binaryTree.delete("+item.id+");'>x</button>"

    if (item.leftChild || item.rightChild) {
        elements += "<ul>"
        item.leftChild ? elements   += getRenderElement(item.leftChild, "") : ""
        item.rightChild ? elements  += getRenderElement(item.rightChild, "") : ""
        elements                    += "</ul>"
    }
    elements += "</li>"
    return elements;
}


const treeInput = document.getElementById("inputedNumber");

treeInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("addBtn").click();
    }
  });
  