export function input(parent, id, type, min, sibling = { id: "noId" }, max = 255) {
  let input = document.createElement("input");
  input.setAttribute("id", id);
  input.setAttribute("type", type);
  input.setAttribute("min", min);
  input.setAttribute("value", min);
  input.setAttribute("max", max);
  input.setAttribute("for", sibling.id); // doesnt hurt as far as i can see.

  parent.appendChild(input);

  return input;
}
