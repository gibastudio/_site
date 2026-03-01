// ============================================
// CHATBOT
// ============================================

// Respostas do chatbot
const chatbotResponses = {
    cumprimento: {
        palavras: ['oi', 'olá', 'opa', 'e aí'],
        resposta: 'Olá! 👋 Bem-vindo à GibaStudio! Como posso ajudar você hoje?'
    },
    preco: {
        palavras: ['preço', 'valor', 'quanto custa', 'custa', 'tabela', 'valor', 'valores'],
        resposta: 'Nossas canecas personalizadas variam de acordo com a quantidade e complexidade do design. Para orçamento personalizado, clique em "Faça seu Orçamento" ou fale comigo para mais detalhes! 💰'
    },
    prazo: {
        palavras: ['prazo', 'quanto tempo', 'entrega', 'demora'],
        resposta: 'O prazo de entrega é de 7 a 10 dias úteis após aprovação do design. Temos opções de entrega rápida também! ⏱️'
    },
    material: {
        palavras: ['material', 'qualidade', 'resistente', 'durável'],
        resposta: 'Usamos canecas de cerâmica de alta qualidade com sublimação profissional. Garantem durabilidade e cores vibrantes! ✨'
    },
    processo: {
        palavras: ['processo', 'como funciona', 'passo', 'etapas'],
        resposta: 'Nosso processo: 1️⃣ Você descreve sua ideia 2️⃣ Criamos o design 3️⃣ Você aprova 4️⃣ Produzimos e entregamos!'
    },
    designer: {
        palavras: ['gilberto', 'quem', 'sobre', 'biografia'],
        resposta: 'Sou Gilberto Rabello, formado em Análise e Desenvolvimento de Sistemas, com experiência em design gráfico! Venho criando canecas personalizadas únicas desde 2020. 🎨'
    },
    contato: {
        palavras: ['whatsapp', 'telefone', 'contato', 'fone', 'chat', 'conversar'],
        resposta: 'Você pode enviar uma mensagem pelo WhatsApp (14) 99876-7590, ou preencher o formulário de orçamento. Estou sempre disponível! 📱'
    },
    canecas: {
        palavras: ['caneca', 'tipos', 'modelos', 'designs', 'exemplos'],
        resposta: 'Fazemos canecas personalizadas com qualquer tema: Harry Potter, Anime, Personalizadas, Temáticas e Premium! Veja nosso catálogo acima! 🎯'
    },
    pedido: {
        palavras: ['fazer pedido', 'encomendar', 'solicitar', 'encomenda', 'personalisada'],
        resposta: 'Para fazer um pedido, clique em "Faça seu Orçamento" e preencha o formulário com seus detalhes. Responderei em breve! 📝'
    },
    desconto: {
        palavras: ['desconto', 'promoção', 'oferta', 'promocional'],
        resposta: 'Temos descontos para grandes quantidades! Quanto mais canecas, maior o desconto. Fale comigo para uma proposta especial! 🎁'
    },
    pagamento: {
        palavras: ['pagamento', 'pago', 'boleto', 'pix', 'crédito', 'débito'],
        resposta: 'Aceitamos PIX, boleto e transferência bancária. Consulte as opções de parcelamento disponíveis! 💳'
    },
    marketing: {
        palavras: ['tráfego pago', 'marketing', 'divulgação', 'anúncios', 'redes sociais'],
        resposta: 'Trabalho com Tráfego Pago, Marketing Digital. Posso ajudar você a divulgar seu negócio. 📈'
    },
    web: {
        palavras: ['web designer', 'landing pages', 'front-end'],
        resposta: 'Trabalho com Front-end Designer, Crio Sites e Landing Pages Profissionais! para seu negocio ou empresa 🎨'
    },
    default: 'Desculpe, não entendi. Pode reformular a pergunta? Você pode perguntar sobre: preço, prazo, material, processo, contato, canecas, Redes Sociais, Web Designer, Social Media, Tráfego Pago, pedidos ou promoções! 🤔'
};

// Elementos do chatbot
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbot = document.getElementById('chatbot');
const closeChatbot = document.getElementById('closeChatbot');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');

// Abrir/Fechar chatbot
chatbotToggle.addEventListener('click', () => {
    chatbot.classList.add('active');
    chatbotToggle.classList.add('active');
    chatbotInput.focus();
});

closeChatbot.addEventListener('click', () => {
    chatbot.classList.remove('active');
    chatbotToggle.classList.remove('active');
});

// Enviar mensagem
function sendMessage() {
    const message = chatbotInput.value.trim();
    
    if (!message) return;
    
    // Adicionar mensagem do usuário
    addMessage(message, 'user');
    chatbotInput.value = '';
    
    // Mostrar indicador de digitação
    showTypingIndicator();
    
    // Responder após delay
    setTimeout(() => {
        removeTypingIndicator();
        const response = getBotResponse(message);
        addMessage(response, 'bot');
    }, 800);
}

// Adicionar mensagem ao chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}-message`;
    
    const p = document.createElement('p');
    p.textContent = text;
    
    messageDiv.appendChild(p);
    chatbotMessages.appendChild(messageDiv);
    
    // Scroll para a última mensagem
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Mostrar indicador de digitação
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chatbot-message bot-message';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
    
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Remover indicador de digitação
function removeTypingIndicator() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}

// Obter resposta do bot
function getBotResponse(message) {
    const messageLower = message.toLowerCase();
    
    for (const [key, data] of Object.entries(chatbotResponses)) {
        if (key === 'default') continue;
        
        if (data.palavras.some(palavra => messageLower.includes(palavra))) {
            return data.resposta;
        }
    }
    
    return chatbotResponses.default;
}

// Event listeners
chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
