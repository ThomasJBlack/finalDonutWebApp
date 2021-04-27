import { fetchCall } from "./helper_fetchCall.js";
import { hideElem, showElem } from "./helper_toggleDisplay.js";
import { button } from "./actionHelpers/button.js";

export let shopId;

export async function selectShop() {
  // clear the screen
  document.getElementById("shops").style.display = "none";

  let shopNames = await getShopNames();
  console.log(shopNames);

  // select
  let parent = document.body;
  let shopSelection = document.createElement("select");
  shopSelection.setAttribute("id", "shopSelectionId");
  shopSelection.style.display = "unset";

  // enter button
  let shopSelectionButton = button(parent, shopSelection, "shopSelectionButtonId", "Enter");

  parent.appendChild(shopSelection);
  parent.appendChild(shopSelectionButton);

  // populate <select> with shop names
  shopNames.forEach((name) => {
    let option = document.createElement("option");
    option.innerHTML = name;
    shopSelection.appendChild(option);
  });

  document
    .getElementById(shopSelectionButton.id)
    .addEventListener("click", () => {
      let selectedShopName = document.getElementById("shopSelectionId").value;
      getShopId(selectedShopName);
      // end scene!
      shopSelection.remove();
      shopSelectionButton.remove();
      // lights, camera, action!
      showElem("shopActions");
    });
}

// a couple special helpers:
export async function getShopId(shopName) {
  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: `{ "name": "${shopName}" }`,
  };
  let response = await fetchCall(
    `https://donutshop-api.herokuapp.com/shop-id`,
    request
  );
  shopId = response.id;
  console.log(shopId);
}

async function getShopNames() {
  let request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let response = await fetchCall(
    "https://donutshop-api.herokuapp.com/shops",
    request
  );
  console.log(response);
  return response;
}
