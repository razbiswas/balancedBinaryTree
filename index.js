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
        this.binarySelfBalance();
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
    BinaryTree.prototype.binarySelfBalance = function () {
        var sortedExistingValues = this.getSortedExistingValues();
        this.makeBalanceBinaryTree(sortedExistingValues);
    };
    BinaryTree.prototype.makeBalanceBinaryTree = function (existingValues) {
        this.tree = null;
        this.recursivelyTreeDataSet(existingValues, 0, existingValues.length - 1);
        render(this.tree);
    };
    BinaryTree.prototype.recursivelyTreeDataSet = function (existingValues, startLength, endLength) {
        if (startLength > endLength)
            return null;
        var centerNode = Math.floor((startLength + endLength) / 2);
        var centerValue = existingValues[centerNode];
        !this.tree ? this.tree = this.initialNewTreeDataSet(centerValue) :
            this.tree = this.addNodeWithPosition(this.tree, centerValue);
        this.recursivelyTreeDataSet(existingValues, startLength, centerNode - 1);
        this.recursivelyTreeDataSet(existingValues, centerNode + 1, endLength);
        return centerValue;
    };
    BinaryTree.prototype.getSortedExistingValues = function (id) {
        if (id === void 0) { id = null; }
        var existingValues = this.getAllExistingValues(this.tree, [], id);
        if (existingValues.length) {
            existingValues = existingValues.sort(function (a, b) { return a - b; });
        }
        else {
            alert('Please Input some data first.');
            return;
        }
        return existingValues;
    };
    BinaryTree.prototype.getAllExistingValues = function (tree, existingValues, deletedId) {
        if (deletedId === void 0) { deletedId = null; }
        if (tree) {
            if (tree.id !== deletedId) {
                existingValues = existingValues.concat(tree.value);
            }
            tree.leftChild ? existingValues = this.getAllExistingValues(tree.leftChild, existingValues, deletedId) : null;
            tree.rightChild ? existingValues = this.getAllExistingValues(tree.rightChild, existingValues, deletedId) : null;
        }
        return existingValues;
    };
    BinaryTree.prototype["delete"] = function (id) {
        var sortedExistingValues = this.getSortedExistingValues(id);
        this.makeBalanceBinaryTree(sortedExistingValues);
    };
    BinaryTree.prototype.initialNewTreeDataSet = function (currentNodeValue) {
        return {
            id: Math.floor(Math.random() * 1000),
            value: currentNodeValue,
            rightChild: null,
            leftChild: null
        };
    };
    return BinaryTree;
}());
var binaryTree = new BinaryTree();
function onInsertBinaryTree() {
    var treeDataInputElement = document.getElementById('inputedNumber');
    binaryTree.insert(treeDataInputElement.valueAsNumber);
    treeDataInputElement.value = "";
}
function render(tree) {
    var items = "";
    items += "<ul>";
    items += getRenderElement(tree, "");
    items += "</ul>";
    document.getElementById('binaryTreeItem').innerHTML = items;
}
var treeInput = document.getElementById("inputedNumber");
treeInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("addBtn").click();
    }
});
function getRenderElement(item, elements) {
    elements += "<li><a href='#'>" + item.value +
        "</a> <button class='deleteBtn' onclick='binaryTree.delete(" + item.id + ");'>x</button>";
    if (item.leftChild || item.rightChild) {
        elements += "<ul>";
        item.leftChild ? elements += getRenderElement(item.leftChild, "") : "";
        item.rightChild ? elements += getRenderElement(item.rightChild, "") : "";
        elements += "</ul>";
    }
    elements += "</li>";
    return elements;
}
