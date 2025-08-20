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
