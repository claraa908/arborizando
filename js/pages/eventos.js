async function carregarTemplate(idContainer, caminhoHTML) {
    try {
        const response = await fetch(caminhoHTML);
        if (response.ok) {
            const html = await response.text();
            document.getElementById(idContainer).innerHTML = html;
            
            if (idContainer === "carrossel-container-placeholder") {
                const script = document.createElement('script');
                script.src = "../templates/carrossel/carrossel.js";
                document.body.appendChild(script);
            }
        }
    } catch (error) {
        console.error(`Erro ao carregar o template: ${caminhoHTML}`, error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    carregarTemplate("navbar-container", "../templates/navbar/navbar.html");
    carregarTemplate("carrossel-container-placeholder", "../templates/carrossel/carrossel.html");
    carregarTemplate("rodape-container", "../templates/rodape/rodape.html"); 
});