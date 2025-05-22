import { termekLista } from "./termekLista.js";
class Model {
    #termekLista=[]
    #kosarLista=[]
 constructor() {
    this.#termekLista = termekLista;
    this.#kosarLista = [];
  } 
getKosarLista() {
    return this.#kosarLista;
  }
  addKosar(termek) {
    const existingItem = this.#kosarLista.find((t) => t.id === termek.id);
    if (existingItem) {
      existingItem.mennyiseg = (existingItem.mennyiseg || 1) + 1;
    } else {
      this.#kosarLista.push({ ...termek, mennyiseg: 1 });
    }
    
  }
  getTermekLista() {
    return this.#termekLista;
  }

  addTermek(termek) {
    this.#termekLista.push(termek);
  }

  removeTermekById(id) {
    this.#termekLista = this.#termekLista.filter((termek) => termek.id !== id);
  }

  removeKosarItem(id) {
    console.log(Number(id));
    this.#kosarLista = this.#kosarLista.filter((termek) => termek.id !== Number(id));
    console.log(this.#kosarLista);
  }

  increaseQuantity(id) {
    const item = this.#kosarLista.find((termek) => termek.id === Number(id));
    if (item) {
      item.mennyiseg += 1;
    }
  }

  decreaseQuantity(id) {
    const item = this.#kosarLista.find((termek) => termek.id === Number(id));
    if (item && item.mennyiseg > 1) {
      item.mennyiseg -= 1;
    } else if (item) {
      this.removeKosarItem(id);
    }
  }

  rendezTermekLista(irany) {
    if (irany === "nevSzerintNovevo") {
      this.#termekLista.sort((a, b) => a.nev.localeCompare(b.nev));
    }
    if (irany === "nevSzerintCsokkeno") {
      this.#termekLista.sort((a, b) => b.nev.localeCompare(a.nev));
    }
    if (irany === "arSzerintNovevo") {
      this.#termekLista.sort((a, b) => a.ar - b.ar);
    } 
     if (irany === "arSzerintCsokkeno") {
      this.#termekLista.sort((a, b) => b.ar - a.ar);
    }
  }

  szuresTermekLista(keresesoKifejezes) {
    console.log(keresesoKifejezes);
    if (!keresesoKifejezes || typeof keresesoKifejezes !== "string") {
      return this.#termekLista; // Ha a keresési kifejezés érvénytelen, az eredeti listát adja vissza
    }
    const kifejezes = keresesoKifejezes.toLowerCase();
    return this.#termekLista.filter((termek) => {
      return Object.values(termek).some((ertek) =>
        String(ertek).toLowerCase().includes(kifejezes)
      );
    });
  }

  getKosarDarabszam() {
    return this.#kosarLista.reduce((osszesDarab, termek) => osszesDarab + (termek.mennyiseg || 1), 0);
  }
}

export default Model;
