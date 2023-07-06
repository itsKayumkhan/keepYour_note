const add_btn = document.getElementById("add_btn");
const main = document.getElementById("main");
let cardId = 1;

const store = () =>{
  const textArea= document.querySelectorAll(".box");

  const notes = [];
  textArea.forEach(note => notes.push(note.value));

  localStorage.setItem("notes", JSON.stringify(notes));
}
const addNote = (uData = "") => {
  let card = document.createElement("div");
  card.classList.add("card");
  card.id = `card_${cardId}`;
  cardId++;

  const cardData = `
    <div class="head">
      <input type="text" value="heading" class="heading" id="head_${cardId}" />
      <div class="icon">
        <button class="edit">
          <ion-icon name="save-outline" id="save_${cardId}" class="icon-save save"></ion-icon>
          <ion-icon class="icon-edit hide" name="create-outline" id="edit_btn_${cardId}"></ion-icon>
        </button>
        <button class="del">
          <ion-icon class="icon-del" name="trash-outline" id="del_btn_${cardId}"></ion-icon>
        </button>
      </div>
    </div>
    <div class="type_box">
      <div class="show text hide" id="show_${cardId}"></div>
      <textarea placeholder="Note me now" name="text-box" id="pad_${cardId}" class="text box"></textarea>
    </div>
    <div class="up" id="up_${cardId}">
      <ion-icon name="chevron-up-outline"></ion-icon>
    </div>
    <div class="down hide" id="down_${cardId}">
    <ion-icon name="chevron-down-outline"></ion-icon>
    </div>
    
  `;

  card.insertAdjacentHTML("afterbegin", cardData);
  main.appendChild(card);

  const del_btn = card.querySelector(".del");
  del_btn.addEventListener("click", () => {
    card.remove();
    store();
  });

  const edit_btn = card.querySelector(".icon-edit");
  const save = card.querySelector(".save");
  const showDiv = card.querySelector(".show");
  const textArea = card.querySelector(".box");

  edit_btn.addEventListener("click", () => {
    showDiv.classList.toggle("hide");
    textArea.classList.toggle("hide");
    edit_btn.classList.toggle("hide");
    save.classList.toggle("hide");
  });

  save.addEventListener("click", () => {
    edit_btn.classList.toggle("hide");
    save.classList.toggle("hide");
    showDiv.classList.toggle("hide");
    textArea.classList.toggle("hide");
  });



  const textarea = card.querySelector(".box");
  textArea.innerHTML = uData;
  showDiv.innerHTML = uData;
  textarea.addEventListener("input", (e) => {
    const value = e.target.value;
    showDiv.innerHTML = value;

    store();
  });

  const up = card.querySelector(`#up_${cardId}`);
  up.addEventListener("click", () => {
    card.style.height = "20%";
    textArea.style.display = "none";
    showDiv.style.display = "none";
    up.classList.toggle("hide");
    down.classList.toggle("hide");
    


  });
  const down = card.querySelector(`#down_${cardId}`);
  down.addEventListener("click", () => {
    card.style.height = "";
    textArea.style.display = "flex";
    showDiv.style.display = "flex";

    down.classList.toggle("hide");
    up.classList.toggle("hide");

  });
};

const notes = JSON.parse(localStorage.getItem("notes"));

if(notes)
{

  notes.forEach((notes) =>addNote(notes) )
}

add_btn.addEventListener("click", addNote);
