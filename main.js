// const main = document.querySelector('.main'),
//     select = document.querySelector('#films');

// select.addEventListener('change', () => {
//     fetch('./dbHeroes.json', {
//             method: 'GET',
//             mode: 'same-origin'
//         })
//         .then((response) => {
//             if (response.status !== 200) {
//                 throw new Error('status network not 200');
//             }
//             return (response.json());
//         })
//         .then((hero) => {
//             films.forEach((hero) => {
//                 const heroCard = document.createElement('div');
//                 heroCard.setAttribute('class', 'hero-card');
//                 main.insertAdjacentElement('beforeend', heroCard);

//                 const name = hero.name ? hero.name : 'Неизвестно',
//                     realName = hero.realName ? hero.realName : 'Неизвестно',
//                     species = hero.species ? hero.species : 'Неизвестно',
//                     gender = hero.gender ? hero.gender : 'Неизвестно',
//                     citizenship = hero.citizenship ? hero.citizenship : 'Неизвестно',
//                     status = hero.status ? hero.status : 'Неизвестно',
//                     birthDay = hero.birthDay ? hero.birthDay : 'Неизвестно',
//                     actor = hero.actor ? hero.actor : 'Неизвестно',
//                     movies = hero.movies ? hero.movies.join('<br>') : 'Нету',
//                     photo = hero.photo ? hero.photo : 'Нету фотографии';

//                 const heroInfo = `<img src="${photo}" />
//                                     <h2>Имя: ${name}</h2>
//                                     <span>Настоящее имя: ${realName}</span>
//                                     <span>Вид: ${species}</span>
//                                     <span>Пол: ${gender}</span>
//                                     <span>Гражданство: ${citizenship}</span>
//                                     <span>Статус: ${status}</span>
//                                     <span>День рождения: ${birthDay}</span>
//                                     <span>Актер: ${actor}</span>
//                                     <div class='films'>
//                                         Фильмы: ${movies}
//                                     </div>
//                         `;

//                 heroCard.insertAdjacentHTML('beforeend', heroInfo);
//             });
//         })
//         .catch((error) => {
//             console.error(error);
//         });

// })























'use strict';

const main = document.querySelector('.main'),
    select = document.querySelector('#films');

let allHeroes;

fetch('./dbHeroes.json')
    .then(response => {
        if (response.status !== 200) {
            throw new Error('Не получен ответ от сервера!');
        }
        return response.json();
    })
    .then(heroes => {
        allHeroes = heroes;
        addMoviesToSelect(heroes);
        renderCard(heroes);
    })
    .catch(error => {
        console.error(error);
    });

const addMoviesToSelect = (heroes) => {
    // Получаем массив со всеми фильмами
    const movies = heroes.reduce((result, item) => {
        return result + ',' + item.movies;
    }, 'undefined').split(',');

    // Убираем пробелы в начале и в конце названия фильма
    const trimMovies = movies.map(i => i.trim());

    // убираем дубликаты фильмов
    const notDublicateFilms = [...new Set(trimMovies)].sort();

    // Добавляем каждый фильм в option селекта
    notDublicateFilms.forEach(item => {
        if (item !== 'undefined') {
            const option = new Option(item, item);
            select.append(option);
        }
    });
};

const renderCard = (films) => {
    main.textContent = '';
    films.forEach((hero, index) => {
        const heroCard = document.createElement('div');
        heroCard.setAttribute('class', 'hero-card');
        main.insertAdjacentElement('beforeend', heroCard);

        const name = hero.name ? hero.name : 'Неизвестно',
            realName = hero.realName ? hero.realName : 'Неизвестно',
            species = hero.species ? hero.species : 'Неизвестно',
            gender = hero.gender ? hero.gender : 'Неизвестно',
            citizenship = hero.citizenship ? hero.citizenship : 'Неизвестно',
            status = hero.status ? hero.status : 'Неизвестно',
            birthDay = hero.birthDay ? hero.birthDay : 'Неизвестно',
            actor = hero.actor ? hero.actor : 'Неизвестно',
            movies = hero.movies ? hero.movies.join('<br>') : 'Нету',
            photo = hero.photo ? hero.photo : 'Нету фотографии';

        const heroInfo = `<img src="${photo}" />
                    <h2>Имя: ${name}</h2>
                    <span>Настоящее имя: ${realName}</span>
                    <span>Вид: ${species}</span>
                    <span>Пол: ${gender}</span>
                    <span>Гражданство: ${citizenship}</span>
                    <span>Статус: ${status}</span>
                    <span>День рождения: ${birthDay}</span>
                    <span>Актер: ${actor}</span>
                    <div class='films'>
                        Фильмы: ${movies}
                    </div>
        `;

        heroCard.insertAdjacentHTML('beforeend', heroInfo);
    });
};

select.addEventListener('change', () => {
    if (select.value !== 'Все фильмы') {
        const filterHeroes = allHeroes.filter(item => {
            const arr = item.movies && Object.values(item.movies);
            if (arr && arr.includes(event.target.value)) {
                return true;
            } else {
                return false;
            }
        });
        renderCard(filterHeroes);
    } else {
        renderCard(allHeroes);
    }
});