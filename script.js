// Quiz de sustentabilidade com 5 perguntas
const quizQuestions = [
  {
    question: "Qual prática ajuda a economizar água na agricultura?",
    options: [
      "Irrigar em excesso todos os dias",
      "Usar sistemas de irrigação por gotejamento",
      "Deixar a água correr livremente",
      "Regar apenas à noite para molhar mais"
    ],
    answer: 1
  },
  {
    question: "Por que a preservação da biodiversidade é importante?",
    options: [
      "Aumenta o uso de pesticidas",
      "Melhora a saúde do solo e protege espécies",
      "Faz o campo parecer mais bonito",
      "Reduz a produção agrícola"
    ],
    answer: 1
  },
  {
    question: "O que é agricultura de precisão?",
    options: [
      "Aplicar recursos exatamente onde são necessários",
      "Plantio sem planejamento",
      "Cortar todas as plantas para aumentar a produção",
      "Usar sempre a mesma técnica"
    ],
    answer: 0
  },
  {
    question: "Como reduzir o desperdício de alimentos?",
    options: [
      "Planejar consumo e reaproveitar partes saudáveis",
      "Descartar alimentos ainda bons",
      "Comprar mais do que precisa",
      "Usar embalagens desnecessárias"
    ],
    answer: 0
  },
  {
    question: "Qual atitude ajuda quem não está no campo?",
    options: [
      "Valorizar produtos locais e consumir com consciência",
      "Ignorar a origem do alimento",
      "Comprar sempre os mais baratos",
      "Apoiar apenas produtos importados"
    ],
    answer: 0
  }
];

const quizForm = document.getElementById("quiz-form");
const quizQuestionsContainer = document.getElementById("quiz-questions");
const quizResult = document.getElementById("quiz-result");

// Função para criar as perguntas do quiz no HTML
function renderQuiz() {
  quizQuestions.forEach((item, index) => {
    const questionCard = document.createElement("div");
    questionCard.className = "question-card";

    const questionTitle = document.createElement("h3");
    questionTitle.textContent = `${index + 1}. ${item.question}`;
    questionCard.appendChild(questionTitle);

    const optionsContainer = document.createElement("div");
    optionsContainer.className = "options";

    item.options.forEach((optionText, optionIndex) => {
      const optionLabel = document.createElement("label");
      optionLabel.className = "option";
      optionLabel.setAttribute("for", `q${index}-opt${optionIndex}`);

      const optionInput = document.createElement("input");
      optionInput.type = "radio";
      optionInput.name = `question-${index}`;
      optionInput.id = `q${index}-opt${optionIndex}`;
      optionInput.value = optionIndex;
      optionInput.required = true;

      const optionSpan = document.createElement("span");
      optionSpan.textContent = optionText;

      optionLabel.appendChild(optionInput);
      optionLabel.appendChild(optionSpan);
      optionsContainer.appendChild(optionLabel);
    });

    questionCard.appendChild(optionsContainer);
    quizQuestionsContainer.appendChild(questionCard);
  });
}

// Mostrar resultado do quiz com mensagem personalizada
function showQuizResult(score) {
  const percentage = Math.round((score / quizQuestions.length) * 100);
  let message = "Ótimo trabalho! Você está atento às práticas sustentáveis.";

  if (percentage <= 40) {
    message = "Continue aprendendo! Cada passo conta para um agro mais sustentável.";
  } else if (percentage <= 80) {
    message = "Muito bem! Você já sabe bastante e pode continuar se inspirando.";
  }

  quizResult.textContent = `Você acertou ${score} de ${quizQuestions.length} perguntas (${percentage}%). ${message}`;
}

// Função que avalia as respostas quando o formulário é enviado
function handleQuizSubmit(event) {
  event.preventDefault();
  let score = 0;

  quizQuestions.forEach((item, questionIndex) => {
    const selected = document.querySelector(`input[name="question-${questionIndex}"]:checked`);
    if (selected && Number(selected.value) === item.answer) {
      score += 1;
    }
  });

  showQuizResult(score);
}

// Observador para animações suaves ao rolar a página
const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach((el) => observer.observe(el));

// Configurar rolagem suave por links de navegação
document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Inicializa o conteúdo do quiz e o listener do formulário
renderQuiz();
quizForm.addEventListener("submit", handleQuizSubmit);
