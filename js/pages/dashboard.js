import { auth } from "../config/firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const emailsPermitidos = [
    "claracruz.alves908@gmail.com"
]

onAuthStateChanged(auth, (user) => {
    if(user){
        if(emailsPermitidos.includes(user.email)){
            console.log(`Acesso Autorizado! Bem-vindo(a), ${user.email}`);
        }else{
            alert(`Acesso negado! Seu e-mail não tem autorização de administrador`);
            signOut(auth).then(()=>{
                window.location.href = "../pages/login.html"
            });
        }
    }else{
        alert(`Você precisa fazer login primeiro!`);
        window.location.href = "../pages/login.html";
    }
});