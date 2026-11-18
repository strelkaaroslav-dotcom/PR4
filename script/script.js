document.addEventListener('DOMContentLoaded', () => {
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const nextButton = document.querySelector('#next');
    const prevButton = document.querySelector('#prev');
    const sendButton = document.querySelector('#send');

    const getData = () => {
        questionTitle.textContent = '';
        formAnswers.textContent = 'LOAD';
        [prevButton, nextButton, sendButton].forEach(($btn) => $btn.classList.add('d-none'));

        firebase.database().ref().child('questions').once('value')
            .then((snap) => playTest(snap.val()))
            .catch((err) => {
                formAnswers.textContent = 'Помилка завантаження даних';
                console.error(err);
            });
    };

    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block');
        getData();
    });

    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
    });

    const playTest = (questions) => {
        const finalAnswers = [];
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

        const renderButtons = (indexQuestion) => {
            switch (indexQuestion) {
                case 0:
                    prevButton.classList.add('d-none');
                    nextButton.classList.remove('d-none');
                    sendButton.classList.add('d-none');
                    break;
                case questions.length - 1:
                    prevButton.classList.remove('d-none');
                    nextButton.classList.add('d-none');
                    sendButton.classList.remove('d-none');
                    break;
                default:
                    prevButton.classList.remove('d-none');
                    nextButton.classList.remove('d-none');
                    sendButton.classList.add('d-none');
            }
        };

        const renderQuestions = (indexQuestion) => {
            if (indexQuestion === questions.length) {
                [prevButton, nextButton, sendButton].forEach(($btn) => $btn.classList.add('d-none'));
                questionTitle.textContent = '';
                formAnswers.textContent = 'Дякуємо за пройдений тест!';
                return;
            }

            questionTitle.textContent = questions[indexQuestion].question;
            renderAnswers(indexQuestion);
            renderButtons(indexQuestion);
        };

        const checkAnswer = () => {
            const obj = {};
            const inputs = [...formAnswers.elements].filter((input) => input.checked);

            inputs.forEach((input, index) => {
                obj[`${index}_${questions[numberQuestion].question}`] = input.value;
            });

            finalAnswers[numberQuestion] = obj;
        };

        nextButton.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);
        };

        prevButton.onclick = () => {
            numberQuestion--;
            renderQuestions(numberQuestion);
        };

        sendButton.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);

            firebase.database().ref().child('contacts').push(finalAnswers);
            console.log(finalAnswers);
        };

        renderQuestions(numberQuestion);
    };
});
