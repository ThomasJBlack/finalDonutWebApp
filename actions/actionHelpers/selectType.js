export function selectType(parent, inventory) {
  // select type
  let donutSelection = document.createElement("select");
  donutSelection.setAttribute("id", "donutSelectionId");


  parent.appendChild(donutSelection);

  for (let key of Object.keys(inventory)) {
    let option = document.createElement("option");
    option.innerHTML = key;
    donutSelection.appendChild(option);
  }

  return donutSelection;
}
