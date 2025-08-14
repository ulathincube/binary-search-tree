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
    const newNode = createNode(value);
    let currentNode = root;
    let previousNode = null;

    while (currentNode) {
      if (value > currentNode.data) {
        previousNode = currentNode;
        currentNode = currentNode.right;

        if (!currentNode) {
          previousNode.right = newNode;
        }
      } else if (value < currentNode.data) {
        previousNode = currentNode;
        currentNode = currentNode.left;

        if (!currentNode) {
          previousNode.left = newNode;
        }
      } else {
        throw new Error(
          'Please do not enter duplicates into the Binary Search Tree!'
        );
        // value is equal to node value
      }
    }

    console.log(root, root.right, root.left);
  };

  const deleteItem = value => {};

  return { array, insert, deleteItem };
}

const binarySearchTree = createTree(genericArray);

binarySearchTree.insert(55);
