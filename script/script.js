const burgerName = 'Стандартний бургер';
const burgerImg = './image/burger.png';

const burgerTemplate = `
    <div class="burger-card text-center">
        <img class="burger-card__img" src="${burgerImg}" alt="${burgerName}">
        <h3 class="burger-card__title">${burgerName}</h3>
    </div>
`;

document.querySelector('#burger').innerHTML = burgerTemplate;
