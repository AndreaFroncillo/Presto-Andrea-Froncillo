// .json: Javascript Object Notification. Particolare tipo di formato che serve per contenere dati complessi. ma all'interno del JSON in realtà quei dati sono dei tipi di dati primitivi

// API: chiavi che ci permettono di raggiungere un .json online

// fetch(): chiamata asincrona che ci permette di collegarci ad un JSON e da esso estrarne il dato sotto forma di PROMISE
// .then(): questo metodo permette di convertire la Promise nel dato Strutturale e di poterlo utilizzare su Javascript

// 1. fetch()= mi collego al json e ne ottengo una Promise
// 2. .then()= converto la Promise in un dato Strutturale JS
// 3. .then()= utilizzare il dato ottenuto

// .json(): metodo delle Promise che mi permette di convertirla in Oggetto JS

fetch('./annunci.json').then((response) => response.json()).then((data) => {
    data.sort((a,b)=> a.price - b.price)
    let radioWrapper = document.querySelector('#radioWrapper');
    let cardWrapper = document.querySelector('#cardWrapper');

    

    function radioCreate() {
        let categories = data.map((annuncio) => annuncio.category)
        console.log(categories);

        /*       let uniqueCategories = []
                categories.forEach((category)=>{
                    if(!uniqueCategories.includes(category)){
                        uniqueCategories.push(category)
                    }
                }) */

        // Set(): Classe che mi restituisce, partendo da un array, un nuovo oggetto di tipo Set il quale contiene solo valori univoci
        // Array.from(): mi permette di convertire un Array-like in un array

        let uniqueCategories = Array.from(new Set(categories));
        uniqueCategories.forEach((category) => {
            let div = document.createElement('div');
            div.classList.add('form-check')
            div.innerHTML = `
                <input class="form-check-input" type="radio" name="categories" id="${category}">
                <label class="form-check-label" for="${category}">
                    ${category}
                </label>
                `;
            radioWrapper.appendChild(div)
        })
    }
    radioCreate()

    function truncateWord(string){
        if(string.length > 15){
            return string.split(' ')[0] + '...';
        }else{
            return string;
        }
    }

    function showCards(array) {
        cardWrapper.innerHTML = '';
        array.forEach((annuncio,i) => {
            let div = document.createElement('div');
            div.classList.add('card-custom');
            div.innerHTML = `
            <img class="img-fluid img-card" src="https://picsum.photos/${300 + i}"
            <p class="h2" title="${annuncio.name}">${truncateWord(annuncio.name)}</p>
            <p class="h4">${annuncio.category}</p>
            <p class="lead">${annuncio.price} €</p>
            `;
            cardWrapper.appendChild(div)
        })
    }
    showCards(data)
    
    let radioButtons = document.querySelectorAll('.form-check-input');
    function filterByCategory(arr){
        // In questa funzione ho bisogno di ottenere un nuovo array partendo da data e gli elementi del nuovo array dovranno soddisfare la condizione per la quale la loro category sia uguale alla categoria che stiamo passando alla funzione

        // La categoria voglio trovarla partendo dalla lista di tutti i bottoni e usare il metodo .find() degli array su questa lista. La condizione da utilizzare è il bottone che possiede l'attributo checked

        let arrayFromNodeList = Array.from(radioButtons); // Trasforma un array-like in un array normale
        let button = arrayFromNodeList.find((button)=> button.checked);
        let categoria = button.id;
        
        // let categoria = Array.from(radioButtons).find((button)=> button.checked).id;

        if(categoria != 'All'){
            let filtered = arr.filter((annuncio)=> annuncio.category == categoria);
            return filtered;

        }else{
            return arr
        }

    }

    radioButtons.forEach((button)=>{
        button.addEventListener('click', ()=>{
            setPriceInput();
            globalFilter();
        })
    });
    
    let priceImput = document.querySelector('#priceImput')
    let priceValue = document.querySelector('#priceValue')

    function setPriceInput(){
        // Dopo aver catturato l'input voglio settare come proprietà max dello stesso il valore più alto tra i price di ogni prodotto.Per farlo avrò quindi bisogno di un array che contenga solo i prezzi, al quel punto lo ordino in maniera decrescente e prendermi l'elemento con il valore più alto

        let prices = filterByCategory(data).map((annuncio)=> +annuncio.price)
        prices.sort((a,b)=> a - b)
        let maxPrice = Math.ceil(prices.pop())
        priceImput.max = maxPrice
        priceImput.value = maxPrice
        priceValue.innerHTML = maxPrice
    }
    setPriceInput()

    function filterByPrice(arr){
        let filtered = arr.filter((annuncio)=> +annuncio.price <= priceImput.value);
        return filtered;
    }

    priceImput.addEventListener('input',()=>{
        priceValue.innerHTML = priceImput.value
        globalFilter();
    })

    let wordInput = document.querySelector('#wordInput')

    function filterByWord(arr){
        let filtered = arr.filter((annuncio)=> annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()))
        return filtered;
    }
    wordInput.addEventListener('input', ()=>{
        globalFilter();
    })

    // Quello di cui abbiamo bisogno è che afd ogni eveneto scattano tutti e tre le funzioni di filtro ma non siano applicate tutte e sull'array di data, bensì siano concatenate ed ognuna filtri il risultato della funzione di filtro precedente

    function globalFilter(){
        let filtraPerCategoria = filterByCategory(data); // Array filtrato per categoria
        let filtraPerPrezzo = filterByPrice(filtraPerCategoria); // Array filtrato sia per categoria che per prezzo
        let filtraPerParola = filterByWord(filtraPerPrezzo); // Array filtrato per categoria, prezzo e parola
        showCards(filtraPerParola);
    }
});



