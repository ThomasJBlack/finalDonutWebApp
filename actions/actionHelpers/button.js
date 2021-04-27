export function button(parent, sibling, id, text) {
  let button = document.createElement("button");
  button.setAttribute("id", id);
  button.setAttribute("for", sibling.id);
  button.innerHTML = text;

  parent.appendChild(button);
  return button;
}
