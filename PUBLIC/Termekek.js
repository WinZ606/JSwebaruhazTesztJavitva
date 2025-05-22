import Termek from "./Termek.js";

class Termekek {
  #termekLista = [];
  constructor(szuloElem, termekLista) {
    this.szuloElem = szuloElem;
    this.szuresrendezesGombok();
    this.init(termekLista);
  }

  init(lista) {
    this.#termekLista = lista;
    if (this.termekElem) {
      this.termekElem.remove();
    }
    this.termekElem = document.createElement("div");
    this.termekElem.classList.add("termekek", "row");
    this.szuloElem.appendChild(this.termekElem);

    this.#termekLista.forEach((termek, index) => {
      new Termek(termek, this.termekElem, index);
    });
  }
  szuresrendezesGombok() {
    const szuresRendezesDiv = document.createElement("div");
    szuresRendezesDiv.classList.add("szuresrendezes", "m-3");
    this.szuloElem.appendChild(szuresRendezesDiv);

    const szuroMezo = document.createElement("input");
    szuroMezo.type = "text";
    szuroMezo.placeholder = "Keresés...";
    szuroMezo.classList.add("form-control", "mb-3");
    szuresRendezesDiv.appendChild(szuroMezo);

    szuroMezo.addEventListener("input", () => {
      const keresesoKifejezes = szuroMezo.value;
      const szuresEvent = new CustomEvent("szures", {
        detail: { keresesoKifejezes },
      });
      window.dispatchEvent(szuresEvent);
    });

    const rendezesGombNovevo = document.createElement("button");
    rendezesGombNovevo.textContent = "Név  ⬆";
    rendezesGombNovevo.classList.add("btn", "btn-primary", "m-1");
    szuresRendezesDiv.appendChild(rendezesGombNovevo);

    const rendezesGomb = document.createElement("button");
    rendezesGomb.textContent = "Név ⬇ ";
    rendezesGomb.classList.add("btn", "btn-primary", "m-1");
    szuresRendezesDiv.appendChild(rendezesGomb);

    const rendezesGombArNovevo = document.createElement("button");
    rendezesGombArNovevo.textContent = "Ár ⬆";
    rendezesGombArNovevo.classList.add("btn", "btn-success", "m-1");
    szuresRendezesDiv.appendChild(rendezesGombArNovevo);

    const rendezesGombArCsokkeno = document.createElement("button");
    rendezesGombArCsokkeno.textContent = "Ár⬇";
    rendezesGombArCsokkeno.classList.add("btn", "btn-success", "m-1");
    szuresRendezesDiv.appendChild(rendezesGombArCsokkeno);

    rendezesGomb.addEventListener("click", () => {
      const rendezesEvent = new CustomEvent("rendezes", {
        detail: { irany: "nevSzerintCsokkeno" },
      });
      window.dispatchEvent(rendezesEvent);
    });

    rendezesGombNovevo.addEventListener("click", () => {
      const rendezesEvent = new CustomEvent("rendezes", {
        detail: { irany: "nevSzerintNovevo" },
      });
      window.dispatchEvent(rendezesEvent);
    });

    rendezesGombArNovevo.addEventListener("click", () => {
      const rendezesEvent = new CustomEvent("rendezes", {
        detail: { irany: "arSzerintNovevo" },
      });
      window.dispatchEvent(rendezesEvent);
    });

    rendezesGombArCsokkeno.addEventListener("click", () => {
      const rendezesEvent = new CustomEvent("rendezes", {
        detail: { irany: "arSzerintCsokkeno" },
      });
      window.dispatchEvent(rendezesEvent);
    });
  }
}

export default Termekek;
