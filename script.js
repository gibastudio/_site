// ============================================
// MODAL DE IMAGEM AMPLIADA
// ============================================
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeBtn = document.querySelector('.close-btn');
const cardImages = document.querySelectorAll('.card img, .card-catalogo img');

cardImages.forEach(img => {
    img.addEventListener('click', function() {
        modal.classList.add('active');
        modalImage.src = this.src;
        modalImage.alt = this.alt;
        modal.scrollTop = 0;
        document.body.style.overflow = 'hidden';
    });
});

closeBtn.addEventListener('click', function() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});



// ============================================
// VALIDAÇÃO DE FORMULÁRIOS
// ============================================

// Validadores
const validators = {
    nome: (value) => {
        return value.trim().length >= 3;
    },
    email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    },
    telefone: (value) => {
        const phoneRegex = /^\(?([0-9]{2})\)?[\s]?([9])?[\s]?([0-9]{4})-?([0-9]{4})$/;
        return phoneRegex.test(value.replace(/\D/g, ''));
    },
    quantidade: (value) => {
        return parseInt(value) >= 1;
    },
    descricao: (value) => {
        return value.trim().length >= 10;
    }
};

const errorMessages = {
    nome: 'Nome deve ter pelo menos 3 caracteres',
    email: 'Email inválido',
    telefone: 'Telefone inválido (ex: (11) 00000-0000)',
    quantidade: 'Quantidade mínima é 1',
    descricao: 'Descrição deve ter pelo menos 10 caracteres',
    termos: 'Você deve concordar com os termos'
};

function validateField(field) {
    const value = field.value;
    const fieldName = field.name;
    const formGroup = field.parentElement;
    const errorElement = formGroup.querySelector('.error-message');

    let isValid = true;

    if (fieldName === 'termos') {
        isValid = field.checked;
    } else if (validators[fieldName]) {
        isValid = validators[fieldName](value);
    } else {
        isValid = value.trim() !== '';
    }

    if (!isValid) {
        formGroup.classList.add('error');
        if (errorElement) {
            errorElement.textContent = errorMessages[fieldName] || 'Campo inválido';
        }
    } else {
        formGroup.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    return isValid;
}

// Formulário de Orçamento
const orcamentoForm = document.getElementById('orcamentoForm');
if (orcamentoForm) {
    const fields = orcamentoForm.querySelectorAll('input, textarea');

    fields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('change', () => validateField(field));
    });

    orcamentoForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        let isFormValid = true;
        fields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            const submitBtn = orcamentoForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';

            // preparar dados para o WhatsApp
            const formData = new FormData(orcamentoForm);
            const telefoneCadastro = formData.get('telefone');
            const descricao = formData.get('descricao');
            const quantidade = formData.get('quantidade');
            // número do gilberto
            const telefoneCriador = '5514997167461';

            const whatsappMessage = encodeURIComponent(
                `Olá! Gostaria de solicitar um orçamento.\n\nNome: ${formData.get('nome')}\nEmail: ${formData.get('email')}\nTelefone: ${telefoneCadastro}\nQuantidade: ${quantidade} canecas\nProjeto: ${descricao}`
            );

// escolher esquema apropriado: 'whatsapp://' em mobile para garantir abertura do app,
    // caso não funcione, usar o link padrão wa.me como fallback.
    const isMobile = /Android|iPhone|iPad|iPod|IEMobile|WPDesktop/i.test(navigator.userAgent);
    let whatsappUrl;
    if (isMobile) {
        whatsappUrl = `whatsapp://send?phone=${telefoneCriador}&text=${whatsappMessage}`;
    } else {
        whatsappUrl = `https://wa.me/${telefoneCriador}?text=${whatsappMessage}`;
    }
    // navegação imediata para manter contexto de clique e garantir abertura do app em mobile
            window.location.href = whatsappUrl;

            // Simular envio apenas para feedback visual depois de um curto delay
            setTimeout(() => {
                showSuccessMessage(orcamentoForm, 'Orçamento enviado com sucesso!');

                orcamentoForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                fields.forEach(field => {
                    field.parentElement.classList.remove('error');
                });
            }, 1000);
        }
    });
}

// Formulário Newsletter
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    const newsEmailInput = document.getElementById('newsEmail');

    newsEmailInput.addEventListener('blur', () => {
        const value = newsEmailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const formGroup = newsEmailInput.parentElement;
        const errorElement = formGroup.querySelector('.error-message');

        if (value && !emailRegex.test(value)) {
            formGroup.classList.add('error');
            if (errorElement) {
                errorElement.textContent = 'Email inválido';
            }
        } else {
            formGroup.classList.remove('error');
            if (errorElement) {
                errorElement.textContent = '';
            }
        }
    });

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = newsEmailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            const formGroup = newsEmailInput.parentElement;
            const errorElement = formGroup.querySelector('.error-message');
            formGroup.classList.add('error');
            if (errorElement) {
                errorElement.textContent = 'Email inválido';
            }
            return;
        }

        showSuccessMessage(newsletterForm, '✓ Inscrição confirmada!');
        newsletterForm.reset();
    });
}

// Função auxiliar para mostrar mensagens de sucesso
function showSuccessMessage(form, message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        background: #4CAF50;
        color: white;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        animation: slideDown 0.3s ease-in-out;
    `;

    form.insertBefore(successDiv, form.firstChild);

    setTimeout(() => {
        successDiv.style.animation = 'slideUp 0.3s ease-in-out forwards';
        setTimeout(() => successDiv.remove(), 300);
    }, 3000);
}

// ============================================
// PRELOAD DE IMAGENS
// ============================================
function preloadImages(imageUrls) {
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Preload das imagens principais do catálogo
document.addEventListener('DOMContentLoaded', () => {
    const catalogImages = Array.from(document.querySelectorAll('.card-catalogo img')).map(img => img.src);
    const exclusivoImages = Array.from(document.querySelectorAll('.card img')).map(img => img.src);
    
    preloadImages([...new Set([...catalogImages, ...exclusivoImages])]);

    // Adicionar estilos de animação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideUp {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-20px);
            }
        }
    `;
    document.head.appendChild(style);
});

// ============================================
// LAZY LOADING FALLBACK
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}