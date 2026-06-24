
import { send } from "clientUtilities";
import { create, get } from "componentUtilities";
import { secondtotime } from "pages/funcs";
import { User } from "types";
import { LeaderboardEntry } from "types";
import { WinGame } from "types";

// Get page elements
var HelloDiv = get("div", "hello")
var backGame = get("button", "BackGame");
var signUp = get("button", "signUp");
var signIn = get("button", "signIn");
var UserHead = get("h2", "UserHead")
var LogOutButton = get("button", "logout")

// Get saved login token
var token = localStorage.getItem("token");

// Leaderboard table bodies
var body1 = document.getElementById("leaderboardBody")!;
var body2 = document.getElementById("ownLeaderboardBody")!;

// Load user and leaderboard data from server
var user = await send<User | null>("GetUser", token);
var currentUser = user?.username;
var leaderboard = await send<LeaderboardEntry[]>("GetLeaderboard", token);
var ownLeaderboard = await send<WinGame[]>("GetOwnLeaderBoard", token);

// Fill global leaderboard table
for (let i = 0; i < leaderboard.length; i++)
{
    const player = leaderboard[i];

    body1.append(
        create("tr", {},
            create("td", { innerText: (i + 1).toString() }), // rank
            create("td", { innerText: player.username.toString() }), // username
            create("td", { innerText: Math.floor(3600-player.time +10*(200-player.moves)).toString() }), // score
            create("td", { innerText: player.moves.toString() }), // moves
            create("td", { innerText: secondtotime(player.time).toString() }), // time
        )
    );
}

if (user != null)
{
    // Update UI for logged in user
    HelloDiv.innerText = "welcome, " + currentUser;
    UserHead.innerText = "Your Best Games"
    signUp.hidden = true;
    signIn.hidden = true;
    LogOutButton.innerText = "log out"

    // Log out and refresh page
    LogOutButton.onclick = function ()
    {
        localStorage.removeItem("token");
        location.reload();
    }

    // Fill personal leaderboard table
    for (let i = 0; i < ownLeaderboard.length; i++)
    {
        const game = ownLeaderboard[i];

        body2.append(
            create("tr", {},
                create("td", { innerText: (i + 1).toString() }), // rank
                create("td", {innerText:Math.floor(3600 - game.time +10 * (200 - game.moves)).toString()}), // score
                create("td", { innerText: game.moves.toString() }), // moves
                create("td", { innerText: secondtotime(game.time)}), // time
            )
        );
    }
}
else
{
    // Hide user-only elements when not logged in
    LogOutButton.hidden = true;
    body2.hidden = true;
}

// Return to game or sign up page
backGame.onclick = async function ()
{
    if (user == null)
    {
        location.href='signUp.html';
    }
    else
    {
        location.href='index.html';
    }
}