import { fetchCall } from "./helper_fetchCall.js";
import { shopId } from "./selectShop.js";
import { selectType } from "./actionHelpers/selectType.js";
import { label } from "./actionHelpers/label.js";
import { input } from "./actionHelpers/input.js";
import { button } from "./actionHelpers/button.js";
import { hideElem, showElem } from "./helper_toggleDisplay.js";
import { alertUser } from "./actionHelpers/alertUser.js";

export async function addDonuts() {
  let targetType;
  let count;

  // display inputs
  hideElem("shopActions");
  let parent = document.body;

  let inventory = await getInventory(shopId);

  // html fun!!!
  let selectElem = selectType(parent, inventory);
  let selectLebelElem = label(
    parent,
    selectElem,
    "Select the donut type and quantity to be added",
    "donutSelectionLabelId"
  ); // holy cow it worked *happy face*
  let selectElemNumberInput = input(
    parent,
    "donutSelectionCountId",
    "number",
    1,
    selectElem
  );
  let selectElemButton = button(
    parent,
    selectElem,
    "donutSelectionButtonId",
    "Enter"
  );

  // get inputs and do some checking

  document
    .getElementById("donutSelectionButtonId")
    .addEventListener("click", () => {
      targetType = selectElem.value;
      count = selectElemNumberInput.value;
      console.log(`${targetType}: ${count}`);

      // notify user of completion and update the api
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `{
        "type": "${targetType}",
        "count": "${count}"
      }`,
      };
      const response = fetchCall(
        `https://donutshop-api.herokuapp.com/add-donuts?id=${shopId}`,
        request
      );
      console.log(response);

      // end scene!
      selectElem.remove();
      selectLebelElem.remove();
      selectElemNumberInput.remove();
      selectElemButton.remove();
      alertUser(parent, "alertUserId", "Thank you for your business!");
    });
}

export async function getInventory(id) {
  let inventory = {};

  let request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let response = await fetchCall(
    `https://donutshop-api.herokuapp.com/inventory?id=${id}`,
    request
  );
  for (let i = 0; i < response.donuts.length; i++) {
    inventory[response.donuts[i].type] = {
      price: response.donuts[i].price,
      count: response.donuts[i].count,
    };
  }
  console.log(inventory);
  return inventory;
}
