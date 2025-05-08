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
            allPokemon[i].types = getTypes(data);               // ich speichere die types in meinem array allpokemon an der stelle types und rufe dafür die function mit dem richtigen parameter aus
            allPokemon[i].stats = getStats(data);
        }
        console.log(allPokemon);
    }


    // jetzt möchte ich rendern solange wie mein array ist und auf folgende daten zugreifen --> name und url von dem Bild darüber zeigen wir dann noch den aktuellen index +1 an da wir von 1 starten

    function renderPokemonCards() {
        let PokemonContentRef = document.getElementById('pokemon-cards');
        for (let i = 0; i < allPokemon.length; i++) {
            PokemonContentRef.innerHTML += getPokemonCardTemplate(i);
            renderCardNumber(i);
            renderCardName(i);
            renderCardImg(i);
            renderTypes(i);
            setCardBackgroundColor(i);
        }
    }

    // die template mit der wir die cards hinzufügen
    function getPokemonCardTemplate(index) {
        return /*html*/`
            <div class="pokemon-card" id="pokemon-card-${index}" onclick="openOverlay(${index})">
                <div class="number-name-card"><h3 id="card-number-${index}">number</h3><h3 id="card-name-${index}">name</h3></div>
                <img id="card-img-${index}" src="" alt="Pokemon Bild">
                <div class="card-types-div" id="card-types-${index}"></div>
            </div>
        `
        
    }

    // eine function die beim öffnen der seite onload auf den body geladen wird

    async function init() {
        await getAndStoreData();
        renderPokemonCards();
    }

    // ich brauche nun functionen um die infos aus meinem array in mein projekt zu rendern
    function renderCardNumber(index) {
        const cardNumberRef = document.getElementById(`card-number-${index}`);
        cardNumberRef.innerHTML = index + 1;
    }

    function renderCardName(index) {
        const cardNameRef = document.getElementById(`card-name-${index}`);
        const name = allPokemon[index].name.toUpperCase();
        cardNameRef.innerHTML = name;
    }

    function renderCardImg(index) {
        const cardImgRef = document.getElementById(`card-img-${index}`);
        cardImgRef.src = allPokemon[index].image;
    }

    // ich möchte eine function mit der ich die unterschiedlichen daten abfragen kann z.b. types height weight etc

    function getTypes(data) {                               // ich übernehme data aus getAllinfo()
        let types = [];                                     // ich erstelle ein array namens types in dem ich die types der jeweiligen pokemon speichern will
            for (let j = 0; j < data.types.length; j++) {   // ich wiederhole in data.types solange bis es keine einträge mehr gibt 
                types.push(data.types[j].type.name);        // ich pushe meinem array die value die ich mir gezogen habe
            }
            return types;                                   // ich returne den wert und füge ihn bei getAllInfo allPokemon hinzu
    }

    // jetzt rbauche ich eine fcuntion um die types auch zu rendern in meiner template function 

    function renderTypes(index) {
        const typesRef = document.getElementById(`card-types-${index}`);
        typesRef.innerHTML = '';
        for (let i = 0; i < allPokemon[index].types.length; i++) {
            typesRef.innerHTML += getTypesTemplate(allPokemon[index].types[i]);
        }
    }

    function getTypesTemplate(type){
        return /*html*/`
            <p class="card-types">${type}</p>
        `
    }

    // als nächstes möchte ich die bg farbe anpassen
    const typeColors = {                // ich habe eine variable den gebe ich die keys und values als farben
        normal:    '#A8A77A',
        fire:      '#EE8130',
        water:     '#6390F0',
        electric:  '#F7D02C',
        grass:     '#7AC74C',
        ice:       '#96D9D6',
        fighting:  '#C22E28',
        poison:    '#A33EA1',
        ground:    '#E2BF65',
        flying:    '#A98FF3',
        psychic:   '#F95587',
        bug:       '#A6B91A',
        rock:      '#B6A136',
        ghost:     '#735797',
        dragon:    '#6F35FC',
        dark:      '#705746',
        steel:     '#B7B7CE',
        fairy:     '#D685AD'
    };


    function setCardBackgroundColor(index) {
    const cardRef = document.getElementById(`pokemon-card-${index}`);  // ich nutze den index um auch immer bei der richtigen card zu sein
    const firstType = allPokemon[index].types[0];                      // ichfrage den ersten type also an der stelle 0 im array ab --> das gibt mir den key für type colors
    const color = typeColors[firstType];                               // ich gebe meienr variablen den wert (den colorcode --> also die value) first type also dem key entsprechend
    cardRef.style.backgroundColor = color;                             // ich verändere das css von der backgroundcolor mit dem colorcode aus meinem objekt
    }
    

    // als nächstes will ich den inhalt des overlays bestimmen das mache ich durch eine template die gerendert werden soll

    function getOverlayTemplate(index) {
        return /*html*/`
            <div class="overlay-card" id="overlay-card-${index}">
                <div class="id-name-overlay"><h2 id="overlay-number-${index}">id</h2><h2 id="overlay-name-${index}">name</h2><button class="button" onclick="closeOverlay()">X</button></div>
                <div class="overlay-img-position"><img id="overlay-img-${index}" src="" alt=""></div>
                <div class="card-types-div" id="overlay-types-${index}">types</div>
                <div class="overlay-stats"><h3>hp:</h3><p id="overlay-hp-${index}">hp in number</p></div>
                <div class="overlay-stats"><h3>attack:</h3><p id="overlay-attack-${index}">attack in number</p></div>
                <div class="overlay-stats"><h3>defense:</h3><p id="overlay-defense-${index}">defense in number</p></div>
                <div class="overlay-stats"><button class="button" onclick="moveLeft(${index})">&larr;</button><button class="button" onclick="moveRight(${index})">&rarr;</button></div>
            </div>
        `
    }

    function renderOverlay(index) {
        let overlayRef = document.getElementById('overlay-content');
        overlayRef.innerHTML = '';
        overlayRef.innerHTML += getOverlayTemplate(index);
        renderOverlayNumber(index);
        renderOverlayName(index);
        renderOverlayImg(index);
        renderOverlayTypes(index);
        setOverlayBackgroundColor(index);
        renderOverlayHp(index);
        renderOverlayAttack(index);
        renderOverlayDefense(index);
    }

    function openOverlay(index) {
        const overlay = document.getElementById('overlay');
        overlay.classList.remove('overlay-hidden');
        overlay.classList.add('overlay-visible');
        renderOverlay(index);
    }

    function closeOverlay() {
        const overlay = document.getElementById('overlay');
        overlay.classList.remove('overlay-visible');
        overlay.classList.add('overlay-hidden');
    }

    // jetzt brauche ich wieder render functionen um die elemtne zu rendern

    function renderOverlayNumber(index) {
        const cardNumberRef = document.getElementById(`overlay-number-${index}`);
        cardNumberRef.innerHTML = index + 1;
    }

    function renderOverlayName(index) {
        const cardNameRef = document.getElementById(`overlay-name-${index}`);
        const name = allPokemon[index].name.toUpperCase();
        cardNameRef.innerHTML = name;
    }

    function renderOverlayImg(index) {
        const cardImgRef = document.getElementById(`overlay-img-${index}`);
        cardImgRef.src = allPokemon[index].image;
    }

    // eine function um die types auch im overlay zu rendern

    function renderOverlayTypes(index) {
        const typesRef = document.getElementById(`overlay-types-${index}`);
        typesRef.innerHTML = '';
        for (let i = 0; i < allPokemon[index].types.length; i++) {
            typesRef.innerHTML += getTypesTemplate(allPokemon[index].types[i]);
        }
    }

    // eine function um die background color anzupassen
    function setOverlayBackgroundColor(index) {
        const cardRef = document.getElementById(`overlay-card-${index}`);  
        const firstType = allPokemon[index].types[0];                      
        const color = typeColors[firstType];                               
        cardRef.style.backgroundColor = color;                             
    }

    // eine function um auf stats: zuzugreifen in der api also auf attack hp defense etc
    function getStats(data) {
        let stats = [];
        for (let j = 0; j < data.stats.length; j++) {
            stats.push({
                name: data.stats[j].stat.name,
                value: data.stats[j].base_stat
            });
        }
        return stats;
    }
    
    // functionen um hp attack und defense stats zu rendern
    function renderOverlayHp(index) {
        const hpRef = document.getElementById(`overlay-hp-${index}`);
        hpRef.innerHTML = allPokemon[index].stats[0].value;                         // kann ich so amchen da sich hp immer am index 1 also an der position 0 befinde genau wie attack immer auf 1 und defense immer auf 2
    }

    function renderOverlayAttack(index) {
        const attackRef = document.getElementById(`overlay-attack-${index}`);
        attackRef.innerHTML = allPokemon[index].stats[1].value;
    }

    function renderOverlayDefense(index) {
        const defenseRef = document.getElementById(`overlay-defense-${index}`);
        defenseRef.innerHTML = allPokemon[index].stats[2].value;
    }

    // jetzt brauche ich zwei function um einmal mich nach rechts zu bewegen und einmal um mich nach links zu bewegen

    function moveRight(i) {
        if (i >= allPokemon.length - 1) { // Wenn i gleich oder größer als das letzte Element ist
            i = 0; // setzt i auf das erste Element zurück
        } else {
            i = i + 1; // geht zum nächsten Element
        }
        renderOverlay(i);
    }

    function moveLeft(i) {
        if (i === 0) { // Wenn i gleich 0 ist
            renderOverlay(allPokemon.length - 1); // setzt i auf das letzte Element zurück
        
        } else {
            renderOverlay(i-1); // geht zum voherigen Element
        }
    }

    // eine cuntion mit der ich nach pokemon suchen kann
    function searchPokemon() {
        const searchInput = document.getElementById('search-input').value.toLowerCase();
        const searchResults = allPokemon.filter(pokemon => 
            pokemon.name.toLowerCase().startsWith(searchInput)
        );
    
        const container = document.getElementById('pokemon-cards');
        container.innerHTML = ''; 
    
        for (let i = 0; i < searchResults.length; i++) {
            const index = allPokemon.indexOf(searchResults[i]);
            container.innerHTML += getPokemonCardTemplate(index);
            renderCardNumber(index);
            renderCardName(index);
            renderCardImg(index);
            renderTypes(index);
            setCardBackgroundColor(index);
        }
    }