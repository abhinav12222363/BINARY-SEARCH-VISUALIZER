class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// Binary Tree class
class BinaryTree {
  constructor() {
    this.root = null;
  }

  // Insert a new node
  insert(data) {
    let newNode = new Node(data);
    if (this.root === null) {
      this.root = newNode;
      playInsertSound(); // Play sound on insert
      return;
    }

    let current = this.root;
    while (true) {
      if (data < current.data) {
        if (current.left === null) {
          current.left = newNode;
          playInsertSound(); // Play sound on insert
          return;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          playInsertSound(); // Play sound on insert
          return;
        }
        current = current.right;
      }
    }
  }

  // Delete a node
  delete(data) {
    this.root = this._delete(this.root, data);
    this.visualize();
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

      // Case 2: Node with two children - find successor
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

  // Search for a node
  search(data) {
    return this._search(this.root, data);
  }

  _search(node, data) {
    if (node === null) {
      return false;
    }

    if (data === node.data) {
      return true;
    } else if (data < node.data) {
      return this._search(node.left, data);
    } else {
      return this._search(node.right, data);
    }
  }

  // Visualize the binary tree
  visualize() {
    document.getElementById('svg-lines').innerHTML = ''; // Clear previous SVG

    if (this.root === null) {
      return;
    }

    this._visualize(this.root, 250, 30, 200);
  }

  _visualize(node, x, y, spacing) {
    let nodeElement = document.createElement('div');
    nodeElement.className = 'node';
    nodeElement.style.left = `${x}px`;
    nodeElement.style.top = `${y}px`;
    nodeElement.innerHTML = `${node.data}`;
    document.getElementById('tree').appendChild(nodeElement);

    if (node.left !== null) {
      this._drawLine(x, y + 15, x - spacing / 2, y + 65);
      this._visualize(node.left, x - spacing / 2, y + 50, spacing / 2);
    }

    if (node.right !== null) {
      this._drawLine(x, y + 15, x + spacing / 2, y + 65);
      this._visualize(node.right, x + spacing / 2, y + 50, spacing / 2);
    }
  }

  // Draw line between nodes
  _drawLine(x1, y1, x2, y2) {
    let lineElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    lineElement.setAttribute('x1', x1);
    lineElement.setAttribute('y1', y1);
    lineElement.setAttribute('x2', x2);
    lineElement.setAttribute('y2', y2);
    lineElement.setAttribute('stroke', 'black');
    document.getElementById('svg-lines').appendChild(lineElement);
  }
}

// Initialize binary tree
let binaryTree = new BinaryTree();

// Function to play insert sound
function playInsertSound() {
  let audio = document.getElementById('insertSound');
  audio.currentTime = 0; // Rewind to the start
  audio.play();
}

// Insert function
function insert() {
  let data = document.getElementById('data').value;
  if (data === '') {
    document.getElementById('error').textContent = 'Please enter data';
    return;
  }

  binaryTree.insert(parseInt(data));
  binaryTree.visualize();
  document.getElementById('data').value = '';
  document.getElementById('error').textContent = '';
}

// Delete function
function deleteNode() {
  let data = document.getElementById('data').value;
  if (data === '') {
    document.getElementById('error').textContent = 'Please enter data';
    return;
  }

  binaryTree.delete(parseInt(data));
  binaryTree.visualize();
  document.getElementById('data').value = '';
  document.getElementById('error').textContent = '';
}

// Search function
function searchNode() {
  let data = document.getElementById('data').value;
  if (data === '') {
    document.getElementById('error').textContent = 'Please enter data';
    return;
  }

  let result = binaryTree.search(parseInt(data));
  if (result) {
    alert(`Node with value ${data} found in the tree!`);
  } else {
    alert(`Node with value ${data} not found in the tree.`);
  }

  document.getElementById('data').value = '';
  document.getElementById('error').textContent = '';
}