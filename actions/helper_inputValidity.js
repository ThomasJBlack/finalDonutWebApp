export async function checkTextInputValidity(textInput) {
  console.log(textInput);
  let returnValue = false;
  if (textInput.length === 0 || textInput.length > 255 || textInput === "") {
    alert("You did not enter a valid name. Try again");
    returnValue = false;
  } else {
    returnValue = true;
  }
  return returnValue;
}

// import { alertUser } from "./actionHelpers/alertUser.js";

// export async function checkTextInputValidity(textInput, elements) {
//   // const shopName = document.getElementById("shopNameInputId").value;
//   console.log(textInput.length);
//   if (textInput == "" || textInput.length > 255) {
//     for (let i = 0; i < elements.length; i++) {
//       elements[i].style.display = "none";
//     }
//     let y =await alertUser(parent, "invalidInputId", "You did not enter a valid name");
//     for (let i = 0; i < elements.length; i++) {
//       elements[i].style.display = "unset";
//     }
//     return false;
//   } else {
//     return true;
//   }
// }
