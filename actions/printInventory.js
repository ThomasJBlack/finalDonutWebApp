import { getInventory } from "./addDonuts.js";
import { fetchCall } from "./helper_fetchCall.js";
import { shopId } from "./selectShop.js";
import { label } from "./actionHelpers/label.js";
import { input } from "./actionHelpers/input.js";
import { button } from "./actionHelpers/button.js";
import { hideElem, showElem } from "./helper_toggleDisplay.js";
import { alertUser } from "./actionHelpers/alertUser.js";

export async function printInventory() {
  hideElem("shopActions");
  let parent = document.body;

  let inventory = await getInventory(shopId);
  let menu = createMenuTable(parent, inventory);

  // end scene!
  let backButton = button(parent, menu, "back", "Back");
  document.getElementById("back").addEventListener("click", () => {
    console.log("anchor clicked");
    menu.remove();
    backButton.remove();
    showElem("shopActions");
  });
}

function createMenuTable(parent, inventory) {
  let menuTable = document.createElement("table");
  menuTable.setAttribute("id", "menuTableId");
  parent.appendChild(menuTable);

  let tHead = document.createElement("th");
  menuTable.appendChild(tHead);

  let nameCell = document.createElement("td");
  nameCell.innerHTML = "Name";
  tHead.appendChild(nameCell);
  let priceCell = document.createElement("td");
  priceCell.innerHTML = "Price";
  tHead.appendChild(priceCell);
  let countCell = document.createElement("td");
  countCell.innerHTML = "Count";
  tHead.appendChild(countCell);

  for (let key of Object.keys(inventory)) {
    let row = document.createElement("tr");
    menuTable.appendChild(row);
    let nameCell = document.createElement("td");
    nameCell.innerHTML = key;
    row.appendChild(nameCell);
    let priceCell = document.createElement("td");
    priceCell.innerHTML = `$${inventory[key].price.toFixed(2)}`;
    row.appendChild(priceCell);
    let countCell = document.createElement("td");
    countCell.innerHTML = inventory[key].count;
    row.appendChild(countCell);
    console.log(inventory[key]);
  }

  return menuTable;
}
