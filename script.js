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
            <div class="pokemon-card" id="pokemon-card-${index}" onclick="toggleOverlay()">
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
    
    // eine function um mein overlay zu togglen

    function toggleOverlay() {
        const overlay = document.getElementById('overlay');
        overlay.classList.toggle('d_none');  // Fügt die Klasse hinzu oder entfernt sie
        renderOverlay();
    }

    // als nächstes will ich den inhalt des overlays bestimmen das mache ich durch eine template die gerendert werden soll

    function getOverlayTemplate() {
        return /*html*/`
            <div class="overlay-card">
                <div><h2>id</h2><h2>name</h2><button>x</button></div>
                <img src="" alt="">
                <div>types</div>
                <div><h3>hp:</h3><p>hp in number</p></div>
                <div><h3>attack:</h3><p>attack in number</p></div>
                <div><h3>defense:</h3><p>defense in number</p></div>
                <div><button>&larr;</button><button>&rarr;</button></div>
            </div>
        `
    }

    function renderOverlay() {
        let overlayRef = document.getElementById('overlay-content');
        overlayRef.innerHTML = '';
        overlayRef.innerHTML += getOverlayTemplate();
    }