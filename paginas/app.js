document.addEventListener('DOMContentLoaded', () => {
    const aiColumns = document.querySelector('.ai-columns');

    let isMouseDown = false;
    let startX, scrollLeft;
    
    aiColumns.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startX = e.pageX - aiColumns.offsetLeft;
        scrollLeft = aiColumns.scrollLeft;
    });
    
    aiColumns.addEventListener('mouseleave', () => {
        isMouseDown = false;
    });
    
    aiColumns.addEventListener('mouseup', () => {
        isMouseDown = false;
    });
    
    aiColumns.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - aiColumns.offsetLeft;
        const walk = (x - startX) * 2;
        aiColumns.scrollLeft = scrollLeft - walk;
    });

    function gerarCards(categoria, dados) {
        const container = document.getElementById(`cards-${categoria}`);
        if (!container) return;

        container.innerHTML = '';

        dados.forEach(ia => {
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
                <a href="${ia.link}" target="_blank">
                    <img src="${ia.imagem}" alt="${ia.titulo}">
                </a>
            `;

            container.appendChild(card);
        });
    }

    Object.keys(dadosIA).forEach(categoria => {
        gerarCards(categoria, dadosIA[categoria]);
    });

    document.getElementById('search-input').addEventListener('input', () => {
        const query = document.getElementById('search-input').value.toLowerCase();
        document.querySelectorAll('.column').forEach(column => {
            const cards = column.querySelectorAll('.card');
            let hasVisibleCard = false;

            cards.forEach(card => {
                const altText = card.querySelector('img').alt.toLowerCase();
                if (altText.includes(query)) {
                    card.style.display = '';
                    hasVisibleCard = true;
                } else {
                    card.style.display = 'none';
                }
            });

            column.style.display = hasVisibleCard ? '' : 'none';
        });
    });

    document.querySelectorAll('.column h2').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('active')
            const column = card.parentElement;
            column.classList.toggle('active');
        });
    });
});