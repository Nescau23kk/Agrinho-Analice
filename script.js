/* JavaScript simples para o site iniciante */

const quizButton = document.getElementById("quiz-button");
const imageButton = document.getElementById("image-button");
const searchButton = document.getElementById("search-button");
const tipText = document.getElementById("tip-text");
const quizPanel = document.getElementById("quiz-panel");
const imagePanel = document.getElementById("image-panel");
const searchPanel = document.getElementById("search-panel");
const quizFeedback = document.getElementById("quiz-feedback");
const searchInput = document.getElementById("search-input");
const searchGoButton = document.getElementById("search-go");

// Esconde todos os painéis de atividade.
function hidePanels() {
    quizPanel.classList.add("hidden-panel");
    imagePanel.classList.add("hidden-panel");
    searchPanel.classList.add("hidden-panel");
}

// Mostra um painel específico e atualiza a mensagem.
function showPanel(panel, message) {
    hidePanels();
    panel.classList.remove("hidden-panel");
    tipText.textContent = message;
}

// Mostra o painel do quiz.
function openQuiz() {
    showPanel(quizPanel, "Responda a pergunta do quiz abaixo.");
    quizFeedback.textContent = "";
}

// Mostra o painel da imagem.
function openImage() {
    showPanel(imagePanel, "Veja a imagem do Agrinho gerada para nossa ideia.");
}

// Mostra o painel de pesquisa.
function openSearch() {
    showPanel(searchPanel, "Digite um tema e clique em pesquisar.");
}

// Verifica a resposta do quiz e mostra um feedback simples.
function handleQuizAnswer(event) {
    const answer = event.target.dataset.answer;
    if (!answer) {
        return;
    }

    if (answer === "planta") {
        quizFeedback.textContent = "Muito bem! Plantar mais plantas ajuda o solo e o meio ambiente.";
    } else {
        quizFeedback.textContent = "Boa tentativa! Tente outra opção e pense em como cuidar do solo.";
    }
    }
    
    // Abre uma pesquisa no Google com o texto digitado.
    function searchInternet() {
        const query = searchInput.value.trim() || "Agrinho sustentável";
        const url = `https://google.com{encodeURIComponent(query)}`;
        window.open(url, "_blank");
    }
    
    function init() {
        hidePanels();
        quizButton.addEventListener("click", openQuiz);
        imageButton.addEventListener("click", openImage);
        searchButton.addEventListener("click", openSearch);
        quizPanel.addEventListener("click", handleQuizAnswer);
        searchGoButton.addEventListener("click", searchInternet);
    }
    
    init();
    