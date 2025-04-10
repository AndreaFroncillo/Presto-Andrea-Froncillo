let opener = document.querySelector('.opener');

let circle = document.querySelector('.circle');

let teachers = [
    {name: 'Matteo', description: 'Docente frontend di Hackademy 69', url: 'https://cdn.pixabay.com/photo/2022/02/10/12/01/teacher-7005171_1280.png'},
    {name: 'Marco', description: 'Docente frontend  e responsabile di Hackademy', url: 'https://cdn.pixabay.com/photo/2015/01/22/14/47/businessman-607788_1280.png'},
    {name: 'Nicola', description: 'Docente frontend e noto sex-symbol', url: 'https://cdn.pixabay.com/photo/2016/03/27/17/42/man-1283235_1280.jpg'},
    {name: 'Davide', description: 'Docente frontend e giocatore di ruolo', url: 'https://cdn.pixabay.com/photo/2015/01/22/15/12/businessman-607831_1280.png'}
];

teachers.forEach((docente)=>{
    let div = document.createElement('div');
    div.classList.add('moved');
    div.style.backgroundImage = `url(${docente.url})`
    circle.appendChild(div)

})

let movedDivs = document.querySelectorAll('.moved');

let check = false;

let flipCard = document.querySelector('.flip-card');

opener.addEventListener('click', ()=>{
    if(check == false){
        opener.style.transform = `rotate(45deg)`;
        movedDivs.forEach((moved, i)=>{
            let angle = (360 * i) / movedDivs.length;
            moved.style.transform =`rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`;
        });
        check = true;
    }else{
        check = false;
        opener.style.transform = ``;
        movedDivs.forEach((moved, i)=>{
            moved.style.transform =``;
        });
        flipCard.classList.add('d-none')
    }
});

let innerFace = document.querySelector('.inner-face');
let cardName = document.querySelector('#cardName');
let cardDescription = document.querySelector('#cardDescription');



movedDivs.forEach((moved, i)=>{
    moved.addEventListener('click',()=>{
        flipCard.classList.remove('d-none');
        let docente = teachers[i];
        innerFace.style.backgroundImage = `url(${docente.url})`;
        cardName.innerHTML = docente.name;
        cardDescription.innerHTML = docente.description;
    });
});


