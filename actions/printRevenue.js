import { fetchCall } from "./helper_fetchCall.js";
import { shopId } from "./selectShop.js";
import { hideElem, showElem } from "./helper_toggleDisplay.js";
import { button } from "./actionHelpers/button.js";

export async function printRevenue() {
  let request = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let response = await fetchCall(
    `https://donutshop-api.herokuapp.com/revenue?id=${shopId}`,
    request
  );

  hideElem("shopActions");
  let parent = document.body;

  let revenueElem = document.createElement("text");
  parent.appendChild(revenueElem);
  revenueElem.innerHTML = `Shop Revenue: $${response.revenue.toFixed(2)}`;

  let backButton = button(parent, revenueElem, "back", "Back");
  document.getElementById("back").addEventListener("click", () => {
    console.log("anchor clicked");
    revenueElem.remove();
    backButton.remove();
    showElem("shopActions");
  });
}
