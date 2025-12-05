// =========================================================================
// FUNÇÕES AUXILIARES
// =========================================================================

/**
 * Mostra uma mensagem de notificação (toast).
 * @param {string} mensagem - A mensagem a ser exibida.
 * @param {string} tipo - O tipo de mensagem ('success', 'error', 'warning', 'info').
 */
function mostrarMensagem(mensagem, tipo = 'info') {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    
    // Define a cor de fundo baseada no tipo
    let corFundo;
    switch (tipo) {
        case 'success':
            corFundo = 'var(--color-success)';
            break;
        case 'error':
            corFundo = 'var(--color-danger)';
            break;
        case 'warning':
            corFundo = 'var(--color-warning)';
            break;
        case 'info':
        default:
            corFundo = 'var(--color-primary)';
            break;
    }
    toast.style.backgroundColor = corFundo;
    
    toast.textContent = mensagem;
    document.body.appendChild(toast);
    
    // Mostra o toast
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Esconde e remove o toast após 4 segundos
    setTimeout(() => {
        toast.style.transform = 'translateX(150%)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
}

/**
 * Simula o processo de download com barra de progresso.
 * @param {string} nomeArquivo - Nome do arquivo para exibir na mensagem.
 * @param {string} urlDownload - URL real do download.
 */
function iniciarDownload(nomeArquivo = 'GarimpeiroV2.exe', urlDownload = 'URL_DO_DOWNLOAD_DO_SISTEMA') {
    const overlay = document.createElement('div');
    overlay.classList.add('progress-overlay');
    overlay.innerHTML = `
        <div class="progress-box">
            <h3>Preparando Download...</h3>
            <p>Baixando ${nomeArquivo}</p>
            <div class="progress-bar-container">
                <div class="progress-bar" id="download-progress-bar"></div>
            </div>
            <p id="progress-text">0% Concluído</p>
        </div>
    `;
    document.body.appendChild(overlay);

    let progress = 0;
    const progressBar = document.getElementById('download-progress-bar');
    const progressText = document.getElementById('progress-text');

    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 1; // Incremento aleatório
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Simula o clique no link de download
            const link = document.createElement('a');
            link.href = urlDownload;
            link.download = nomeArquivo;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Finaliza a simulação
            progressText.textContent = 'Download Iniciado!';
            mostrarMensagem(`Download de ${nomeArquivo} iniciado com sucesso!`, 'success');
            setTimeout(() => {
                overlay.remove();
            }, 1500);
        }
        
        progressBar.style.width = progress + '%';
        progressText.textContent = progress + '% Concluído';
    }, 300);
}

/**
 * Simula a ação de voltar para o sistema.
 */
function voltarParaSistema() {
    // Esta função foi mantida no JS, mas o botão foi removido do HTML a pedido do usuário.
    mostrarMensagem('Redirecionando para o sistema...', 'info');
    // window.location.href = 'URL_DO_SISTEMA';
}

/**
 * Mostra a seção selecionada e atualiza a navegação.
 * @param {string} sectionId - O ID da seção a ser mostrada.
 */
function mostrarSecao(sectionId) {
    // Esconde todas as seções
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostra a seção desejada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Atualiza o estado ativo na navegação
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
}

// =========================================================================
// INICIALIZAÇÃO
// =========================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Configurar eventos dos botões principais
    document.getElementById('download-btn').addEventListener('click', function() {
        iniciarDownload('GarimpeiroV2.exe', 'URL_DO_DOWNLOAD_DO_SISTEMA');
    });
    
    // O botão 'final-download-btn' está na seção de funcionalidades, que não será alterada
    // document.getElementById('final-download-btn').addEventListener('click', iniciarDow    // O botão 'back-btn' foi removido do HTML a pedido do usuário.
    // document.getElementById('back-btn').addEventListener('click', voltarParaSistema);
    
    // Os botões de manuais e o botão de baixar todos os manuais foram substituídos por um link direto no HTML.
    // Os listeners foram removidos. navegação entre seções
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            mostrarSecao(sectionId);
            
            // Rolar suavemente para o topo da seção
            window.scrollTo({
                top: document.querySelector('.container').offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Configurar links do rodapé
    document.querySelectorAll('footer .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            mostrarSecao(sectionId);
            
            // Rolar suavemente para o topo da seção
            window.scrollTo({
                top: document.querySelector('.container').offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Log de inicialização
    console.log('Página de download do Garimpeiro de Empresas V2 carregada com sucesso!');
    
    // Mostrar mensagem de boas-vindas
    setTimeout(() => {
        mostrarMensagem('Bem-vindo à página de download do Garimpeiro V2!', 'success');
    }, 1000);
});
