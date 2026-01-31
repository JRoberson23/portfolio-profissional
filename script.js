console.log('Portfólio Roberson carregado!');

fetch('projetos.json')
    .then(response => response.json())
    .then(projetos => {
        const container = document.getElementById('projetos-container');
        
        projetos.forEach(projeto => {
            const card = `
                <div class="projeto-card">
                    <div class="projeto-imagem">
                        ${projeto.imagem && projeto.imagem !== '' ? 
                            `<img src="${projeto.imagem}" alt="${projeto.nome}">` : 
                            `<div class="projeto-placeholder">💻</div>`
                        }
                    </div>
                    <div class="projeto-conteudo">
                        <h3>${projeto.nome}</h3>  <!-- Mudado de titulo para nome -->
                        <p>${projeto.descricao}</p>
                        <div class="projeto-tecnologias">
                            ${projeto.tecnologias.map(tech => 
                                `<span class="tech-tag">${tech}</span>`
                            ).join('')}
                        </div>
                        <div class="projeto-links">
                            ${projeto.link ? 
                                `<a href="${projeto.link}" target="_blank" class="projeto-link">
                                    <i class="fas fa-external-link-alt"></i> Visite o Projeto
                                </a>` : ''}
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });
    })
    .catch(error => {
        console.error('Erro ao carregar projetos:', error);
        document.getElementById('projetos-container').innerHTML = 
            '<p style="text-align: center; color: #666; padding: 40px;">Erro ao carregar projetos. Por favor, recarregue a página.</p>';
    });



// CÓDIGO TEMPORÁRIO PARA DEBUG
console.log('DEBUG: Iniciando carregamento...');

// Teste se o elemento existe
const container = document.getElementById('projetos-container');
if (!container) {
    console.error('DEBUG: Elemento #projetos-container NÃO encontrado!');
} else {
    console.log('DEBUG: Elemento #projetos-container encontrado!');
}

// Teste o fetch
fetch('projetos.json')
    .then(response => {
        console.log('DEBUG: Resposta do fetch:', response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(projetos => {
        console.log('DEBUG: Projetos carregados:', projetos);
        console.log('DEBUG: Quantidade de projetos:', projetos.length);
        
        // Verifique a estrutura de cada projeto
        projetos.forEach((projeto, index) => {
            console.log(`DEBUG: Projeto ${index}:`, projeto);
            console.log(`DEBUG: - Nome: ${projeto.nome}`);
            console.log(`DEBUG: - Link: ${projeto.link}`);
        });
        
    })
    .catch(error => {
        console.error('DEBUG: Erro completo:', error);
    });