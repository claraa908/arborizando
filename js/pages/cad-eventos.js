import { auth } from "../config/firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const emailsPermitidos = [
    "claracruz.alves908@gmail.com"
]

onAuthStateChanged(auth, (user) => {
    if(user){
        if(!emailsPermitidos.includes(user.email)){
            alert(`Acesso negado! Seu e-mail não tem autorização de administrador`);
            signOut(auth).then(()=>{
                window.location.href = "../pages/login.html"
            });
        }
    }else{
        if(!window.location.pathname.includes("login.html")){
            alert(`Você precisa fazer login primeiro!`);
            window.location.href = "../pages/login.html";
        }
    }
});

function textoFixo(input){
    const naoEsq = "Não esqueça: ";
    const use = "Use: ";
    if(!input.value.startsWith("Não esqueça: ")){
        input.value = naoEsq;
    }else if(!input.value.startsWith("Use: ")){
        input.value = use;
    }
}