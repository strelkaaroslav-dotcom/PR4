const burgerName = 'Стандартний бургер';
const burgerImg = './image/burger.png';

const burgerTemplate = `
    <div class="burger-card text-center">
        <img class="burger-card__img" src="${burgerImg}" alt="${burgerName}">
        <h3 class="burger-card__title">${burgerName}</h3>
    </div>
`;

document.querySelector('#burger').innerHTML = burgerTemplate;

const btnOpenModal = document.querySelector('#btnOpenModal');
const closeModal = document.querySelector('#closeModal');
const modalBlock = document.querySelector('#modalBlock');
const questionTitle = document.querySelector('#question');
const formAnswers = document.querySelector('#formAnswers');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');

let numberQuestion = 0;

const renderAnswers = (index) => {
    const { answers, type } = questions[index];

    formAnswers.innerHTML = '';

    answers.forEach(({ title, url }, i) => {
        formAnswers.insertAdjacentHTML('beforeend', `
            <div class="answers-item d-flex flex-column">
                <input type="${type}" id="answerItem${i}" name="answer" class="d-none" value="${title}">
                <label for="answerItem${i}" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${url}" alt="${title}">
                    <span>${title}</span>
                </label>
            </div>
        `);
    });
};

const renderQuestions = (indexQuestion) => {
    questionTitle.textContent = questions[indexQuestion].question;
    renderAnswers(indexQuestion);

    prevButton.classList.toggle('d-none', indexQuestion === 0);
    nextButton.classList.toggle('d-none', indexQuestion === questions.length - 1);
};

btnOpenModal.addEventListener('click', () => {
    modalBlock.classList.add('d-block');
    numberQuestion = 0;
    renderQuestions(numberQuestion);
});

closeModal.addEventListener('click', () => {
    modalBlock.classList.remove('d-block');
});

prevButton.addEventListener('click', () => {
    numberQuestion--;
    renderQuestions(numberQuestion);
});

nextButton.addEventListener('click', () => {
    numberQuestion++;
    renderQuestions(numberQuestion);
});
