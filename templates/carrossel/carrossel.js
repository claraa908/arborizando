const imagens = document.querySelectorAll(".carrossel-imagem");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let currentIndex = 0;
let tempoCarrossel;

function showImage(index) {
    imagens.forEach(img => img.classList.remove("active"));

    if (index >= imagens.length) currentIndex = 0;
    else if (index < 0) currentIndex = imagens.length - 1;
    else currentIndex = index;

    imagens[currentIndex].classList.add("active");

}

function nextImage() { showImage(currentIndex + 1); }
function prevImage() { showImage(currentIndex - 1); }

function startAutoSlide() {
    tempoCarrossel = setInterval(nextImage, 4000); 
}

function resetTimer() {
    clearInterval(tempoCarrossel);
    startAutoSlide();
}

if (nextBtn) nextBtn.addEventListener("click", () => { nextImage(); resetTimer(); });
if (prevBtn) prevBtn.addEventListener("click", () => { prevImage(); resetTimer(); });

startAutoSlide();