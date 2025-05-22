import Controller from "./PUBLIC/Controller.js";
import Model from "./PUBLIC/Model.js";

const container = document.querySelector(".container");
 const model = new Model();

function renderTermekek() {
  container.innerHTML = ""; 
  new Controller(container,"termek" ,model);
}

function renderKosar() {
  container.innerHTML = "";
   // Feltételezve, hogy van ilyen metódus a Model osztályban
   new Controller(container, "kosar",model); 

}

document.querySelector("a[href='#termekek']").addEventListener("click", (e) => {
  e.preventDefault();
  renderTermekek();
});

document.querySelector("a[href='#kosar']").addEventListener("click", (e) => {
  e.preventDefault();
  renderKosar();
});

// Alapértelmezett nézet
renderTermekek();
