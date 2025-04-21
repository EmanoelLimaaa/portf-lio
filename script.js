// Modifique a parte do menu toggle para:
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');

// Só aplica o toggle em telas maiores
function setupMenuToggle() {
    if (window.innerWidth > 400) { // 400px é o breakpoint que definimos
        menuToggle.addEventListener('click', () => {
            const isExpanded = nav.classList.toggle('active');
            menuToggle.innerHTML = isExpanded ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Fechar menu ao clicar nos links
        document.querySelectorAll('#nav ul li a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    } else {
        // Remove completamente o toggle em telas pequenas
        menuToggle.style.display = 'none';
        nav.classList.add('active'); // Garante que o nav está visível
    }
}

// Chama na carga e no redimensionamento
setupMenuToggle();
window.addEventListener('resize', setupMenuToggle);

    // ============ Header Scroll Effect ============
    const header = document.querySelector('#header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ============ Botão Voltar ao Topo ============
    const backToTop = document.querySelector('#backToTop');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('show', window.scrollY > 300);
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============ Ano atual no footer ============
    document.getElementById('year').textContent = new Date().getFullYear();

    // ============ Filtro do Portfólio ============
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove classe active de todos os botões
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Adiciona classe active ao botão clicado
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ============ Slider de Depoimentos ============
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const sliderDots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        sliderDots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        sliderDots[index].classList.add('active');
        currentSlide = index;
    }
    
    function startSlider() {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }, 5000);
    }
    
    function pauseSlider() {
        clearInterval(slideInterval);
    }
    
    sliderDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            showSlide(slideIndex);
            pauseSlider();
            startSlider();
        });
    });
    
    // Inicia o slider
    if (testimonialSlides.length > 0) {
        showSlide(0);
        startSlider();
    }

    // ============ Envio de Formulário ============
    const form = document.getElementById('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
            form.reset();
        });
    }

    // ============ Barras de Habilidade ============
    const skillBars = document.querySelectorAll('.progress');
    const skillsSection = document.querySelector('.skills');
    
    function animateSkillBars() {
        // Verifica se a seção está visível
        const isSectionVisible = () => {
            if (!skillsSection) return false;
            const rect = skillsSection.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight * 0.75) && // 75% da tela
                rect.bottom >= 0
            );
        };
    
        // Animação apenas uma vez quando a seção ficar visível
        const animateOnce = () => {
            if (isSectionVisible()) {
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width') || '0';
                    bar.style.width = width + '%';
                });
                window.removeEventListener('scroll', animateOnce);
            }
        };
    
        // Usa IntersectionObserver se disponível
        if ('IntersectionObserver' in window && skillsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        skillBars.forEach(bar => {
                            const width = bar.getAttribute('data-width') || '0';
                            bar.style.width = width + '%';
                        });
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
    
            observer.observe(skillsSection);
        } else {
            // Fallback para navegadores antigos
            if (isSectionVisible()) {
                animateOnce();
            } else {
                window.addEventListener('scroll', animateOnce);
            }
        }
    }
    
    // Chama as funções necessárias
    animateSkillBars();
    window.addEventListener('resize', animateSkillBars);

    // ============ Scroll Suave ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
