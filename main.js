let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logoNavbar = document.querySelector('#logoNavbar');

window.addEventListener('scroll', ()=>{
    let scrolled = window.scrollY;
    
    if(scrolled > 0){
        navbar.classList.remove('bg-black');
        navbar.classList.add('bg-yellow');
        navbar.style.height = '70px';
        links.forEach((link)=>{
            link.style.color = 'var(--black)';
            link.addEventListener('mouseover', ()=>{
                link.style.color = 'white';
            });
            link.addEventListener('mouseout', ()=>{
                link.style.color = 'var(--black)';
            });
        });
        logoNavbar.src = './media/logo-b.png';
    }else{
        navbar.classList.remove('bg-yellow');
        navbar.classList.add('bg-black');
        navbar.style.height = '140px';
        links.forEach((link)=>{
            link.style.color = 'var(--yellow)'
            link.addEventListener('mouseover', ()=>{
                link.style.color = 'white';
            });
            link.addEventListener('mouseout', ()=>{
                link.style.color = 'var(--yellow)';
            });
        });
        logoNavbar.src = './media/logo-y.png';
    };
});

