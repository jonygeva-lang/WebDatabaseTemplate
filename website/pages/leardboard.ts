
import { send } from "clientUtilities";
import { create, get } from "componentUtilities";
import { secondtotime } from "pages/funcs";
import { User } from "types";
import { LeaderboardEntry } from "types";
import { WinGame } from "types";

var HelloDiv = get("div", "hello")
var backGame = get("button", "BackGame");
var signUp = get("button", "signUp");
var signIn = get("button", "signIn");
var UserHead = get("h2", "UserHead")
var LogOutButton = get("button", "logout")
var token = localStorage.getItem("token");
var body1 = document.getElementById("leaderboardBody")!;
var body2 = document.getElementById("ownLeaderboardBody")!;
var user = await send<User | null>("GetUser", token);
var currentUser = user?.username;
var leaderboard = await send<LeaderboardEntry[]>("GetLeaderboard", token);
var ownLeaderboard = await send<WinGame[]>("GetOwnLeaderBoard", token);
console.log(leaderboard)
for (let i = 0; i < leaderboard.length; i++)
{
    const player = leaderboard[i];
    body1.append(
        create("tr", {},
            create("td", { innerText: (i + 1).toString() }),
            create("td", { innerText: player.username.toString() }),
            create("td", { innerText: Math.floor(3600-player.time +10*(200-player.moves)).toString() }),
            create("td", { innerText: player.moves.toString() }),
            create("td", { innerText: secondtotime(player.time).toString() }),
        )
    );
}
if (user != null)
{
    HelloDiv.innerText = "welcome, " + currentUser;
    UserHead.innerText = "Your Best Games"
    signUp.hidden = true;
    signIn.hidden = true;
    LogOutButton.innerText = "log out"
    LogOutButton.onclick = function ()
    {
        localStorage.removeItem("token");
        location.reload();
    }
    for (let i = 0; i < ownLeaderboard.length; i++)
    {
    const game = ownLeaderboard[i];
    body2.append(
        create("tr", {},
        create("td", { innerText: (i + 1).toString() }),
        create("td", {innerText:Math.floor(3600 - game.time +10 * (200 - game.moves)).toString()}),
        create("td", { innerText: game.moves.toString() }),
        create("td", { innerText: secondtotime(game.time)}),
        )
    );
    }
}
else 
{
    LogOutButton.hidden = true;
    console.log(body2)
    body2.hidden = true;

}
backGame.onclick = async function ()
{
    if (user == null)
    {   
        location.href='signUp.html';
    }
    else if (user != null)
    {
        location.href='index.html';
    }
}