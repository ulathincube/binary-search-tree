import prettyPrint from './pretty-print.js';
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

function createTree(array, root = null) {
  const sortedUniqueArray = [...new Set(array)].sort((a, b) => a - b);

  root = buildTree(sortedUniqueArray, 0, sortedUniqueArray.length - 1);

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

  return {
    insert,
    deleteItem,
    find,
    levelOrderForEach,
    inOrderForEach,
    preOrderForEach,
    postOrderForEach,
  };
}

const recurseInOrder = root => {
  if (root === null) return;

  recurseInOrder(root.left);
  console.log(root.data);
  recurseInOrder(root.right);
};

const recursePreOrder = root => {
  if (root === null) return;

  console.log(root.data);

  recursePreOrder(root.left);
  recursePreOrder(root.right);
};

const recursePostOrder = root => {
  if (root === null) {
    return;
  }

  recursePostOrder(root.left);
  recursePostOrder(root.right);

  console.log(root.data);
};

const passThroughEachLevel = root => {
  let queue = [root];
  const result = [];

  let currentLevel = 0;
  while (queue.length > 0) {
    let queueLength = queue.length;

    result.push([]);

    for (let i = 0; i < queueLength; i++) {
      let currentNode = queue.shift();
      result[currentLevel].push(currentNode.data);

      if (currentNode.left) {
        queue.push(currentNode.left);
      }

      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
    currentLevel++;
  }

  console.log(result);

  return result;
};

const binarySearchTree = createTree(genericArray);

binarySearchTree.find(23);

binarySearchTree.postOrderForEach(recursePostOrder);
