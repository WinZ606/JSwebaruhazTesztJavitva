import Kosar from "../PUBLIC/Kosar.js";

(function() {
  function kosarTesztFuttatas() {
    const gyokerElem = document.createElement("div");
    
    const termekek = [
      {
        id: 0,
        nev: "Termék 1",
        ar: 1000,
        kep: "./kepek/placeholder.jpg",
        mennyiseg: 1,
        leiras: "Ez egy példa termék leírása.",
      },
      {
        id: 1,
        nev: "Termék 2",
        ar: 1300,
        kep: "./kepek/placeholder.jpg",
        mennyiseg: 1,
        leiras: "Ez egy példa termék leírása.",
      },
    ];
    
    const vasarloiKosar = new Kosar(termekek, gyokerElem);
    
    const sorok = gyokerElem.querySelectorAll("tr");
    console.log(sorok);
    
    console.assert(
      sorok.length === termekek.length + 1,
      `Sor szám nem egyezik: várt ${termekek.length + 1}, kapott ${sorok.length}`
    );
    
    const elsoTermekNevCella = gyokerElem.querySelector(
      "table tbody tr:nth-child(1) td:nth-child(2)"
    );
    
    console.log(elsoTermekNevCella, elsoTermekNevCella.innerHTML);
    
    console.assert(
      elsoTermekNevCella.innerHTML === termekek[0].nev,
      `Termék név nem egyezik: várt "${termekek[0].nev}", kapott "${elsoTermekNevCella.innerHTML}"`
    );
    
    console.log("Kosár tesztek befejezve");
  }

  kosarTesztFuttatas();
})();