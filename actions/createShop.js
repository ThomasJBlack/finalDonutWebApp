import { fetchCall } from "./helper_fetchCall.js";
import { checkTextInputValidity } from "./helper_inputValidity.js";
import { showElem, hideElem } from "./helper_toggleDisplay.js";
import { getShopId } from "./selectShop.js"; // need this to set shop id.
import { label } from "./actionHelpers/label.js";
import { button } from "./actionHelpers/button.js";
import { input } from "./actionHelpers/input.js";

export function createShop() {
  document.getElementById("shops").style.display = "none";

  let parent = document.body;

  let shopNameInput = input(parent, parent, "shopNameInputId", "text", 1, 255);

  let shopNameInputLabel = label(
    parent,
    shopNameInput,
    "Enter new Shop Name",
    "shopNameInputLabelId"
  );

  let shopNameInputButton = button(
    parent,
    shopNameInput,
    "shopNameInputButtonId",
    "Enter"
  );

  document
    .getElementById(shopNameInputButton.id)
    .addEventListener("click", () => {
      if (checkTextInputValidity(shopNameInput.value)) {
        addShopToAPI(shopNameInput.value);
        getShopId(shopNameInput.value); // I set the shop id in selectShop.js even if they make a new shop
        // end scene!
        shopNameInput.remove();
        shopNameInputLabel.remove();
        shopNameInputButton.remove();
        // lights, camera, action!
        showElem("shopActions");
      }
    });
}

async function addShopToAPI(shopName) {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: `{ "name": "${shopName}" }`,
  };
  const response = await fetchCall(
    `https://donutshop-api.herokuapp.com/create-donut-shop`,
    request
  );
  return response;
}
