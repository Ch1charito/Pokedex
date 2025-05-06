// ich brauche eine function um die daten von meiner api in zu speichern bzw abzurufen und diese dann auf meiner seite rendern zu lassen

// als erstes brauche ich also eine function die abruft
// danach eine function die zwischen speichert
// eine function mit der ich den zwischengespeicherten inhalt render

let allPokemon =[];                 // eine variable in der wir alle Pokemon-Daten -> name und urls speichern
console.log(allPokemon);

// !! WICHTIG: eine asynchrone function wird gebraucht damit wir fetchen also zugreifen können auf eine api
    async function getAndStoreData() {                      // eine asynchrone function mit der wir auf die api zugreifen
        const url = `https://pokeapi.co/api/v2/pokemon`;    // unsere url als variable zwischen gespeichert -> bleibt immer gleich
        const response = await fetch(url);                  // wir fetchen uns über die url und speichern in response wieder
        const data = await response.json();                 // wir wandeln unser response in ein JSON objekt und speichern das dann in data zwischen
        allPokemon = data.results;                          // wir geben unserer globalen variablen nur den teil results weil wir nur die namen und die weitern urls zu den restinfos der pokemon brauchen
        console.log(allPokemon);                            // wir lassen uns nun allPokemon als log anzeigen und sehen das es ein array ist
        await getAllInfo();                                 // fügt direkt alle infos beim ausführen hinzu
    }

    // eine function um alle daten zu den pokemons zu bekommen
    async function getAllInfo() {
        for (let i = 0; i < allPokemon.length; i++) {           // wir wiederholen solange wie der array allPokemon ist nachdem wir ihm die daten hinzugefügt haben
            const url = allPokemon[i].url;                      // wir geben als url die url an die an der jeweiligen stelle (dem index wo wir gerade in der schleife sind)
            const response = await fetch(url);                  // wir fetchen und die daten von der url
            const data = await response.json();                 // wir verwandeln das bekommen in ein JSON
            allPokemon[i].image = data.sprites.front_default;   // wir wollen nur die daten zu den bildern (später fügen wir dann noch daten wie height weight etc hinzu) und wollen sie als bei dem jewiligen pokemon als key image mit dem jeweiligen value hinzufügen
        }
        console.log(allPokemon);
    }


    // jetzt möchte ich rendern solange wie mein array ist und auf folgende daten zugreifen --> name und url von dem Bild darüber zeigen wir dann noch den aktuellen index +1 an da wir von 1 starten

    function renderPokemonCards() {
        let PokemonContentRef = document.getElementById('pokemon-cards');
        for (let i = 0; i < allPokemon.length; i++) {
            PokemonContentRef.innerHTML += getPokemonCardTemplate(i);
        }
    }

    // die template mit der wir die cards hinzufügen
    function getPokemonCardTemplate(index) {
        return /*html*/`
            <div>
                <div><p>number</p><h2>name</h2></div>
                <img src="" alt="">
                <div>hier kommt dann fähigkeiten rein</div>
            </div>
        `
        
    }

    // eine function die beim öffnen der seite onload auf den body geladen wird

    async function init() {
        await getAndStoreData();
        renderPokemonCards();
    }