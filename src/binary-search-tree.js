const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.node = null;
  }

  root() {
    if (this.node === null) return null;
    return this.node;
  }

  add(data) {
    let adata = this.node;
    if (adata == null) {
      this.node = new Node(data);
    } else {
      while (true) {
        if (data < adata.data) {
          if (adata.left === null) {
            adata.left = new Node(data);
            break;
          }
          adata = adata.left;
        } else {
          if (adata.right === null) {
            adata.right = new Node(data);
            break;
          }
          adata = adata.right;
        }
      }
    }
  }

  has(data) {
    let adata = this.node;
    if (adata === null) return false;
    if (adata.data === data) return true;
    while (true) {
      if (data < adata.data) {
        if (adata.left === null) {
          return false;
        }
        if (adata.left.data === data) {
          return true;
        }
        adata = adata.left;
      } else {
        if (adata.right === null) {
          return false;
        }
        if (adata.right.data === data) {
          return true;
        }
        adata = adata.right;
      }
    }
  }

  find(data) {
    let adata = this.node;
    if (adata === null) return null;
    if (adata.data === data) return this.node;
    while (true) {
      if (data < adata.data) {
        if (adata.left === null) {
          return null;
        }
        if (adata.left.data === data) {
          return adata.left;
        }
        adata = adata.left;
      } else {
        if (adata.right === null) {
          return null;
        }
        if (adata.right.data === data) {
          return adata.right;
        }
        adata = adata.right;
      }
    }
  }

  remove(data) {
    let adata = this.node;

    function removeNode(actual, toBeRemoved, which) {
      let toBeRemovedLeft = toBeRemoved.left;
      let toBeRemovedRight = toBeRemoved.right;
      if (toBeRemovedRight === null) {
        actual[`${which}`] = toBeRemovedLeft;
      } else {
        actual[`${which}`] = toBeRemovedRight;
        for(;;) {
          if (toBeRemovedRight.left === null) {
            toBeRemovedRight.left = toBeRemovedLeft;
            break;
          }
          toBeRemovedRight = toBeRemovedRight.left;
        }
      }
    }

    if (adata.data === data) {
      let toBeRemovedLeft = this.node.left;
      let toBeRemovedRight = this.node.right;
      if (toBeRemovedRight === null) {
        if (toBeRemovedLeft === null) {
          this.node.data = null;
        } else {
          this.node.left = toBeRemovedLeft;
        }
      } else {
        this.node = toBeRemovedRight;
        let actual = this.node;
        while (true) {
          if (actual.left === null) {
            actual.left = toBeRemovedLeft;
            break;
          }
          actual = actual.left;
        }
      }
    }
    else {
      while (true) {
        if (data < adata.data) {
          if (adata.left === null) {
            break;
          }
          if (adata.left.data === data) {
            let toBeRemoved = adata.left;
            removeNode(adata, toBeRemoved, 'left');
            break;
          }
          adata = adata.left;
        } else {
          if (adata.right === null) {
            break;
          }
          if (adata.right.data === data) {
            let toBeRemoved = adata.right;
            removeNode(adata, toBeRemoved, 'right');
            break;
          }
          adata = adata.right;
        }
      }
    }
  }

  min() {
    let adata = this.node;
    if (adata === null) return null;
    while (true) {
      if (adata.left === null) return adata.data;
      adata = adata.left;
    }
  }

  max() {
    let adata = this.node;
    if (adata === null) return null;
    while (true) {
      if (adata.right === null) return adata.data;
      adata = adata.right;
    }
  }
}

module.exports = {
  BinarySearchTree
};