//momentane Pokemon id (im Pokedex)
let currentPokemonId = 1;

//Funktion um Daten aus der Pokemon API darzustellen
async function fetchData(currentPokemonId) {
    try{
        //speichert die Daten von dem Input in einer Variable
        let inputValue = document.getElementById("pokemonName").value;
        let identifier;

        //schaut, ob der Input eine Id, ein Name oder nicht vorhanden ist
        if (!inputValue){
            identifier = currentPokemonId;
        }
        else if (isNaN(inputValue)){
            identifier = inputValue.toLowerCase();
        }
        else if(!isNaN(inputValue)){
            identifier = inputValue;
        }

        //speichern der Daten der HTML Elemente in Variablen
        const imgElement = document.getElementById("pokemonSprite");
        const shinyImgElement = document.getElementById("shinyPokemonSprite");
        const pkmName = document.getElementById("pkmName");
        const pkmType = document.getElementById("pkmType");
        const pkmId = document.getElementById("pkmId");

        //extrahiert Daten von der Pokemon API und gibt einen Error, wenn die Extrahierung nicht erfolgreich war
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        const data = await response.json();
        currentPokemonId = data.id;

        const baseStatData = data.stats.map(element => element.base_stat);
        const tableList = document.querySelectorAll("td");

        //setzt die Daten für die base Stats der Pokemon in eine Tabelle
        tableList[0].textContent = baseStatData[0];
        tableList[1].textContent = baseStatData[1];
        tableList[2].textContent = baseStatData[2];
        tableList[3].textContent = baseStatData[3];
        tableList[4].textContent = baseStatData[4];
        tableList[5].textContent = baseStatData[5];

        //gibt den anderen HTML Elementen Werte und Style
        imgElement.src = data.sprites.front_default;
        imgElement.style.display = "block";
        shinyImgElement.src = data.sprites.front_shiny;
        shinyImgElement.style.display = "block";
        pkmName.textContent = `Name: ${data.name}`;
        pkmType.textContent = `Types: ${data.types.map(element => element.type.name)}`;
        pkmId.textContent = `Id: ${data.id}`;
        
        //sorgt dafür, dass nach Eingabe eines Werts das Inputfeld wieder leer ist
        document.getElementById("pokemonName").value = "";

        //gibt den Buttons, die die Pokemon Id inkremtieren und dekrementieren können, Funktion
        document.getElementById("prevBtn").onclick = function () {
            if (currentPokemonId > 1) {
                fetchData(currentPokemonId - 1);
            }
        };
        document.getElementById("nextBtn").onclick = function () {
            fetchData(currentPokemonId + 1);
        };
    }
    catch(error){
        console.error(error);
    }
}
