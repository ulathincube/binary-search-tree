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

  return { insert, deleteItem };
}

const binarySearchTree = createTree(genericArray);

binarySearchTree.insert(55);

binarySearchTree.deleteItem(55);
