const pointInput = document.getElementById('point-amount');
const classeInput = document.getElementById('classe');


var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

if (dd < 10) {
   dd = '0' + dd;
}

if (mm < 10) {
   mm = '0' + mm;
} 
    
today = yyyy + '-' + mm + '-' + dd;
document.getElementById("date-issued").setAttribute("max", today);

const addInfractionButton = document.getElementById('add-infraction');

const resetInfractionButton = document.getElementById('reset-infractions');

// initialize the total fines received variable to 0
let totalPointsPerdus = 0;
let numContraventions = 0;

addInfractionButton.addEventListener('click', () => {
  const pointPerdus = Number(pointInput.value);
  const classe = Number(classeInput.value);


  totalPointsPerdus += pointPerdus;
  numContraventions += 1;


  const totalPointsDisplay = document.getElementById('total-points');

  totalPointsDisplay.textContent = totalPointsPerdus;

  pointInput.value = 1;
  

  classeInput.value = 1;

  var resultsDiv = document.getElementById("results");
  
  var resultItem = document.createElement("p");
  resultItem.innerText = "Contravention #" + numContraventions + " de Classe " + classe + " (Perte de " + pointPerdus + " points).";
  resultsDiv.appendChild(resultItem);
});

resetInfractionButton.addEventListener('click', () => {
    totalPointsPerdus = 0;
    numContraventions = 0;

    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""

    const totalPointsDisplay = document.getElementById('total-points');
    totalPointsDisplay.textContent = totalPointsPerdus;

});