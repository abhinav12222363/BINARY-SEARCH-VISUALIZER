
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  
  insert(data) {
    let newNode = new Node(data);
    if (this.root === null) {
      this.root = newNode;
      playInsertSound(); // Play sound on insert
      this.visualize(); // Update visualization
      return;
    }

    let current = this.root;
    while (true) {
      if (data < current.data) {
        if (current.left === null) {
          current.left = newNode;
          playInsertSound(); // Play sound on insert
          this.visualize(); // Update visualization
          return;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          playInsertSound(); // Play sound on insert
          this.visualize(); // Update visualization
          return;
        }
        current = current.right;
      }
    }
  }

  
  delete(data) {
    this.root = this._delete(this.root, data);
    this.visualize(); // Update visualization
  }

  _delete(node, data) {
    if (node === null) {
      return null;
    }

    if (data < node.data) {
      node.left = this._delete(node.left, data);
    } else if (data > node.data) {
      node.right = this._delete(node.right, data);
    } else {
      // Case 1: No child or only one child
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }

      
      let successor = this._findMin(node.right);
      node.data = successor.data;
      node.right = this._delete(node.right, successor.data);
    }

    return node;
  }

  _findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }


  search(data) {
    return this._search(this.root, data);
  }

  _search(node, data) {
    if (node === null || node.data === data) {
      return node;
    }

    if (data < node.data) {
      return this._search(node.left, data);
    } else {
      return this._search(node.right, data);
    }
  }

  
  visualize() {
    let svgLines = document.getElementById('svg-lines');
    svgLines.innerHTML = ''; // Clear previous SVG content

    if (this.root === null) {
      return;
    }

    let treeHeight = this._height(this.root);
    let treeWidth = Math.pow(2, treeHeight) * 40;
    svgLines.setAttribute('width', treeWidth);

    let rootX = treeWidth / 2;
    let rootY = 50;
    this._visualizeNode(this.root, rootX, rootY, treeWidth / 4, 50, 1, svgLines);
  }

  _visualizeNode(node, x, y, dx, dy, level, svgLines) {
    let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', 15);
    circle.setAttribute('stroke', 'black');
    circle.setAttribute('stroke-width', 2);
    circle.setAttribute('fill', 'lightblue');
    svgLines.appendChild(circle);

    let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('font-size', '12px');
    text.textContent = node.data;
    svgLines.appendChild(text);

    if (node.left !== null) {
      let leftX = x - dx / Math.pow(2, level);
      let leftY = y + dy;
      let lineLeft = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      lineLeft.setAttribute('x1', x);
      lineLeft.setAttribute('y1', y);
      lineLeft.setAttribute('x2', leftX);
      lineLeft.setAttribute('y2', leftY);
      lineLeft.setAttribute('stroke', 'black');
      svgLines.appendChild(lineLeft);
      this._visualizeNode(node.left, leftX, leftY, dx, dy, level + 1, svgLines);
    }

    if (node.right !== null) {
      let rightX = x + dx / Math.pow(2, level);
      let rightY = y + dy;
      let lineRight = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      lineRight.setAttribute('x1', x);
      lineRight.setAttribute('y1', y);
      lineRight.setAttribute('x2', rightX);
      lineRight.setAttribute('y2', rightY);
      lineRight.setAttribute('stroke', 'black');
      svgLines.appendChild(lineRight);
      this._visualizeNode(node.right, rightX, rightY, dx, dy, level + 1, svgLines);
    }
  }

  
  _height(node) {
    if (node === null) {
      return 0;
    }
    let leftHeight = this._height(node.left);
    let rightHeight = this._height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }
}


function playInsertSound() {
  let audio = document.getElementById('insertSound');
  audio.play();
}

let binaryTree = new BinaryTree();


function insert() {
  let dataInput = document.getElementById('data');
  let data = parseInt(dataInput.value.trim());
  if (isNaN(data)) {
    showError('Please enter a valid number.');
    return;
  }
  binaryTree.insert(data);
  dataInput.value = '';
  showError('');
}


function deleteNode() {
  let dataInput = document.getElementById('data');
  let data = parseInt(dataInput.value.trim());
  if (isNaN(data)) {
    showError('Please enter a valid number.');
    return;
  }
  binaryTree.delete(data);
  dataInput.value = '';
  showError('');
}

function searchNode() {
  let dataInput = document.getElementById('data');
  let data = parseInt(dataInput.value.trim());
  if (isNaN(data)) {
    showError('Please enter a valid number.');
    return;
  }
  let result = binaryTree.search(data);
  if (result !== null) {
    showError(`Node ${data} found!`);
  } else {
    showError(`Node ${data} not found.`);
  }
  dataInput.value = '';
}


function showError(message) {
  let errorSpan = document.getElementById('error');
  errorSpan.textContent = message;
}


document.addEventListener('DOMContentLoaded', function() {
  binaryTree.visualize();
});
