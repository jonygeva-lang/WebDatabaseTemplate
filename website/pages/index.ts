    import type { Item } from "types";

    import { send } from "clientUtilities";
    import { create, get } from "componentUtilities";

    var itemInput = document.querySelector<HTMLInputElement>("#itemInput")!;
    var amountInput = document.querySelector<HTMLInputElement>("#amountInput")!;
    var addButton = document.querySelector<HTMLButtonElement>("#addButton")!;
    var itemsUl = document.querySelector<HTMLUListElement>("#itemsUl")!;''
    var gameDiv = get("div", "game");
    var title = get("div", "head-title");

    var topRow = create("div", { className: "top-row" });
    var freeCells = create("div", { className: "free-cells" });
    var foundations = create("div", { className: "foundations" });

    var tableau = create("div", { className: "tableau" });

    gameDiv.append(topRow, tableau);
    topRow.append(freeCells, foundations);

    function getNum(Id: string) {
      var arr = Id.split("_");
      return arr[0];
    }
    function getType(Id: string) {
      var arr = Id.split("_");
      return arr[1];
    }
    function ColorsMatch(id_first: string, id_second: string)
    {
      if (getType(id_first) == "hearts" && (getType(id_second)== "clubs" || getType(id_second)== "spades" )) {return true}
      if (getType(id_first) == "diamonds" && (getType(id_second)== "clubs" || getType(id_second)== "spades" )) {return true}
      if (getType(id_first) == "clubs" && (getType(id_second)== "diamonds" || getType(id_second)== "hearts" )) {return true}
      if (getType(id_first) == "spades" && (getType(id_second)== "diamonds" || getType(id_second)== "hearts" )) {return true}
    }

    var cardIds = [
      "1_hearts",
      "2_hearts",
      "3_hearts",
      "4_hearts",
      "5_hearts",
      "6_hearts",
      "7_hearts",
      "8_hearts",
      "9_hearts",
      "10_hearts",
      "11_hearts",
      "12_hearts",
      "13_hearts",
      "1_diamonds",
      "2_diamonds",
      "3_diamonds",
      "4_diamonds",
      "5_diamonds",
      "6_diamonds",
      "7_diamonds",
      "8_diamonds",
      "9_diamonds",
      "10_diamonds",
      "11_diamonds",
      "12_diamonds",
      "13_diamonds",
      "1_clubs",
      "2_clubs",
      "3_clubs",
      "4_clubs",
      "5_clubs",
      "6_clubs",
      "7_clubs",
      "8_clubs",
      "9_clubs",
      "10_clubs",
      "11_clubs",
      "12_clubs",
      "13_clubs",
      "1_spades",
      "2_spades",
      "3_spades",
      "4_spades",
      "5_spades",
      "6_spades",
      "7_spades",
      "8_spades",
      "9_spades",
      "10_spades",
      "11_spades",
      "12_spades",
      "13_spades",

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
      let slot = create("div", { className: "slot freecell", onclick: function (){
        console.log("clicked");
        console.log((selectedCard!.parentElement?.lastElementChild == selectedCard) +"1")
        if (selectedCard == null || selectedCard.parentElement?.lastElementChild != selectedCard)
        {
          return
        }
        console.log(selectedCard.parentElement?.lastElementChild == selectedCard)
        if (slot.lastElementChild != null && selectedCard.parentElement?.lastElementChild == selectedCard)
        {
          return;
        }
        console.log(countclick + "free 2")
        countclick = 0
        slot.append(selectedCard);
      } });
      freeCells.append(slot);
      freeCellSlots.push(slot);
    }
      var ArrHearts = 1
      var ArrDiamonds = 1
      var ArrSpade = 1
      var ArrClubs = 1
    // 4 foundations
    for (let i = 0; i < 4; i++) {
      let slot = create("div", { className: "slot foundation", onclick: function (){
        if ( selectedCard != null && selectedCard.parentElement?.lastElementChild === selectedCard && getType(selectedCard?.id!) == "clubs" && parseInt(getNum(selectedCard.id)) == ArrClubs)
        {
          ArrClubs += 1
          slot.append(selectedCard);
          countclick = 0;
          selectedCard = null;
          return;
        }
        if ( selectedCard != null && selectedCard.parentElement?.lastElementChild === selectedCard && getType(selectedCard?.id!) == "spades" && parseInt(getNum(selectedCard.id)) == ArrSpade)
        {
          ArrSpade += 1
          slot.append(selectedCard);
          countclick = 0;
          selectedCard = null;
          return;
        }
        if ( selectedCard != null && selectedCard.parentElement?.lastElementChild === selectedCard && getType(selectedCard?.id!) == "diamonds" && parseInt(getNum(selectedCard.id)) == ArrDiamonds)
        {
          ArrDiamonds += 1
          slot.append(selectedCard);
          countclick = 0;
          selectedCard = null;
          return;
        }
        if ( selectedCard != null && selectedCard.parentElement?.lastElementChild = selectedCard && getType(selectedCard?.id!) == "hearts" && parseInt(getNum(selectedCard.id)) == ArrHearts)
        {
          ArrHearts += 1
          slot.append(selectedCard);
          countclick = 0;
          selectedCard = null;
          return;
        }
      } });
      foundations.append(slot);
      foundationSlots.push(slot);
    }

    // 8 tableau columns
    for (let i = 0; i < 8; i++) {
      let col = create("div", { className: "column" });
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
    var selectedCard: HTMLImageElement | null = null;

    // deal into 8 columns (FreeCell style)

      // let CardArr1: string[] = [];
      // let CardArr2: string[] = [];
      // let CardArr3: string[] = [];
      // let CardArr4: string[] = [];
      // let CardArr5: string[] = [];
      // let CardArr6: string[] = [];
      // let CardArr7: string[] = [];
      // let CardArr8: string[] = [];

    var countclick = 0
    for (let i = 0; i < indices.length; i++) {
      var cardIndex = indices[i];

      let cardImg = create("img", {
        src: cardUrls[cardIndex],
        className: "card",
        id: cardIds[cardIndex],
        onclick: function () {
          console.log("start", countclick);
          if (countclick === 0){
            selectedCard = cardImg;
            selectedCard.classList.add("selectedCard1");
            console.log(countclick + " ?" )
            countclick = 1
          } 
          else if (countclick === 1){
          if (selectedCard == null)
            {
              return;
            }
          selectedCard.classList.remove("selectedCard1");
          if (
            parseInt(getNum(selectedCard.id)) +1 === parseInt(getNum(cardImg.id))
            && (selectedCard.parentElement as HTMLDivElement).children.length-1 == Array.from((selectedCard.parentElement as HTMLDivElement).children).indexOf(selectedCard)
            && cardImg == cardImg.parentElement!.lastElementChild
            && ColorsMatch(selectedCard.id, cardImg.id)
          ) 
            {
              let column = cardImg.parentElement as HTMLDivElement;
              selectedCard.classList.remove("selectedCard1");
              column.append(selectedCard);
            }
            // && selctedCard.parentElement 
          console.log(countclick = 0)
          console.log(selectedCard.id)
          console.log(cardImg.id)
          countclick = 0
          }
          console.log("end", countclick);
        }
      });

      cardImg.dataset['place'] = (i % 8).toString();  

      var column = tableauColumns[i % 8];
      // if ((i%8) == 0) { 
      //   CardArr1.push(cardImg.id)
      // }
      // else if ((i%8) == 1) {
      //   CardArr2.push(cardImg.id)
      // }
      // else if ((i%8) == 2) {
      //   CardArr3.push(cardImg.id)
      //   console.log(CardArr3.at(-1))
      // }
      // else if ((i%8) == 3) {
      //   CardArr4.push(cardImg.id)
      // }
      // else if ((i%8) == 4) {
      //   CardArr5.push(cardImg.id)
      // }
      // else if ((i%8) == 5) {
      //   CardArr6.push(cardImg.id)
      // }
      // else if ((i%8) == 6) {
      //   CardArr7.push(cardImg.id)
      // }
      // else if ((i%8) == 7) {
      //   CardArr8.push(cardImg.id)
      // }
      column.append(cardImg);
    }
    // var items = await send<Item[]>("getItems");
    // for (var i = 0; i < items.length; i++) {
    //   var itemLi = create("li");
    //   itemLi.innerText = `${items[i].amount} ${items[i].name}`;
    //   itemsUl.append(itemLi);

    // }

    // addButton.onclick = async function () {
    //   await send("addItem", itemInput.value, parseInt(amountInput.value));
    //   location.reload();
    // };