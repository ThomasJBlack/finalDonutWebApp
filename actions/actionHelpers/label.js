export function label(parent, nextSibling, lableText, labelId) {
  let label = document.createElement("label");
  label.setAttribute("id", labelId);
  label.setAttribute("for", nextSibling.id);
  label.innerHTML = lableText;

  parent.insertBefore(label, nextSibling);
  return label;
}
