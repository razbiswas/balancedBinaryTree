var BinaryTree = /** @class */ (function () {
    function BinaryTree() {
        this.tree = null;
    }
    BinaryTree.prototype.insert = function (currentNodeValue) {
        this.currentNodeValue = currentNodeValue;
        if (!this.currentNodeValue)
            return;
        !this.tree ? this.tree = this.initialNewTreeDataSet(this.currentNodeValue)
            : this.tree = this.addNodeWithPosition(this.tree, this.currentNodeValue);
        this.onSelfBalance(); // this method balance tree ownself           
        // this.render ()                               // its only make binary tree without balance      
    };
    BinaryTree.prototype.addNodeWithPosition = function (tree, currentNodeValue) {
        if (currentNodeValue < tree.value) {
            tree.leftChild ? this.addNodeWithPosition(tree.leftChild, currentNodeValue)
                : tree.leftChild = this.initialNewTreeDataSet(currentNodeValue);
        }
        else {
            tree.rightChild ? this.addNodeWithPosition(tree.rightChild, currentNodeValue)
                : tree.rightChild = this.initialNewTreeDataSet(currentNodeValue);
        }
        return tree;
    };
    BinaryTree.prototype.onSelfBalance = function () {
        var inputedValues = [];
        inputedValues = this.getAllInputedValueAsArray(this.tree, inputedValues);
        // inputedValues = this.getRandomArray(10)          // for testing comment out and Click self Balnce button
        if (inputedValues.length) {
            inputedValues = inputedValues.sort(function (a, b) { return a - b; });
        }
        else {
            alert('Please Input some data first.');
            return;
        }
        this.balanceBinaryTree(inputedValues);
    };
    BinaryTree.prototype.balanceBinaryTree = function (inputedValues) {
        this.tree = null;
        this.makeBalanceBinaryTree(inputedValues, 0, inputedValues.length - 1);
        this.render();
    };
    BinaryTree.prototype.makeBalanceBinaryTree = function (inputedValues, startLength, endLength) {
        if (startLength > endLength)
            return null;
        var centerNode = Math.floor((startLength + endLength) / 2);
        var centerValue = inputedValues[centerNode];
        if (!this.tree) {
            this.tree = this.initialNewTreeDataSet(centerValue);
        }
        else {
            this.tree = this.addNodeWithPosition(this.tree, centerValue);
        }
        this.makeBalanceBinaryTree(inputedValues, startLength, centerNode - 1);
        this.makeBalanceBinaryTree(inputedValues, centerNode + 1, endLength);
        return centerValue;
    };
    BinaryTree.prototype.getAllInputedValueAsArray = function (tree, inputedValues, deletedId) {
        if (deletedId === void 0) { deletedId = null; }
        if (tree) {
            if (tree.id !== deletedId) {
                inputedValues = inputedValues.concat(tree.value);
            }
            tree.leftChild ? inputedValues = this.getAllInputedValueAsArray(tree.leftChild, inputedValues, deletedId) : null;
            tree.rightChild ? inputedValues = this.getAllInputedValueAsArray(tree.rightChild, inputedValues, deletedId) : null;
        }
        return inputedValues;
    };
    BinaryTree.prototype["delete"] = function (id) {
        var inputedValues = [];
        inputedValues = this.getAllInputedValueAsArray(this.tree, inputedValues, id);
        if (inputedValues.length) {
            inputedValues = inputedValues.sort(function (a, b) { return a - b; });
        }
        else {
            alert('Please Input some data first.');
            return;
        }
        this.balanceBinaryTree(inputedValues);
    };
    BinaryTree.prototype.initialNewTreeDataSet = function (currentNodeValue) {
        return {
            id: Math.floor(Math.random() * 1000),
            value: currentNodeValue,
            rightChild: null,
            leftChild: null
        };
    };
    BinaryTree.prototype.getRenderElement = function (item, elements) {
        elements += "<li><a href='#'>" + item.value +
            "</a> <button class='deleteBtn' onclick='binaryTree.delete(" + item.id + ");'>x</button>";
        if (item.leftChild || item.rightChild) {
            elements += "<ul>";
            item.leftChild ? elements += this.getRenderElement(item.leftChild, "") : "";
            item.rightChild ? elements += this.getRenderElement(item.rightChild, "") : "";
            elements += "</ul>";
        }
        elements += "</li>";
        return elements;
    };
    BinaryTree.prototype.getRandomArray = function (size) {
        var randomArray = [];
        for (var i = 1; i <= size; i++) {
            randomArray = randomArray.concat(Math.floor(Math.random() * 1000));
        }
        return randomArray;
    };
    BinaryTree.prototype.render = function () {
        var items = "";
        items += "<ul>";
        items += this.getRenderElement(this.tree, "");
        items += "</ul>";
        document.getElementById('binaryTreeItem').innerHTML = items;
    };
    return BinaryTree;
}());
var binaryTree = new BinaryTree();
function onInsertBinaryTree() {
    var treeDataInputElement = document.getElementById('inputedNumber');
    binaryTree.insert(treeDataInputElement.valueAsNumber);
    treeDataInputElement.value = "";
}
function onBalanceBinaryTree() {
    binaryTree.onSelfBalance();
}
var treeInput = document.getElementById("inputedNumber");
treeInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("addBtn").click();
    }
});
