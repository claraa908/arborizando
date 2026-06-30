import { auth } from "../config/firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const emailsPermitidos = [
    "adm@gmail.com"
]

const btnSair = document.getElementById("btn-sair");
onAuthStateChanged(auth, (user) => {
    if(user){
        if(!emailsPermitidos.includes(user.email)){
            alert(`Acesso negado! Seu e-mail não tem autorização de administrador`);
            signOut(auth).then(()=>{
                window.location.href = "../pages/login.html"
            });
        }
    }else{
        if(!sessionStorage.getItem('saindo_voluntariamente')){
            alert(`Precisa de iniciar sessão primeiro!`);
        } else {
            sessionStorage.removeItem('saindo_voluntariamente');
        }
        window.location.href = "../pages/login.html";
    }
});

if(btnSair){
    btnSair.addEventListener('click', (event) => {
        event.preventDefault();

        sessionStorage.setItem('saindo_voluntariamente', 'true');
        signOut(auth).then(() => {
            console.log("Usuário deslogado com sucesso!");
            window.location.href = "../pages/login.html";
        }).catch((error) => {
            console.error("Erro ao deslogar:", error);
            alert("Ocorreu um erro ao sair.");
        });
    });
}