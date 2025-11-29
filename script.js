// =========================================================================
// FUNÇÕES PRINCIPAIS
// =========================================================================

/**
 * Simula o download do sistema
 */
function iniciarDownload() {
    // Aqui você pode implementar a lógica real de download
    // Por enquanto, apenas mostra um alerta e simula o download
    
    // Mostrar mensagem de confirmação
    mostrarMensagem('Download iniciado! Obrigado por baixar o Garimpeiro de Empresas V2.', 'success');
    
    // Simular progresso do download
    simularProgressoDownload();
    
    // Para um download real, descomente a linha abaixo:
    // window.location.href = 'URL_DO_SEU_ARQUIVO_AQUI';
}

/**
 * Simula o progresso do download com uma barra de progresso
 */
function simularProgressoDownload() {
    // Criar overlay de progresso
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    // Criar caixa de progresso
    const progressBox = document.createElement('div');
    progressBox.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 10px;
        text-align: center;
        width: 300px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    `;
    
    progressBox.innerHTML = `
        <h3 style="margin-bottom: 15px; color: var(--color-primary);">Baixando...</h3>
        <div style="background: #e9ecef; border-radius: 10px; height: 20px; margin-bottom: 15px; overflow: hidden;">
            <div id="progress-bar" style="height: 100%; background: linear-gradient(90deg, var(--color-accent) 0%, var(--color-success) 100%); width: 0%; transition: width 0.3s;"></div>
        </div>
        <p id="progress-text" style="font-size: 14px; color: var(--color-secondary-text);">Preparando download...</p>
    `;
    
    overlay.appendChild(progressBox);
    document.body.appendChild(overlay);
    
    // Simular progresso
    let progress = 0;
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Download em progresso: ${Math.round(progress)}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                document.body.removeChild(overlay);
                mostrarMensagem('Download concluído com sucesso!', 'success');
            }, 500);
        }
    }, 200);
}

/**
 * Mostra uma mensagem de notificação
 * @param {string} mensagem - Texto da mensagem
 * @param {string} tipo - Tipo da mensagem ('success', 'error', 'info')
 */
function mostrarMensagem(mensagem, tipo = 'info') {
    // Criar elemento de toast
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${tipo === 'success' ? 'var(--color-success)' : tipo === 'error' ? 'var(--color-danger)' : 'var(--color-primary)'};
        color: white;
        padding: 15px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        transform: translateX(150%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    toast.textContent = mensagem;
    document.body.appendChild(toast);
    
    // Animação de entrada
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover após 3 segundos
    setTimeout(() => {
        toast.style.transform = 'translateX(150%)';
        setTimeout(() => {
            if (toast.parentNode) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

/**
 * Volta para a página principal do sistema
 */
function voltarParaSistema() {
    // Aqui você pode redirecionar para a página principal
    // Por enquanto, apenas mostra uma mensagem
    mostrarMensagem('Redirecionando para o sistema principal...', 'info');
    
    // Simular redirecionamento
    setTimeout(() => {
        // Para redirecionar de verdade, descomente a linha abaixo:
        // window.location.href = 'index.html';
        
        // Por enquanto, apenas mostra um alerta
        alert('Esta funcionalidade redirecionaria para a página principal do sistema.');
    }, 1000);
}

// =========================================================================
// INICIALIZAÇÃO DA PÁGINA
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Configurar eventos dos botões
    document.getElementById('download-btn').addEventListener('click', iniciarDownload);
    document.getElementById('back-btn').addEventListener('click', voltarParaSistema);
    
    // Log de inicialização
    console.log('Página de download do Garimpeiro de Empresas V2 carregada com sucesso!');
    
    // Mostrar mensagem de boas-vindas
    setTimeout(() => {
        mostrarMensagem('Bem-vindo à página de download!', 'success');
    }, 1000);
});

// =========================================================================
// FUNÇÕES ADICIONAIS (OPCIONAIS)
// =========================================================================

/**
 * Verifica se o dispositivo é móvel
 * @returns {boolean} True se for dispositivo móvel
 */
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

/**
 * Ajusta o layout para dispositivos móveis
 */
function ajustarParaMobile() {
    if (isMobileDevice()) {
        document.body.classList.add('mobile');
    }
}

// Inicializar ajustes para mobile
ajustarParaMobile();