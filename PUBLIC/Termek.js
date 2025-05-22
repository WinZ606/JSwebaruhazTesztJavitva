export default class Termek {
  #obj = {};
  #szuloElem;
  #index;
  #termekElem;
  constructor(obj, szuloElem, index) {
    this.#obj = obj;
    this.#szuloElem = szuloElem;

    this.#index = index;
    this.#termekElem = document.createElement("div");
    this.megjelenit();
    this.esemenykezelo()
  }
  megjelenit() {
    this.#termekElem.classList.add("termek", "card", "col-md-4", "col-lg-3");
    this.#termekElem.setAttribute("data-index", this.#index);
    this.#termekElem.setAttribute("data-id", this.#obj.id);
    this.#szuloElem.appendChild(this.#termekElem);
    this.#termekElem.innerHTML = `
        <div class="card h-100">
            <img src="${this.#obj.kep}" class="card-img-top" alt="${this.#obj.nev}">
            <div class="card-body">
                <h5 class="card-title">${this.#obj.nev}</h5>
                <p class="card-text">${this.#obj.leiras}</p>
                <p class="card-text"><strong>Ár: ${this.#obj.ar} Ft</strong></p>
                <button class="btn btn-primary kosarba" data-id="${this.#obj.id}">Kosárba</button>
            </div>
        </div>`;
  }
  esemenykezelo() {
    this.#termekElem
      .querySelector(".kosarba")
      .addEventListener("click", (e) => {
        const id = this.#index
        const customEvent = new CustomEvent("kosarbaTesz", {
          detail: { id },
        });
        window.dispatchEvent(customEvent);
      });
  }
}
