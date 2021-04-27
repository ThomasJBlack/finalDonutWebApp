import { fetchCall } from "./helper_fetchCall.js";
import { shopId } from "./selectShop.js";
import { selectType } from "./actionHelpers/selectType.js";
import { label } from "./actionHelpers/label.js";
import { input } from "./actionHelpers/input.js";
import { button } from "./actionHelpers/button.js";
import { hideElem, showElem } from "./helper_toggleDisplay.js";
import { alertUser } from "./actionHelpers/alertUser.js";
import { getInventory } from "./addDonuts.js";

export async function editPrices() {
  let targetType;
  let price;

  hideElem("shopActions");
  let parent = document.body;

  let inventory = await getInventory(shopId);
  // html
  let selectElem = selectType(parent, inventory);
  let selectLebelElem = label(
    parent,
    selectElem,
    "Select donut type and enter new price",
    "donutSelectionLabelId"
  ); // holy cow it worked *happy face*
  let selectElemNumberInput = input(
    parent,
    "donutSelectionCountId",
    "number",
    1,
    selectElem,
    100
  );
  let selectElemButton = button(
    parent,
    selectElem,
    "donutSelectionButtonId",
    "Enter"
  );

  document
    .getElementById("donutSelectionButtonId")
    .addEventListener("click", () => {
      if (
        +selectElemNumberInput.value <= 100 &&
        +selectElemNumberInput.value > 0
      ) {
        targetType = selectElem.value;
        price = +selectElemNumberInput.value;
        console.log(`${targetType}: ${price}`);

        // notify user of completion and update the api
        const request = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: `{
        "type": "${targetType}",
        "price": "${price}"
      }`,
        };
        const response = fetchCall(
          `https://donutshop-api.herokuapp.com/edit-donut?id=${shopId}`,
          request
        );
        console.log(response);

        // end scene!
        selectElem.remove();
        selectLebelElem.remove();
        selectElemNumberInput.remove();
        selectElemButton.remove();
        alertUser(
          parent,
          "alertUserId",
          `The new price for ${targetType} is now $${price.toFixed(2)}`
        );
      } else {
        alert("Invalid price. Enter price ($0 - $100]");
      }
    });
}
