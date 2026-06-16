
import { send } from "clientUtilities";
import { create, get } from "componentUtilities";
import { secondtotime } from "pages/funcs";
import { User } from "types";
import { LeaderboardEntry } from "types";
import { WinGame } from "types";

var HelloDiv = get("div", "hello")
var backGame = get("button", "BackGame");
var token = localStorage.getItem("token");
var body = document.getElementById("leaderboardBody")!;
var user = await send<User | null>("GetUser", token);
var currentUser = user?.username;
var leaderboard = await send<LeaderboardEntry[]>("GetLeaderboard", token);
if (user != null)
{
    HelloDiv.innerText = "welcome, " + currentUser;
    
}
console.log(leaderboard)
for (let i = 0; i < leaderboard.length; i++)
{
    const player = leaderboard[i];
    body.append(
        create("tr", {},
            create("td", { innerText: (i + 1).toString() }),
            create("td", { innerText: player.username.toString() }),
            create("td", { innerText: Math.floor(3600-player.time +10*(200-player.moves)).toString() }),
            create("td", { innerText: player.moves.toString() }),
            create("td", { innerText: secondtotime(player.time).toString() }),
        )
    );
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