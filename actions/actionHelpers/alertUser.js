import { button } from "./button.js";
import { showElem } from "../helper_toggleDisplay.js";

export async function alertUser(parent, id, text) {
  let message = document.createElement("text");
  message.innerHTML = text;
  message.setAttribute("id", id);
  parent.appendChild(message);

  let backButton = button(parent, message, "back", "Back");
  document.getElementById("back").addEventListener("click", () => {
    console.log("anchor clicked");
    message.remove();
    backButton.remove();
    showElem("shopActions");
  });
}
