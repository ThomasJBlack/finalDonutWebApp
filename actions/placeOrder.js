import { fetchCall } from "./helper_fetchCall.js";
import { shopId } from "./selectShop.js";
import { selectType } from "./actionHelpers/selectType.js";
import { label } from "./actionHelpers/label.js";
import { input } from "./actionHelpers/input.js";
import { button } from "./actionHelpers/button.js";
import { hideElem, showElem } from "./helper_toggleDisplay.js";
import { alertUser } from "./actionHelpers/alertUser.js";
import { getInventory } from "./addDonuts.js";

export async function placeOrder() {
  let targetType;
  let count;

  hideElem("shopActions");
  let parent = document.body;

  let inventory = await getInventory(shopId);
  // html
  let selectElem = selectType(parent, inventory);
  let selectLebelElem = label(
    parent,
    selectElem,
    "Select disired donut type and quantity",
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

  document
    .getElementById("donutSelectionButtonId")
    .addEventListener("click", () => {
      targetType = selectElem.value;
      count = selectElemNumberInput.value;
      console.log(`${targetType}: ${count}`);

      if (count <= inventory[targetType].count) {
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
          `https://donutshop-api.herokuapp.com/place-order?id=${shopId}`,
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
          `Thank you for your purchase!\n  - Receipt:\n  - ${targetType} x ${count}\n  - Total: $${(
            inventory[targetType].price * count
          ).toFixed(2)}`
        );
      } else {
        alert("Order error: out of stock!");
      }
    });
}
