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

    // Menu active state and scroll behavior
    const sections = document.querySelectorAll('section[id]');

    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav__link[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav__link[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', scrollActive);

    // Header scroll behavior
    function scrollHeader() {
        const header = document.getElementById('header');
        if (this.scrollY >= 50) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
    }

    window.addEventListener('scroll', scrollHeader);

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

        getGreeting() {
            const hour = new Date().getHours();
            if (hour >= 5 && hour < 12) {
                return "Bom dia";
            } else if (hour >= 12 && hour < 18) {
                return "Boa tarde";
            } else {
                return "Boa noite";
            }
        },

        toggleChat() {
            this.container.classList.toggle('active');
            if (!this.messages.hasChildNodes()) {
                const greeting = this.getGreeting();
                this.addMessage(`${greeting}! Eu sou Electra, sua atendente virtual. Como posso ajudar?`, 'bot');
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
                const greeting = this.getGreeting();
                response = `${greeting}! Como posso ajudar você hoje?`;
            } else if (userMessage.includes('horário')) {
                const hoje = new Date().getDay();
                if (hoje === 0) { // Domingo
                    response = "Hoje estamos fechados. Nosso horário de funcionamento é de segunda a sexta, das 8h às 18h, e sábados das 8h às 12h.";
                } else if (hoje === 6) { // Sábado
                    response = "Hoje funcionamos das 8h às 12h.";
                } else {
                    response = "Hoje funcionamos das 8h às 18h.";
                }
            } else if (userMessage.includes('endereço') || userMessage.includes('localização')) {
                response = "Estamos localizados na Rua 7 de maio 559, Pilar - AL.";
            } else if (userMessage.includes('serviço') || userMessage.includes('conserto')) {
                response = "Oferecemos serviços de conserto de TVs, micro-ondas e vendemos controles. Como posso te ajudar?";
            } else if (userMessage.includes('contato') || userMessage.includes('telefone')) {
                response = "Você pode entrar em contato conosco pelo telefone (82) 9908-0401.";
            } else if (userMessage.includes('aberto') || userMessage.includes('funcionando')) {
                const hoje = new Date();
                const hora = hoje.getHours();
                const dia = hoje.getDay();

                if (dia === 0) {
                    response = "Estamos fechados hoje (domingo). Voltamos a funcionar amanhã das 8h às 18h.";
                } else if (dia === 6) { // Sábado
                    if (hora >= 8 && hora < 12) {
                        response = "Sim, estamos abertos! Hoje funcionamos até 12h.";
                    } else {
                        response = "Estamos fechados agora. Aos sábados funcionamos das 8h às 12h.";
                    }
                } else { // Segunda a Sexta
                    if (hora >= 8 && hora < 18) {
                        response = "Sim, estamos abertos! Hoje funcionamos até 18h.";
                    } else {
                        response = "Estamos fechados agora. Funcionamos de segunda a sexta das 8h às 18h.";
                    }
                }
            }

            this.addMessage(response, 'bot');
        }
    };

    // Initialize components
    carousel.init();
    chat.init();
});