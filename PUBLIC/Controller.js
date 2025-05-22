import Kosar from "./Kosar.js";
import Termekek from "./Termekek.js";

class Controller {
  constructor(szuloElem, oldal, modell) {
    this.model = modell;
    this.szuloElem = szuloElem;
    this.oldal = oldal;
    
    // Eseménykezelők eltávolítása az új példány létrehozása előtt
    this.removeEventListeners();
    
    oldal === "kosar" ? this.initKosar() : this.initTermekek();
    
    // Kosár darabszám elem kezelése
    this.kosarDBElem = document.querySelector("#kosarDb");
    if (!this.kosarDBElem && !this.isTesting) {
      this.kosarDBElem = document.createElement("span");
      this.kosarDBElem.id = "kosarDb";
      document.body.appendChild(this.kosarDBElem);
    }
    if (this.kosarDBElem) {
      this.kosarDbKiir();
    }

    // Eseménykezelők hozzáadása
    this.initEventListeners();
  }

  // Eseménykezelők eltávolítása
  removeEventListeners() {
    // Tároljuk el az eseménykezelő függvényeket
    if (!window.eventHandlers) {
      window.eventHandlers = {};
    }

    // Ha vannak korábbi eseménykezelők, távolítsuk el őket
    if (window.eventHandlers.kosarbaTesz) {
      window.removeEventListener("kosarbaTesz", window.eventHandlers.kosarbaTesz);
    }
    if (window.eventHandlers.torles) {
      window.removeEventListener("torles", window.eventHandlers.torles);
    }
    if (window.eventHandlers.novel) {
      window.removeEventListener("novel", window.eventHandlers.novel);
    }
    if (window.eventHandlers.csokkent) {
      window.removeEventListener("csokkent", window.eventHandlers.csokkent);
    }
    if (window.eventHandlers.rendezes) {
      window.removeEventListener("rendezes", window.eventHandlers.rendezes);
    }
    if (window.eventHandlers.szures) {
      window.removeEventListener("szures", window.eventHandlers.szures);
    }
  }

  initEventListeners() {
    // Kosárba tétel eseménykezelő
    window.eventHandlers.kosarbaTesz = (event) => {
      const { id } = event.detail;
      const termek = this.model.getTermekLista().find((t) => t.id === id);
      if (termek) {
        this.model.addKosar(termek);
        this.kosarDbKiir();
      } else {
        console.error("Termék nem található:", id);
      }
    };
    window.addEventListener("kosarbaTesz", window.eventHandlers.kosarbaTesz);

    // Törlés eseménykezelő
    window.eventHandlers.torles = (event) => {
      const id = event.detail;
      this.model.removeKosarItem(id);
      this.frissitKosarNezet();
      this.kosarDbKiir();
    };
    window.addEventListener("torles", window.eventHandlers.torles);

    // Növelés eseménykezelő
    window.eventHandlers.novel = (event) => {
      const id = event.detail;
      this.model.increaseQuantity(id);
      this.frissitKosarNezet();
      this.kosarDbKiir();
    };
    window.addEventListener("novel", window.eventHandlers.novel);

    // Csökkentés eseménykezelő
    window.eventHandlers.csokkent = (event) => {
      const id = event.detail;
      this.model.decreaseQuantity(id);
      this.frissitKosarNezet();
      this.kosarDbKiir();
    };
    window.addEventListener("csokkent", window.eventHandlers.csokkent);

    // Rendezés eseménykezelő
    window.eventHandlers.rendezes = (event) => {
      const { irany } = event.detail;
      this.model.rendezTermekLista(irany);
      this.termekek.init(this.model.getTermekLista());
    };
    window.addEventListener("rendezes", window.eventHandlers.rendezes);

    // Szűrés eseménykezelő
    window.eventHandlers.szures = (event) => {
      const { keresesoKifejezes } = event.detail;
      const szurtLista = this.model.szuresTermekLista(keresesoKifejezes);
      this.termekek.init(szurtLista);
    };
    window.addEventListener("szures", window.eventHandlers.szures);
  }

  kosarDbKiir() {
    if (this.kosarDBElem) {
      this.kosarDBElem.innerHTML = this.model.getKosarDarabszam();
      this.kosarDBElem.classList.add("badge", "bg-primary", "rounded-pill");
    }
  }

  initKosar() {
    const kosarLista = this.model.getKosarLista();
    console.log(kosarLista);
    this.kosar = new Kosar(kosarLista, this.szuloElem);
    console.log(this.kosar);
  }

  initTermekek(lista = null) {
    const loadingSpinner = document.createElement("div");
    loadingSpinner.innerHTML = '<img src="./kepek/loading.gif" alt="Betöltés..." style="display: block; margin: 0 auto;">';
    this.szuloElem.innerHTML = "";
    this.szuloElem.appendChild(loadingSpinner);

    setTimeout(() => {
      this.termekek = new Termekek(this.szuloElem, lista || this.model.getTermekLista());
      loadingSpinner.remove();
    }, 300);
  }

  frissitKosarNezet() {
    if (this.oldal === "kosar" && this.kosar) {
      this.kosar.megjelenit(this.model.getKosarLista());
    }
  }
}

export default Controller;
