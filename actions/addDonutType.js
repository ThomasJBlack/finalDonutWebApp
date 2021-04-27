import { fetchCall } from "./helper_fetchCall.js";
import { shopId } from "./selectShop.js";
import { selectType } from "./actionHelpers/selectType.js";
import { label } from "./actionHelpers/label.js";
import { input } from "./actionHelpers/input.js";
import { button } from "./actionHelpers/button.js";
import { hideElem, showElem } from "./helper_toggleDisplay.js";
import { alertUser } from "./actionHelpers/alertUser.js";
import { checkTextInputValidity } from "./helper_inputValidity.js";

export async function addDonutType() {
  hideElem("shopActions");

  let parent = document.body;
  let newType = input(parent, parent, "newType", "text", 1, 255);
  let newTypeLabel = label(
    parent,
    newType,
    "Enter a name and price for the new donut",
    "newTypeLabelId"
  );
  let newTypePrice = input(parent, "newTypePriceId", "number", 1, newType);
  let newTypeButton = button(parent, newType, "newTypeButtonId", "Enter");

  document.getElementById(newTypeButton.id).addEventListener("click", async () => {
    console.log("new donut name and price button clicked");
    let inputValidity = await checkTextInputValidity(newType.value);
    if (inputValidity === true) {
      console.log("why does this work?");
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `{
        "type": "${newType.value}",
        "price": "${newTypePrice.value}"
      }`,
      };
      const response = fetchCall(
        `https://donutshop-api.herokuapp.com/create-donut-type?id=${shopId}`,
        request
      );
      console.log(response);

      newType.remove();
      newTypeLabel.remove();
      newTypePrice.remove();
      newTypeButton.remove();
      alertUser(parent, "alertUserId", "You added a new donut!");
    } else {
      console.log("Text input validity was false");
    }
  });
}
