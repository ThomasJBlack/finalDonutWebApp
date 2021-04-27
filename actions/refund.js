import { fetchCall } from "./helper_fetchCall.js";
import { shopId } from "./selectShop.js";
import { selectType } from "./actionHelpers/selectType.js";
import { label } from "./actionHelpers/label.js";
import { input } from "./actionHelpers/input.js";
import { button } from "./actionHelpers/button.js";
import { hideElem, showElem } from "./helper_toggleDisplay.js";
import { alertUser } from "./actionHelpers/alertUser.js";
import { getInventory } from "./addDonuts.js";

export async function refund() {
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
    "Select donut type and quantity to be refunded",
    "donutSelectionLabelId"
  );
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
    .addEventListener("click", async () => {
      if (
        (await hasRevenue(
          +selectElemNumberInput.value * inventory[selectElem.value].price
        )) === true
      ) {
        targetType = selectElem.value;
        count = +selectElemNumberInput.value;

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
          `https://donutshop-api.herokuapp.com/refund?id=${shopId}`,
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
          `Thank you for your business!\n  - Refund Receipt:\n  - ${targetType} x ${count}\n  - Total Refunded: $${(
            inventory[targetType].price * count
          ).toFixed(2)}`
        );
      } else {
        hideElem(selectElem.id);
        hideElem(selectLebelElem.id);
        hideElem(selectElemNumberInput.id);
        hideElem(selectElemButton.id);
        let message = document.createElement("text");
        message.innerHTML = `Sorry we cannot refund you your money.`;
        message.setAttribute("id", "randomId");
        parent.appendChild(message);

        let backButton = button(parent, message, "back", "Back");
        document.getElementById("back").addEventListener("click", () => {
          console.log("anchor clicked");
          message.remove();
          backButton.remove();
          showElem(selectElem.id);
          showElem(selectLebelElem.id);
          showElem(selectElemNumberInput.id);
          showElem(selectElemButton.id);
        });
      }
    });
}

async function hasRevenue(amount) {
  console.log("amount: " + amount);
  const request = {
    method: "GET",
  };
  const response = await fetchCall(
    `https://donutshop-api.herokuapp.com/revenue?id=${shopId}`,
    request
  );
  console.log(response.revenue);
  if (response.revenue < amount) {
    return false;
  } else {
    return true;
  }
}
