import{ auth } from "../config/firebase.js";
import{ signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js"

const inputEmail = document.getElementById('email');
const inputSenha = document.getElementById('senha');
const btnEntrar = document.getElementById('entrar');

async function fazerLogin(event) {
    event.preventDefault();

    const email = inputEmail.value;
    const senha = inputSenha.value;

    if(email === '' || senha === ''){
        alert(`Por favor, preencha os campos!`);
        return;
    }

    try {
        const cred = await signInWithEmailAndPassword(auth, email, senha);
        const usuarioLogado = cred.user;
        console.log(`Login feito com sucesso! Dados do usuário:${usuarioLogado}`);
        window.location.href = "../index.html";
        alert(`Bem-vindo(a)!`);
    } catch (error) {
        console.error(`Código do erro: ${error.code}`);

        if(error.code === 'auth/invalid-credential'){
            alert(`email ou senha incorreto`);
        }else if(error.code === 'auth/invalid-email'){
            alert(`O formato do e-mail é inválido`);
        }else{
            alert(`Ocorreu um erro ao fazer login. Tente novamente mais tarde`);
        }
    }
}
btnEntrar.addEventListener('click', fazerLogin);