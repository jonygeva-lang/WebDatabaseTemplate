import { send } from "clientUtilities";
import { create, get } from "componentUtilities";
import { User } from "types";

var usernameInput = get("input", "usernameInput1");
var passwordInput = get("input", "passwordInput");
var confirmInput = get("input", "usernameInput2");
var SignUpButton = get("button", "signupButton");
var errorDiv = get("div", "EDiv");
console.log(32)
var token = localStorage.getItem("token");
var user = await send<User | null>("GetUser", token);

SignUpButton.onclick = async function () {
    if (passwordInput.value != confirmInput.value) {
        errorDiv.innerText = "Passwords do not match.";
        return;
    }
    console.log(usernameInput.value);
    var token = await send<string | null>("SignUp", usernameInput.value, passwordInput.value);
    if (token == null) {
        errorDiv.innerText = "There is a user with this user name already.";
        return;
    }

    localStorage.setItem("token", token);
    location.href = "index.html";
};
