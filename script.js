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
    
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(150%)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
}

/**
 * Mostra a seção selecionada e atualiza a navegação.
 * @param {string} sectionId - O ID da seção a ser mostrada.
 */
function mostrarSecao(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
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
    // Configurar navegação entre seções
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            mostrarSecao(sectionId);
            
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
            
            window.scrollTo({
                top: document.querySelector('.container').offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Botão principal do WhatsApp
    document.getElementById('whatsapp-btn').addEventListener('click', function() {
        mostrarMensagem('Redirecionando para o WhatsApp...', 'success');
    });
    
    // Log de inicialização
    console.log('Landing page Garimpeiro V2 - Conversão carregada!');
    
    // Mostrar mensagem de boas-vindas
    setTimeout(() => {
        mostrarMensagem('Transforme dados em dinheiro com o Garimpeiro V2!', 'success');
    }, 1000);
});