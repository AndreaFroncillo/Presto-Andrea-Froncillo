let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logoNavbar = document.querySelector('#logoNavbar');
let lightSaber = document.getElementById('lightSaber');
let collapse = document.querySelector('#collapse');
let firstNumber = document.getElementById('firstNumber');
let secondNumber = document.getElementById('secondNumber');
let thirdNumber = document.getElementById('thirdNumber');
let check = false;
let confirm = true;


window.addEventListener('scroll', ()=>{
    let scrolled = window.scrollY;
    
    if(scrolled > 0){
        navbar.classList.remove('bg-black');
        navbar.classList.add('bg-yellow');
        collapse.classList.remove('bg-black');
        collapse.classList.add('bg-yellow');
        navbar.style.height = '70px';
        links.forEach((link)=>{
            link.style.color = 'var(--black)';
        });
        logoNavbar.src = './media/logo-b.png';
        lightSaber.src = './media/spada-b.png';
    }else{
        navbar.classList.remove('bg-yellow');
        navbar.classList.add('bg-black');
        collapse.classList.remove('bg-yellow');
        collapse.classList.add('bg-black');
        navbar.style.height = '140px';
        links.forEach((link)=>{
            link.style.color = 'var(--yellow)';
        });
        logoNavbar.src = './media/logo-y.png';
        lightSaber.src = './media/spada-y.png';
    };
});

lightSaber.addEventListener('click', ()=>{
    if(check == false){
        lightSaber.style.transform = `rotate(-90deg)`;
        check = true;
    }else{
        lightSaber.style.transform = `rotate(0deg)`;
        check = false;
    };
    
});


// Chiamate Asincrone
// setInterval(): crea un loop infinito in cui possiamo gestire la durata delle singole iterazioni
// Il setInterval è una funzione che vuole due parametri. Il primo parametro è la callback. Il secodno è l'intervallo di tempo che deve passare tra un' iterazione e l'altra (espressi in millisecondi: 1000 sarebbe un secodno, 1 sarebbe 1 millisecondo)
// clearInterval(): ha lo scopo di pulire un intervallo, quindi interromperlo

/* let counter = 0

let interval = setInterval(()=>{
    if(counter < 100){
        counter++;
        console.log(counter);
    }else{
        console.log('Adesso mi fermo');
        clearInterval(interval);
    }
}, 1); */


function createInterval(n, el, time){
    let counter = 0;
    let interval = setInterval(()=>{
        if(counter < n){
            counter++;
            el.innerHTML = counter;
        }else{
            clearInterval(interval);
        };
    }, time);

    // setTimeoute: Fa partire un blocco di istruzioni dopo tot di secondi
    setTimeout(()=>{
        confirm = true;
    }, 8000);
};

/* createInterval(100, firstNumber, 100);
createInterval(200, secondNumber, 50);
createInterval(300, thirdNumber, 20); */


// IntersectionObserver: è una Classe del broswer che si occupa di far scattare una funzione nel momento in cui sul broswer sono visibili gli elementi HTML che noi gli indichiamo
// new: keyword che mi permette di generare un oggetto partedno da una classe

let observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting && confirm){
            createInterval(100, firstNumber, 100);
            createInterval(200, secondNumber, 50);
            createInterval(300, thirdNumber, 20);
            confirm = false;
        };
    });
});

observer.observe(firstNumber);



// Swiper
let reviews = [
    {user: `Andrea`, description: `Il piu' bel sito di annunci del mondo`, rank: 5},
    {user: `Giovanni`, description: `Veramente non mi da di niente`, rank: 1},
    {user: `Matteo`, description: `Mi piace, tranne per Star Wars`, rank: 3},
    {user: `Michele`, description: `Star Wars ci sta di brutto`, rank: 4}
]

let swiperWrapper = document.querySelector('.swiper-wrapper');

reviews.forEach((recensione)=>{
    let div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
    <div class="card-review">
        <p class="lead text-center">${recensione.description}</p>
        <p class="h4 text-center">${recensione.user}</p>
        <div class="d-flex justify-content-center star">

        </div>
    </div>`

    swiperWrapper.appendChild(div);
});

let stars = document.querySelectorAll('.star');
// <i class="fa-solid fa-star"></i>
stars.forEach((star, index)=>{
    for(let i = 1; i <= reviews[index].rank; i++){
        let icon = document.createElement('i');
        icon.classList.add('fa-solid', 'fa-star');
        star.appendChild(icon);
    }

    let difference = 5 - reviews[index].rank;
    for(let i = 1; i <= difference; i++){
        let icon = document.createElement('i');
        icon.classList.add('fa-regular', 'fa-star');
        star.appendChild(icon);
    }
})


// Swiper Inizializzazione (va fatta come ultima cosa questa funzione riguardo allo swiper)
const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });






