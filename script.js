console.log('Portfólio Roberson carregado!');

// Adiciona classe loading inicialmente
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('projetos-container');
    if (container) {
        // Adiciona um pequeno delay para mostrar o loading
        setTimeout(() => {
            if (container.children.length === 0) {
                container.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                        <div style="border: 5px solid #f3f3f3; border-top: 5px solid #0a66c2; border-radius: 50%; width: 50px; height: 50px; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                        <p style="color: #666; font-size: 1.1rem;">Carregando projetos...</p>
                        <style>@keyframes spin {0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}</style>
                    </div>
                `;
            }
        }, 100);
    }
});

// Carrega os projetos
fetch('projetos.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(projetos => {
        const container = document.getElementById('projetos-container');
        
        if (!container) {
            console.error('Container de projetos não encontrado');
            return;
        }
        
        // Limpa o container
        container.innerHTML = '';
        
        // Renderiza cada projeto
        projetos.forEach(projeto => {
            const isLogo = projeto.imagem && (
                projeto.imagem.includes('Logo') || 
                projeto.imagem.includes('logo') ||
                projeto.imagem.includes('.ico') ||
                projeto.imagem.includes('favicon')
            );
            
            const card = document.createElement('div');
            card.className = 'projeto-card';
            
            // Imagem ou placeholder
            let imagemHTML = '';
            if (projeto.imagem && projeto.imagem.trim() !== '') {
                if (isLogo) {
                    imagemHTML = `<img src="${projeto.imagem}" alt="${projeto.nome}" 
                        style="width: auto !important; height: auto !important; max-width: 140px !important; max-height: 140px !important; object-fit: contain !important; background: rgba(255,255,255,0.95) !important; padding: 20px !important; border-radius: 50% !important; border: 3px solid rgba(255,255,255,0.4) !important; box-shadow: 0 8px 25px rgba(0,0,0,0.2) !important;"
                        onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'projeto-placeholder\\'>💻</div>'">`;
                } else {
                    imagemHTML = `<img src="${projeto.imagem}" alt="${projeto.nome}" 
                        onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'projeto-placeholder\\'>💻</div>'">`;
                }
            } else {
                imagemHTML = `<div class="projeto-placeholder">${projeto.id === 2 ? '🔧' : '📚'}</div>`;
            }
            
            card.innerHTML = `
                <div class="projeto-imagem">
                    ${imagemHTML}
                </div>
                <div class="projeto-conteudo">
                    <h3>${projeto.nome}</h3>
                    <p>${projeto.descricao}</p>
                    <div class="projeto-tecnologias">
                        ${projeto.tecnologias.map(tech => 
                            `<span class="tech-tag">${tech}</span>`
                        ).join('')}
                    </div>
                    <div class="projeto-links">
                        ${projeto.link ? 
                            `<a href="${projeto.link}" target="_blank" class="projeto-link" rel="noopener noreferrer">
                                <i class="fas fa-external-link-alt"></i> Visite o Projeto
                            </a>` : ''}
                    </div>
                </div>
            `;
            
            container.appendChild(card);
        });
        
        console.log(`✅ ${projetos.length} projeto(s) carregado(s) com sucesso!`);
    })
    .catch(error => {
        console.error('Erro ao carregar projetos:', error);
        
        const container = document.getElementById('projetos-container');
        if (container) {
            container.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 60px; color: #ff6b6b; margin-bottom: 20px;"></i>
                    <h3 style="color: #333; margin-bottom: 10px;">Ops! Algo deu errado</h3>
                    <p style="color: #666; margin-bottom: 25px;">Não foi possível carregar os projetos no momento.</p>
                    <button onclick="location.reload()" style="background: #0a66c2; color: white; border: none; padding: 12px 30px; border-radius: 50px; font-weight: 600; cursor: pointer; transition: all 0.3s;">
                        <i class="fas fa-redo"></i> Tentar novamente
                    </button>
                </div>
            `;
        }
    });

// Debug simplificado
console.log('DEBUG: Script iniciado com sucesso');

// Efeito de fade em loop
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('heroLogo');
    const photo = document.getElementById('heroPhoto');
    
    if (logo && photo) {
        function startFade() {
            // Logo some, foto aparece
            logo.classList.add('fade-out');
            photo.classList.add('fade-in');
            
            // Após 3 segundos, reverte
            setTimeout(() => {
                logo.classList.remove('fade-out');
                photo.classList.remove('fade-in');
                
                // Aguarda 2 segundos e recomeça
                setTimeout(startFade, 2000);
            }, 3000);
        }
        
        // Inicia o efeito após 2 segundos
        setTimeout(startFade, 2000);
    }
});