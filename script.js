document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("preisrechner-form");
  const ergebnisBox = document.getElementById("preisrechner-ergebnis");

  if (!form || !ergebnisBox) {
    console.log("Preisrechner: HTML nicht gefunden");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const qm = parseFloat(document.getElementById("qm").value);
    const wochen = parseInt(document.getElementById("wochen").value);

    if (isNaN(qm) || isNaN(wochen) || qm <= 0 || wochen <= 0) {
      ergebnisBox.innerHTML = "<p>Bitte gültige Werte eingeben.</p>";
      return;
    }

    let mietpreis = 0;
    let details = "";

    if (qm < 100) {
      const pauschal = 350;
      if (wochen <= 4) {
        mietpreis = pauschal;
        details = "Pauschalpreis für bis zu 4 Wochen";
      } else {
        mietpreis = pauschal + (wochen - 4) * 0.75 * qm;
        details = "Pauschal 4 Wochen + weitere Wochen à 0,75 €/m²";
      }
    } else {
      const erste = Math.min(wochen, 4) * 1.0 * qm;
      const weitere = Math.max(wochen - 4, 0) * 0.75 * qm;
      mietpreis = erste + weitere;
      details = "4 Wochen à 1 €/m² + weitere Wochen à 0,75 €/m²";
    }

    const kaution = qm * 3;
    const gesamt = mietpreis + kaution;

    ergebnisBox.innerHTML = `
      <p><strong>Berechnung:</strong> ${details}</p>
      <p><strong>Mietpreis:</strong> ${mietpreis.toFixed(2)} €</p>
      <p><strong>Kaution:</strong> ${kaution.toFixed(2)} €</p>
      <p><strong>Gesamt:</strong> ${gesamt.toFixed(2)} €</p>
    `;
  });

});

function openKontakt() {
  document.getElementById("kontakt-popup").style.display = "block";
}

function closeKontakt() {
  document.getElementById("kontakt-popup").style.display = "none";
}


