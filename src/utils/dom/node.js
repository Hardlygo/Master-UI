export function removeNode(node) {
  const parent = node.parentNode;
  if (parent) {
    parent.removeChild(node);
  }
}
