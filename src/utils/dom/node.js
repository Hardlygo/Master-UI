export function removeNode(el) {
  const parent = el.parentNode;
  if (parent) {
    parent.removeChild(el);
  }
}
