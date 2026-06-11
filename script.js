const quizData = [
	{
		question: 'Qual prática ajuda a conservar o solo e reduzir erosão?',
		options: ['Desmatamento controlado', 'Plantio direto e cobertura vegetal', 'Uso intensivo de máquinas'],
		answer: 1,
		explanation: 'O plantio direto mantém o solo coberto e reduz a erosão, preservando nutrientes.'
	},
	{
		question: 'O que é compostagem?',
		options: ['Processo de transformar resíduos orgânicos em adubo', 'Queimar resíduos no campo', 'Usar apenas adubo químico'],
		answer: 0,
		explanation: 'Compostagem transforma restos orgânicos em adubo rico em nutrientes, reduzindo resíduos.'
	},
	{
		question: 'Por que a rotação de culturas é importante?',
		options: ['Aumenta pragas', 'Melhora a saúde do solo e reduz doenças', 'Diminui a diversidade de plantas'],
		answer: 1,
		explanation: 'A rotação evita o esgotamento de nutrientes e reduz pragas específicas de uma cultura.'
	},
	{
		question: 'Qual opção reduz uso de água na irrigação?',
		options: ['Irrigação por gotejamento', 'Irrigação por aspersão durante o dia', 'Irrigar com água de chuva direto'],
		answer: 0,
		explanation: 'O gotejamento fornece água diretamente às raízes, reduzindo perdas por evaporação.'
	},
	{
		question: 'O que é plantio consorciado?',
		options: ['Plantio de uma única espécie em grandes áreas', 'Combinação de culturas no mesmo espaço para benefício mútuo', 'Substituir culturas nativas por importadas'],
		answer: 1,
		explanation: 'Consórcio aproveita propriedades complementares de plantas, melhorando produtividade e solo.'
	}
];

const quizContainer = document.getElementById('quiz-container');
const quizBtn = document.getElementById('quiz-btn');
const progressBar = document.querySelector('.progress-bar');

function createElement(tag, attrs = {}, text = ''){
	const el = document.createElement(tag);
	Object.entries(attrs).forEach(([k,v])=> el.setAttribute(k,v));
	if(text) el.textContent = text;
	return el;
}

function renderQuiz(){
	quizContainer.innerHTML = '';
	let current = 0;
	let score = 0;

	const qWrap = createElement('div',{class:'quiz-wrap'});
	const qEl = createElement('div',{class:'question'});
	const opts = createElement('ul',{class:'options'});
	const expl = createElement('div',{class:'explanation'});
	const nav = createElement('div',{class:'quiz-nav'});

	const prevBtn = createElement('button',{class:'btn small','aria-label':'Anterior'}, 'Anterior');
	const nextBtn = createElement('button',{class:'btn small','aria-label':'Próxima'}, 'Próxima');
	const restartBtn = createElement('button',{class:'btn small'}, 'Refazer');

	prevBtn.addEventListener('click', ()=>{
		if(current>0){ current--; showQuestion(current); }
	});
	nextBtn.addEventListener('click', ()=>{
		if(current < quizData.length -1){ current++; showQuestion(current); }
		else showResults();
	});
	restartBtn.addEventListener('click', ()=>{ current=0; score=0; renderQuiz(); });

	function updateProgress(i){
		const pct = Math.round(((i)/quizData.length)*100);
		if(progressBar) progressBar.style.width = pct + '%';
	}

	function showQuestion(i){
		updateProgress(i);
		expl.style.display = 'none';
		qEl.textContent = (i+1) + '. ' + quizData[i].question;
		opts.innerHTML = '';
		quizData[i].options.forEach((opt, idx)=>{
			const li = createElement('li');
			const btn = createElement('button',{class:'option-btn','data-index':idx}, opt);
			btn.addEventListener('click', ()=> handleAnswer(idx));
			li.appendChild(btn);
			opts.appendChild(li);
		});
		// update nav visibility
		prevBtn.style.display = i===0 ? 'none' : 'inline-block';
		nextBtn.style.display = 'inline-block';
	}

	function handleAnswer(selected){
		const correct = quizData[current].answer;
		const buttons = opts.querySelectorAll('button');
		buttons.forEach((b, idx)=>{
			b.disabled = true;
			if(idx === correct) b.classList.add('correct');
			if(idx === selected && idx !== correct) b.classList.add('wrong');
		});
		if(selected === correct) score++;
		// show explanation
		expl.style.display = 'block';
		expl.textContent = quizData[current].explanation || '';
	}

	function showResults(){
		updateProgress(quizData.length);
		qWrap.innerHTML = '';
		const res = createElement('div',{class:'result'});
		res.innerHTML = `<p>Você acertou <strong>${score}</strong> de ${quizData.length}.</p>`;
		const tips = createElement('div',{class:'result-tips'});
		tips.innerHTML = `Sugestões: <a href="#atividades">ver atividades</a>, <a href="#recursos">baixar materiais</a>, <a href="#ods">ver ODS</a>`;
		res.appendChild(tips);
		res.appendChild(restartBtn);
		qWrap.appendChild(res);
	}

	qWrap.appendChild(qEl);
	qWrap.appendChild(opts);
	qWrap.appendChild(expl);
	nav.appendChild(prevBtn);
	nav.appendChild(nextBtn);
	nav.appendChild(restartBtn);
	qWrap.appendChild(nav);
	quizContainer.appendChild(qWrap);
	showQuestion(current);
}

// iniciar quiz ao carregar
document.addEventListener('DOMContentLoaded', ()=>{
	renderQuiz();
});

if(quizBtn){
	quizBtn.addEventListener('click', ()=>{
		document.getElementById('quiz').scrollIntoView({behavior:'smooth'});
	});
}

// Menu toggle for small screens
const menuToggle = document.getElementById('menu-toggle');
const primaryNav = document.getElementById('primary-navigation');
if(menuToggle && primaryNav){
	menuToggle.addEventListener('click', ()=>{
		const isVisible = primaryNav.getAttribute('data-visible') === 'true';
		primaryNav.setAttribute('data-visible', (!isVisible).toString());
		menuToggle.setAttribute('aria-expanded', String(!isVisible));
	});
}

// Smooth scroll for internal links and focus management
document.querySelectorAll('a[href^="#"]').forEach(a=>{
	a.addEventListener('click', function(e){
		const targetId = this.getAttribute('href').slice(1);
		const target = document.getElementById(targetId);
		if(target){
			e.preventDefault();
			target.scrollIntoView({behavior:'smooth', block:'start'});
			// move focus for accessibility
			target.setAttribute('tabindex','-1');
			target.focus({preventScroll:true});
		}
	});
});

