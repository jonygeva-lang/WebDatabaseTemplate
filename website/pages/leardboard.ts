
import { send } from "clientUtilities";
import { create, get } from "componentUtilities";
import { User } from "types";
import { WinGame } from "types";
const leaderboard =
 await send<WinGame[]>("GetLeaderboard");
var HelloDiv = get("div", "hello")
 var backGame = get("button", "BackGame");
var token = localStorage.getItem("token");
const body = document.querySelector<HTMLTableSectionElement>(
    "#leaderboardBody"
)!;
    const user = await send<User | null>("GetUser", token);
    const currentUser = user?.username;
console.log("sd")
if (user == null)
{
}
else
{
    HelloDiv.innerText = "welcome, " + currentUser;
}
for (let i = 0; i < leaderboard.length; i++)
{
    const win = leaderboard[i];

    const row = create("tr", {},
        create("td", { innerText: (i + 1).toString() }),
        create("td", { innerText: win.user.username }),
        create("td", { innerText: win.moves.toString() }),
        create("td", { innerText: win.time.toString() })
    );

    body.append(row);
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