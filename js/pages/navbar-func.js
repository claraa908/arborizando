// Evento do menu reduzido
const btnMenu = document.getElementById('btn-menu');
const navbar = document.querySelector('.navbar-lateral');

btnMenu.addEventListener('click', () => {
    navbar.classList.toggle('recolhida');
});

const btnEvento = document.getElementById('btn-evento');
const submenuEvento = document.getElementById('submenu-evento');

if(btnEvento){
    btnEvento.addEventListener('click', (event)=>{
        event.preventDefault();
        submenuEvento.classList.toggle('aberto');
        btnEvento.classList.toggle('ativo');
    })
}

const btnConfig = document.getElementById('btn-config');
const dropdownConfig = document.getElementById('dropdown-config');

if(btnConfig && dropdownConfig){
    btnConfig.addEventListener('click', (event)=>{
        event.stopPropagation();
        dropdownConfig.classList.toggle('aberto');
        btnConfig.classList.toggle('ativo')
    })

    document.addEventListener('click', (event)=>{
        if (!btnConfig.contains(event.target)){
            dropdownConfig.classList.remove('aberto');
            btnConfig.classList.remove('ativo')
        }
    })
}