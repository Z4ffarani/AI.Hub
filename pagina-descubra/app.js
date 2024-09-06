document.addEventListener('DOMContentLoaded', () => {
    function gerarCards(categoria, dados) {
        const container = document.getElementById(`cards-${categoria}`);
        if (!container) return;

        container.innerHTML = '';

        dados.forEach(ia => {
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
                <img src="${ia.imagem}" alt="${ia.titulo}">
                <h3>${ia.titulo}</h3>
                <p>${ia.descricao}</p>
                <button onclick="window.open('${ia.link}', '_blank')">Descobrir</button>
            `;

            container.appendChild(card);
        });
    }

    Object.keys(dadosIA).forEach(categoria => {
        gerarCards(categoria, dadosIA[categoria]);
    });

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', filtrarIAs);

    function filtrarIAs() {
        const query = searchInput.value.toLowerCase();
        const colunas = document.querySelectorAll('.column');

        if (query === '') {
            colunas.forEach(coluna => coluna.style.display = 'block');
            Object.keys(dadosIA).forEach(categoria => gerarCards(categoria, dadosIA[categoria]));
        } else {
            colunas.forEach(coluna => coluna.style.display = 'none');

            Object.keys(dadosIA).forEach(categoria => {
                const resultados = dadosIA[categoria].filter(ia => ia.titulo.toLowerCase().includes(query));
                if (resultados.length > 0) {
                    const coluna = document.getElementById(`${categoria}-column`);
                    coluna.style.display = 'block';
                    gerarCards(categoria, resultados);
                }
            });
        }
    }

    const header = document.querySelector('header');
    const searchSection = document.querySelector('.search-section');
    const infoLinks = document.querySelector('.info-links');

    window.addEventListener('scroll', () => {
        const headerBottom = header.getBoundingClientRect().bottom;

        if (headerBottom < 0) {
            searchSection.classList.add('hidden');
            infoLinks.classList.add('hidden');
        } else {
            searchSection.classList.remove('hidden');
            infoLinks.classList.remove('hidden');
        }
    });

    const columns = document.querySelectorAll('.column');
    columns.forEach(column => {
        const header = column.querySelector('h2');
        header.addEventListener('click', () => {
            column.classList.toggle('active');
        });
    });
});
