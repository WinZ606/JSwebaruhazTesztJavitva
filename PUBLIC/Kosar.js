class Kosar {
  #lista;
  #szuloElem;

  constructor(lista, szuloElem) {
    this.#szuloElem = szuloElem;
    this.megjelenit(lista);
  }

  megjelenit(lista) {
    this.#lista = lista || this.#lista;
    console.log(this.#lista);
    this.#szuloElem.innerHTML = "";
    const table = document.createElement("table");
    table.classList.add("table", "table-striped");

    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th>#</th>
        <th>Termék neve</th>
        <th>Ár</th>
        <th>Mennyiség</th>
        <th>Művelet</th>
      </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    this.#lista.forEach((termek, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${termek.nev}</td>
        <td>${termek.ar} Ft</td>
        <td>
          <button class="btn btn-sm btn-secondary csokkent" data-id="${termek.id}">-</button>
          ${termek.mennyiseg || 1}
          <button class="btn btn-sm btn-secondary novel" data-id="${termek.id}">+</button>
        </td>
        <td><button class="btn btn-danger btn-sm torles" data-id="${termek.id}">Törlés</button></td>
      `;
      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    this.#szuloElem.appendChild(table);
    this.bindEventListeners();
  }

  bindEventListeners() {
    this.#szuloElem.querySelectorAll(".novel").forEach((button) => {
      console.log(button.dataset.id);
      button.addEventListener("click", () => {        
        const event = new CustomEvent("novel", { detail: button.dataset.id });
        window.dispatchEvent(event);
      });
    });

    this.#szuloElem.querySelectorAll(".csokkent").forEach((button) => {
      button.addEventListener("click", () => {
        const event = new CustomEvent("csokkent", { detail: button.dataset.id });
        window.dispatchEvent(event);
      });
    });

    this.#szuloElem.querySelectorAll(".torles").forEach((button) => {
      button.addEventListener("click", () => {
        const event = new CustomEvent("torles", { detail: button.dataset.id });
        window.dispatchEvent(event);
      });
    });
  }
}

export default Kosar;