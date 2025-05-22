import Model from "../PUBLIC/Model.js";

const tesztTermekLetrehozas = () => ({
  id: 1,
  nev: "Termék 2",
  ar: 1300,
  kep: "./kepek/placeholder.jpg",
  leiras: "Ez egy példa termék leírása.",
});

function ujTermekTeszt() {
  const aruhazModell = new Model();
  const termek = tesztTermekLetrehozas();
  
  aruhazModell.addKosar(termek);
  
  const vartTermek = {...termek, mennyiseg: 1};
  
  const kosarTermek = aruhazModell.getKosarLista()[0];
  
  console.assert(
    JSON.stringify(vartTermek) === JSON.stringify(kosarTermek), 
    vartTermek, kosarTermek, 
    "Hiba: Új termék hozzáadása nem a várt állapotot eredményezte"
  );
  
  console.log("✓ Új termék teszt sikeres");
}

function ismeteltTermekTeszt() {
  const aruhazModell = new Model();
  const termek = tesztTermekLetrehozas();
  
  aruhazModell.addKosar(termek);
  aruhazModell.addKosar(termek);
  
  const vartTermek = {...termek, mennyiseg: 2};
  
  const kosarTermek = aruhazModell.getKosarLista()[0];
  
  console.assert(
    aruhazModell.getKosarLista().length === 1, 
    "Hiba: A termék többször került be a kosárba külön elemként"
  );
  
  console.assert(
    JSON.stringify(vartTermek) === JSON.stringify(kosarTermek), 
    vartTermek, kosarTermek, 
    "Hiba: A termék mennyisége nem frissült megfelelően"
  );
  
  console.log("✓ Ismételt termék teszt sikeres");
}

function termekTorlesTeszt() {
  const aruhazModell = new Model();
  const termek = tesztTermekLetrehozas();
  
  aruhazModell.addKosar(termek);
  aruhazModell.removeKosarItem(1);
  
  console.assert(
    aruhazModell.getKosarLista().length === 0, 
    "Hiba: A termék törlése nem ürítette ki a kosarat"
  );
  
  console.log("✓ Termék törlés teszt sikeres");
}

(function tesztekFuttatasa() {
  ujTermekTeszt();
  ismeteltTermekTeszt();
  termekTorlesTeszt();
  console.log("Minden modell teszt befejeződött");
})();
