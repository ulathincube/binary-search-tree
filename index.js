import prettyPrint from './pretty-print.js';
import {
  recurseInOrder,
  recursePostOrder,
  recursePreOrder,
  iterateLevelOrder,
} from './callback.js';

const genericArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const buildTree = (array, start, end) => {
  // build the bst tree using algo(recursion)

  if (start > end) return null;

  const mid = start + Math.floor((end - start) / 2);
  const root = createNode(array[mid]);

  root.left = buildTree(array, start, mid - 1);
  root.right = buildTree(array, mid + 1, end);

  return root;
};

function createNode(data, left = null, right = null) {
  return { data, left, right };
}

function createTree(array) {
  const sortedUniqueArray = [...new Set(array)].sort((a, b) => a - b);

  let root = buildTree(sortedUniqueArray, 0, sortedUniqueArray.length - 1);

  prettyPrint(root);

  const insert = value => {
    let currentNode = root;

    const insertRecursive = root => {
      if (root === null) {
        return createNode(value);
      } else {
        if (root.data < value) {
          root.right = insertRecursive(root.right);
        } else if (root.data > value) {
          root.left = insertRecursive(root.left);
        } else if (root.data === value) {
          throw new Error('No duplicates allowed!');
        }

        return root;
      }
    };

    insertRecursive(currentNode);
    prettyPrint(root);
  };

  const deleteItem = value => {
    let currentNode = root;
    const deleteRecursive = (root, value) => {
      if (!root) {
        throw new Error('This key does not exist!');
      }

      if (root.data === value) {
        if (!root.left && !root.right) {
          return null;
        }

        if (!root.left) {
          return root.right;
        }

        if (!root.right) {
          return root.left;
        } else {
          let currentNode = root;

          let inOrderSuccessor = currentNode.right;

          while (inOrderSuccessor.left) {
            inOrderSuccessor = inOrderSuccessor.left;
          }

          root.data = inOrderSuccessor.data;
          root.right = deleteRecursive(root.right, inOrderSuccessor.data);
          prettyPrint(root);
          return root;
        }
      } else {
        if (root.data > value) {
          root.left = deleteRecursive(root.left, value);
        } else if (root.data < value) {
          root.right = deleteRecursive(root.right, value);
        }
        return root;
      }
    };

    deleteRecursive(currentNode, value);
    prettyPrint(root);
  };

  const find = value => {
    let foundNode = null;

    const findRecursive = root => {
      if (!root) {
        throw new Error('Key not found!');
      }
      if (root.data === value) {
        foundNode = root;
        return root;
      } else {
        if (root.data < value) {
          root.right = findRecursive(root.right);
        } else if (root.data > value) {
          root.left = findRecursive(root.left);
        }
        return root;
      }
    };

    findRecursive(root);
    console.log('found', foundNode);

    return foundNode;
  };

  const levelOrderForEach = callback => {
    if (!callback) {
      throw new Error('Please provide a callback function!');
    }

    return callback(root);
  };

  const inOrderForEach = callback => {
    if (!callback) {
      throw new Error('Please provide a callback function!');
    }

    return callback(root);
  };

  const preOrderForEach = callback => {
    if (!callback) {
      throw new Error('Please provide a callback function!');
    }

    return callback(root);
  };

  const postOrderForEach = callback => {
    if (!callback) {
      throw new Error('Please provide a callback function!');
    }

    return callback(root);
  };

  const height = value => {
    const foundNode = find(value);

    const getHeightRecursive = root => {
      if (root === null) {
        return -1;
      }

      let leftHeight = getHeightRecursive(root.left);
      let rightHeight = getHeightRecursive(root.right);

      return Math.max(leftHeight, rightHeight) + 1;
    };

    return getHeightRecursive(foundNode);
  };

  const depth = value => {
    let currentLevel = 0;
    let currentNode = root;

    const getDepthRecursive = root => {
      if (root === null || root.data === value) {
        return;
      }

      currentLevel++;
      if (root.data > value) {
        root.left = getDepthRecursive(root.left);
      } else if (root.data < value) {
        root.right = getDepthRecursive(root.right);
      }

      return root;
    };

    getDepthRecursive(currentNode, value);

    console.log('DEPTH', currentLevel);
  };

  const isBalanced = () => {
    const isBalancedRecursive = root => {
      const getHeightRecursive = root => {
        if (root === null) {
          return -1;
        }

        const leftHeight = getHeightRecursive(root.left);
        const rightHeight = getHeightRecursive(root.right);

        return Math.max(leftHeight, rightHeight) + 1;
      };

      if (root === null) {
        return true;
      }

      const leftHeight = getHeightRecursive(root.left);
      const rightHeight = getHeightRecursive(root.right);

      const heightDifference = Math.abs(leftHeight - rightHeight);

      if (heightDifference > 1) {
        return false;
      }

      return isBalancedRecursive(root.left) && isBalancedRecursive(root.right);
    };

    return isBalancedRecursive(root);
  };

  const rebalance = () => {
    const array = inOrderForEach(recurseInOrder);

    const sortedUniqueArray = [...new Set(array)].sort((a, b) => a - b);

    root = buildTree(sortedUniqueArray, 0, sortedUniqueArray.length - 1);

    prettyPrint(root);
  };

  return {
    insert,
    deleteItem,
    find,
    levelOrderForEach,
    inOrderForEach,
    preOrderForEach,
    postOrderForEach,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

const binarySearchTree = createTree(genericArray);

// binarySearchTree.find(23);

// binarySearchTree.levelOrderForEach(iterateLevelOrder);

// binarySearchTree.postOrderForEach(recursePostOrder);

// binarySearchTree.depth(8);

// console.log(binarySearchTree.height(324));
// console.log(binarySearchTree.height(67));

// console.log(binarySearchTree.isBalanced());

// binarySearchTree.inOrderForEach(recurseInOrder);

binarySearchTree.rebalance();

const driver = () => {};
