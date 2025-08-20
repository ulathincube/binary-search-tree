const recurseInOrder = (root, array = []) => {
  if (root === null) {
    console.log(array);
    return;
  }

  recurseInOrder(root.left, array);
  // array.push(root.data);
  array.push(root.data);

  recurseInOrder(root.right, array);

  return array;
};

const recursePreOrder = root => {
  if (root === null) return;

  console.log(root.data);

  recursePreOrder(root.left);
  recursePreOrder(root.right);
};

const recursePostOrder = root => {
  if (root === null) return;

  recursePostOrder(root.left);
  recursePostOrder(root.right);

  console.log(root.data);
};

const iterateLevelOrder = root => {
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

export { iterateLevelOrder, recurseInOrder, recursePostOrder, recursePreOrder };
