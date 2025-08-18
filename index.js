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
        }

        return root;
      }
    };

    insertRecursive(currentNode, value);
    prettyPrint(root);
  };

  const deleteItem = value => {};

  return { array, insert, deleteItem };
}

const binarySearchTree = createTree(genericArray);

binarySearchTree.insert(55);
