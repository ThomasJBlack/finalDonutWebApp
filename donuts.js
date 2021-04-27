import { createShop } from "./actions/createShop.js";
import { selectShop } from "./actions/selectShop.js";

import { printInventory } from "./actions/printInventory.js";
import { printRevenue } from "./actions/printRevenue.js";
import { addDonutType } from "./actions/addDonutType.js";
import { addDonuts } from "./actions/addDonuts.js";
import { placeOrder } from "./actions/placeOrder.js";
import { editPrices } from "./actions/editPrices.js";
import { refund } from "./actions/refund.js";
import { deleteDonuts } from "./actions/deleteDonuts.js";

// create a new shop
document.getElementById("createShop").addEventListener("click", createShop);

// select a shop
document.getElementById("selectShop").addEventListener("click", selectShop);

// --- shop actions
// print inventory
document
  .getElementById("printInventory")
  .addEventListener("click", printInventory);

// print revenue
document.getElementById("printRevenue").addEventListener("click", printRevenue);

// add new donut type
document.getElementById("newDonut").addEventListener("click", addDonutType);

// add donuts
document.getElementById("addDonuts").addEventListener("click", addDonuts);

// place order
document.getElementById("placeOrder").addEventListener("click", placeOrder);

// edit prices
document.getElementById("editPrices").addEventListener("click", editPrices);

// get a refund
document.getElementById("refund").addEventListener("click", refund);

// delete donut types (didnt have time)
// document.getElementById("deleteDonuts").addEventListener("click", deleteDonuts);
