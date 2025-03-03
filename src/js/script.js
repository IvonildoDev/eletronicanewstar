document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav__link');

    function toggleMenu() {
        navMenu.classList.toggle('show-menu');
    }

    navToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('show-menu');
        }
    });

    // Carousel functionality
    const carousel = {
        container: document.querySelector('.carousel__container'),
        images: document.querySelectorAll('.carousel__img'),
        prevBtn: document.querySelector('.carousel__btn.prev'),
        nextBtn: document.querySelector('.carousel__btn.next'),
        currentIndex: 0,

        init() {
            this.showImage(this.currentIndex);
            this.prevBtn.addEventListener('click', () => this.prevImage());
            this.nextBtn.addEventListener('click', () => this.nextImage());
            // Increased interval from 5000ms to 8000ms (8 seconds)
            setInterval(() => this.nextImage(), 8000); // Auto advance every 8 seconds
        },

        showImage(index) {
            const offset = index * -33.333; // Move one third of the width
            this.container.style.transform = `translateX(${offset}%)`;
        },

        nextImage() {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
            this.showImage(this.currentIndex);
        },

        prevImage() {
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
            this.showImage(this.currentIndex);
        }
    };

    // Chat functionality
    const chat = {
        widget: document.getElementById('chat-widget'),
        container: document.getElementById('chat-container'),
        toggle: document.getElementById('chat-toggle'),
        close: document.getElementById('chat-close'),
        messages: document.getElementById('chat-messages'),
        input: document.getElementById('chat-input'),
        send: document.getElementById('chat-send'),

        init() {
            this.toggle.addEventListener('click', () => this.toggleChat());
            this.close.addEventListener('click', () => this.toggleChat());
            this.send.addEventListener('click', () => this.sendMessage());
            this.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        },

        toggleChat() {
            this.container.classList.toggle('active');
            if (!this.messages.hasChildNodes()) {
                this.addMessage("Olá! Eu sou Electra, sua atendente virtual. Como posso ajudar?", 'bot');
            }
        },

        addMessage(text, sender) {
            const message = document.createElement('div');
            message.classList.add('message', sender);
            message.textContent = text;
            this.messages.appendChild(message);
            this.messages.scrollTop = this.messages.scrollHeight;
        },

        sendMessage() {
            const text = this.input.value.trim();
            if (text) {
                this.addMessage(text, 'user');
                this.input.value = '';
                setTimeout(() => this.botResponse(text), 500);
            }
        },

        botResponse(userMessage) {
            let response = "Desculpe, não entendi. Pode reformular sua pergunta?";
            userMessage = userMessage.toLowerCase();

            if (userMessage.includes('olá') || userMessage.includes('oi')) {
                response = "Olá! Como posso ajudar você hoje?";
            } else if (userMessage.includes('horário')) {
                response = "Nosso horário de funcionamento é de segunda a sexta, das 8h às 18h, e sábados das 8h às 12h.";
            } else if (userMessage.includes('endereço') || userMessage.includes('localização')) {
                response = "Estamos localizados na Rua 7 de maio 559, Pilar - AL.";
            } else if (userMessage.includes('serviço') || userMessage.includes('conserto')) {
                response = "Oferecemos serviços de conserto de TVs, micro-ondas e vendemos controles. Como posso te ajudar?";
            } else if (userMessage.includes('contato') || userMessage.includes('telefone')) {
                response = "Você pode entrar em contato conosco pelo telefone (82) 9908-0401.";
            }

            this.addMessage(response, 'bot');
        }
    };

    // Initialize components
    carousel.init();
    chat.init();
});