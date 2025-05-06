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
    }

    // eine function um alle daten zu den pokemons zu bekommen
    async function getAllInfo() {
        for (let i = 0; i < allPokemon.length; i++) {
            const url = allPokemon[i].url;
            const response = await fetch(url);
            const data = await response.json();
            allPokemon[i].image = data.sprites.front_default;
        }
        console.log(allPokemon);
    }