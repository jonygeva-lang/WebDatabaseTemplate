import { send } from "clientUtilities";
import { create, get } from "componentUtilities";
import { User } from "types";


var usernameInput = get("input", "usernameInput");
var passwordInput = get("input", "passwordInput");
var submitButton = get("button", "loginButton");
var errorDiv = get("div", "EDiv");

var token = localStorage.getItem("token");

console.log("fg")
submitButton.onclick = async function () {
  var token = await send<string | null>("SignIn", usernameInput.value, passwordInput.value);
  console.log(token)
  if (token == null) {
    errorDiv.innerText = "Invalid username or password.";
    return;
  }

  localStorage.setItem("token", token);
  location.href = "index.html";
};
