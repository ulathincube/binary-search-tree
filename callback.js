const recurseInOrder = (root, array = []) => {
  if (root === null) {
    return;
  }

  recurseInOrder(root.left, array);
  // array.push(root.data);
  array.push(root.data);

  recurseInOrder(root.right, array);

  return array;
};

const recursePreOrder = (root, array = []) => {
  if (root === null) return;

  array.push(root.data);

  recursePreOrder(root.left, array);
  recursePreOrder(root.right, array);

  return array;
};

const recursePostOrder = (root, array = []) => {
  if (root === null) return;

  recursePostOrder(root.left, array);
  recursePostOrder(root.right, array);
  array.push(root.data);

  return array;
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

  return result;
};

export { iterateLevelOrder, recurseInOrder, recursePostOrder, recursePreOrder };
