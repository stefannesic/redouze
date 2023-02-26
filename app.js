const pointInput = document.getElementById('point-amount');
const classeInput = document.getElementById('classe');
const dateInput = document.getElementById("date-issued")
const resultsDiv = document.getElementById("results");
const formDiv = document.getElementById("form");
const inputDiv = document.getElementById("input");

const addInfractionButton = document.getElementById('add-infraction');
const resetInfractionButton = document.getElementById('reset-infractions');
const submitInfractionButton = document.getElementById('submit-infractions');

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
dateInput.setAttribute("max", today);



let totalPointsPerdus = 0;
let numContraventions = 0;
let listContraventions = [];

class Contravention {
    constructor(date, classe, points) {
      this.id = numContraventions 
      this.date = date;
      this.classe = classe;
      this.points = points;
    }
  
    printContravention() {
      return this.date + " : Contravention #" + this.id + " de Classe " + this.classe + " (Perte de " + this.points + " points).";
    }
}
  

addInfractionButton.addEventListener('click', () => {
  const pointPerdus = Number(pointInput.value);
  const classe = Number(classeInput.value);
  const dateContravention = dateInput.value

  // activate submit button
  submitInfractionButton.disabled = false;
  resetInfractionButton.disabled = false;


  totalPointsPerdus += pointPerdus;

  if (totalPointsPerdus >= 12) {
    var inputMessage = document.createElement("div")
    inputMessage.setAttribute("id", "points-epuises")
    inputMessage.innerText = "Vous avez perdus tous vos points ! Le permis est invalide."
    formDiv.appendChild(inputMessage);
    alert("Vous avez perdus tous vos points ! Le permis est invalide.")
    addInfractionButton.disabled = true;
    submitInfractionButton.disabled = true;
  } 
  if (totalPointsPerdus <= 12) {

    numContraventions += 1;

    const contravention = new Contravention(dateContravention, classe, pointPerdus);

    listContraventions.push(contravention)


    const totalPointsDisplay = document.getElementById('total-points');

    totalPointsDisplay.textContent = totalPointsPerdus;

    pointInput.value = 1;
    

    classeInput.value = 1;

    dateContravention.value = today

    
    
    var resultItem = document.createElement("p");
    resultItem.innerText = contravention.printContravention();
    resultsDiv.appendChild(resultItem);

  }

  
});


function clearInfractions() {
  totalPointsPerdus = 0;
  numContraventions = 0;

  listContraventions = []

  var resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""



  const totalPointsDisplay = document.getElementById('total-points');
  totalPointsDisplay.textContent = totalPointsPerdus;

  addInfractionButton.disabled = false;

  pointsEpuisesMessage = document.getElementById("points-epuises")

  if (pointsEpuisesMessage) {
      formDiv.removeChild(pointsEpuisesMessage)
  }
}

resetInfractionButton.addEventListener('click', clearInfractions);

submitInfractionButton.addEventListener('click', () => {

  var totalPoints = 12 - totalPointsPerdus
  
  clearInfractions();

  inputDiv.innerHTML = "";

  var pointsRestant = document.createElement("p");
  pointsRestant.innerText = "Il vous reste " + (12 - totalPoints) + " points.";

  document.body.appendChild(pointsRestant)



});