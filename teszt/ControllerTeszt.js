import Model from "../PUBLIC/Model.js";
import Controller from "../PUBLIC/Controller.js";

const tesztVezerlo = function() {
    console.log("### Controller Test Starting ###");
    
    let tartalomElem = document.createElement("div");
    tartalomElem.classList.add("container");
    
    let aruhazModell = new Model(); 
    let kosarSzamlalo = document.createElement("span");
    kosarSzamlalo.id = "kosarDb";
    document.body.appendChild(kosarSzamlalo);

    const mennyisegEllenorzes = (termekId, vartMennyiseg, tesztUzenet) => {
        let termekek = aruhazModell.getKosarLista();
        let keresettTermek = termekek.find(x => x.id === termekId);
        let aktualisMennyiseg = keresettTermek ? keresettTermek.mennyiseg : 0;
        
        console.assert(
            aktualisMennyiseg === vartMennyiseg,
            `Error: ${tesztUzenet} - Expected: ${vartMennyiseg}, Actual: ${aktualisMennyiseg}`
        );
        
        if (aktualisMennyiseg !== vartMennyiseg) {
            console.log("🔍 Possible event handler duplication detected: quantity exceeds expected value!");
        }
    };

    mennyisegEllenorzes(1, 0, "Cart should be empty initially");

    let termekVezerlo = new Controller(tartalomElem, "termek", aruhazModell);
    window.dispatchEvent(new CustomEvent("kosarbaTesz", { detail: { id: 1 } }));
    mennyisegEllenorzes(1, 1, "After adding first product");

    let kosarVezerlo = new Controller(tartalomElem, "kosar", aruhazModell);
    window.dispatchEvent(new CustomEvent("novel", { detail: 1 }));
    mennyisegEllenorzes(1, 2, "After increasing quantity");

    let ujTermekVezerlo = new Controller(tartalomElem, "termek", aruhazModell);
    window.dispatchEvent(new CustomEvent("kosarbaTesz", { detail: { id: 1 } }));
    mennyisegEllenorzes(1, 3, "After adding product again");

    let ujKosarVezerlo = new Controller(tartalomElem, "kosar", aruhazModell);
    window.dispatchEvent(new CustomEvent("novel", { detail: 1 }));
    mennyisegEllenorzes(1, 4, "After increasing quantity again");

    window.dispatchEvent(new CustomEvent("csokkent", { detail: 1 }));
    mennyisegEllenorzes(1, 3, "After decreasing quantity");

    if (kosarSzamlalo.parentNode) {
        kosarSzamlalo.parentNode.removeChild(kosarSzamlalo);
    }
};

console.assert(typeof tesztVezerlo === 'function', "Test function does not exist");
console.assert(document.readyState === 'loading' || document.readyState === 'interactive' || document.readyState === 'complete', "Document not ready");
tesztVezerlo(); 