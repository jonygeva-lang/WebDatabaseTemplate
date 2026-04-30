import type { Item } from "types";

import { send } from "clientUtilities";
import { create, get } from "componentUtilities";

var itemInput = document.querySelector<HTMLInputElement>("#itemInput")!;
var amountInput = document.querySelector<HTMLInputElement>("#amountInput")!;
var addButton = document.querySelector<HTMLButtonElement>("#addButton")!;
var itemsUl = document.querySelector<HTMLUListElement>("#itemsUl")!;
var cards = document.querySelectorAll<HTMLImageElement>(".cards");
var cardsDiv = get("div", "cardsDiv");
var gameDiv = get("div", "game");

var topRow = create("div", { className: "top-row" });
var freeCells = create("div", { className: "free-cells" });
var foundations = create("div", { className: "foundations" });

var tableau = create("div", { className: "tableau" });

gameDiv.append(topRow, tableau);
topRow.append(freeCells, foundations);


var cardIds = [
"ace_hearts",
"2_hearts",
"3_hearts",
"4_hearts",
"5_hearts",
"6_hearts",
"7_hearts",
"8_hearts",
"9_hearts",
"10_hearts",
"jack_hearts",
"queen_hearts",
"king_hearts",
"ace_diamonds",
"2_diamonds",
"3_diamonds",
"4_diamonds",
"5_diamonds",
"6_diamonds",
"7_diamonds",
"8_diamonds",
"9_diamonds",
"10_diamonds",
"jack_diamonds",
"queen_diamonds",
"king_diamonds",
"ace_clubs",
"2_clubs",
"3_clubs",
"4_clubs",
"5_clubs",
"6_clubs",
"7_clubs",
"8_clubs",
"9_clubs",
"10_clubs",
"jack_clubs",
"queen_clubs",
"king_clubs",
"ace_spades",
"2_spades",
"3_spades",
"4_spades",
"5_spades",
"6_spades",
"7_spades",
"8_spades",
"9_spades",
"10_spades",
"jack_spades",
"queen_spades",
"king_spades",

];

var cardUrls = [
  "https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_ace_of_hearts.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_2_of_hearts.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_3_of_hearts.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_4_of_hearts.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_5_of_hearts.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_6_of_hearts.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_7_of_hearts.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_8_of_hearts.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_9_of_hearts.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_10_of_hearts.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_jack_of_hearts.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_queen_of_hearts.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_king_of_hearts.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_ace_of_diamonds.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_2_of_diamonds.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_3_of_diamonds.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_4_of_diamonds.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_5_of_diamonds.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_6_of_diamonds.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_7_of_diamonds.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_8_of_diamonds.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_9_of_diamonds.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_10_of_diamonds.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_jack_of_diamonds.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_queen_of_diamonds.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_king_of_diamonds.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_ace_of_clubs.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_2_of_clubs.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_3_of_clubs.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_4_of_clubs.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_5_of_clubs.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_6_of_clubs.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_7_of_clubs.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_8_of_clubs.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_9_of_clubs.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_10_of_clubs.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_jack_of_clubs.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_queen_of_clubs.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_king_of_clubs.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_ace_of_spades.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_2_of_spades.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_3_of_spades.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_4_of_spades.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_5_of_spades.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_6_of_spades.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_7_of_spades.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_8_of_spades.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_9_of_spades.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_10_of_spades.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_jack_of_spades.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_queen_of_spades.svg",
"https://commons.wikimedia.org/wiki/Special:FilePath/English_pattern_king_of_spades.svg"

];
var freeCellSlots: HTMLDivElement[] = [];
var foundationSlots: HTMLDivElement[] = [];
var tableauColumns: HTMLDivElement[] = [];

// 4 free cells
for (let i = 0; i < 4; i++) {
  var slot = create("div", { className: "slot freecell" });
  freeCells.append(slot);
  freeCellSlots.push(slot);
}

// 4 foundations
for (let i = 0; i < 4; i++) {
  var slot = create("div", { className: "slot foundation" });
  foundations.append(slot);
  foundationSlots.push(slot);
}

// 8 tableau columns
for (let i = 0; i < 8; i++) {
  var col = create("div", { className: "column" });
  tableau.append(col);
  tableauColumns.push(col);
}
function shuffle(array: number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

var indices = Array.from({ length: 52 }, (_, i) => i);
shuffle(indices);

// deal into 8 columns (FreeCell style)
for (let i = 0; i < indices.length; i++) {
  var cardIndex = indices[i];

  var cardImg = create("img", {
    src: cardUrls[cardIndex],
    className: "card",
    id: cardIds[cardIndex]
  });

  var column = tableauColumns[i % 8];
  column.append(cardImg);
}

  for (let i = 0; i < cardUrls.length; i++) {
    var cardImg = create("img", {
      src: cardUrls[i],
      className: "cards",
      id: cardIds[i]
    });

    cardsDiv.append(cardImg);
  }

var items = await send<Item[]>("getItems");
for (var i = 0; i < items.length; i++) {
  var itemLi = create("li");
  itemLi.innerText = `${items[i].amount} ${items[i].name}`;
  itemsUl.append(itemLi);

}

addButton.onclick = async function() {
  await send("addItem", itemInput.value, parseInt(amountInput.value));
  location.reload();
};
