import { auth, db, storage } from "../config/firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-storage.js";

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
        window.location.href = "../index.html";
    }
});

if(btnSair){
    btnSair.addEventListener('click', (event) => {
        event.preventDefault();

        sessionStorage.setItem('saindo_voluntariamente', 'true');
        signOut(auth).then(() => {
            alert("Usuário deslogado com sucesso!");
            window.location.href = "../index.html";
        }).catch((error) => {
            console.error("Erro ao deslogar:", error);
            alert("Ocorreu um erro ao sair.");
        });
    });
}

window.textoFixo = function(input, prefixo){
    if(!input.value.startsWith(prefixo)){
        input.value = prefixo;
    }
}

const formCadastro = document.querySelector('.form-cadastro');

if(formCadastro) {
    formCadastro.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        const fileInput = document.getElementById('file-upload');
        const imagemFile = fileInput.files[0];

        if (!imagemFile) {
            alert("Por favor, selecione uma imagem para o evento!");
            return;
        }

        const btnEnviar = document.querySelector('.btn-enviar');
        const textoOriginalBotao = btnEnviar.innerText;
        btnEnviar.innerText = "ENVIANDO...";
        btnEnviar.disabled = true; 

        try {
            const nomeArquivo = `eventos/${Date.now()}_${imagemFile.name}`;
            const storageRef = ref(storage, nomeArquivo);
            
            await uploadBytes(storageRef, imagemFile);
            const urlImagem = await getDownloadURL(storageRef);

            const novoEvento = {
                nome: document.getElementById('nome-evento').value,
                descricao: document.getElementById('desc-evento').value,
                imagem_url: urlImagem,
                data_inicio: document.getElementById('data-inicio').value,
                data_fim: document.getElementById('data-fim').value,
                local: document.getElementById('local').value,
                destino: document.getElementById('destino').value,
                hora_inicio: document.getElementById('hora-inicio').value,
                desc_hora_inicio: document.getElementById('desc-hora-inicio').value,
                hora_fim: document.getElementById('hora-fim').value,
                desc_hora_fim: document.getElementById('desc-hora-fim').value,
                recomendacao_1: document.querySelector('input[name="rec1"]').value,
                recomendacao_2: document.querySelector('input[name="rec2"]').value,
                data_criacao: new Date()
            };
            await addDoc(collection(db, "eventos"), novoEvento);

            alert("Evento cadastrado com sucesso!");
            
            formCadastro.reset();

        } catch (error) {
            console.error("Erro ao cadastrar evento:", error);
            alert("Ocorreu um erro ao salvar o evento. Tente novamente.");
        } finally {
            btnEnviar.innerText = textoOriginalBotao;
            btnEnviar.disabled = false;
        }
    });
}