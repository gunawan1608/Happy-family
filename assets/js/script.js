// DOM Elements
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');
const menuOverlay = document.querySelector('.menu-overlay');
const sections = document.querySelectorAll('section');
const header = document.getElementById('home');
const memoryCards = document.querySelectorAll('.memory-card:not(.coming-soon-card)');
const heroIcons = document.querySelectorAll('.hero-icon');
const heroTitle = document.querySelector('.main-title');
const heroTagline = document.querySelector('.tagline');
const heroQuote = document.querySelector('.hero-quote');
const heroBadge = document.querySelector('.hero-badge');
const discoverMoreBtn = document.querySelector('.discover-more');
const aboutSection = document.getElementById('about');
const aboutImage = document.querySelector('.about-image');
const memberCards = document.querySelectorAll('.member-card');
const listViewBtns = document.querySelectorAll('.list-view-btn');

// Initialize current year for copyright
const footerYear = document.querySelector('.copyright');
if (footerYear) {
    footerYear.innerHTML = `© ${new Date().getFullYear()} Happy Family Circle. All rights reserved.`;
}

// Hero section animations
function animateHeroElements() {
    // Staggered animation for hero elements
    const heroElements = [heroBadge, heroTitle, heroTagline, heroQuote];
    heroElements.forEach((element, index) => {
        if (element) {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        }
    });

    // Animate hero icons with delay
    heroIcons.forEach((icon, index) => {
        icon.style.opacity = '0';
        icon.style.transform = 'scale(0.5)';
        icon.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            icon.style.opacity = '1';
            icon.style.transform = 'scale(1)';
        }, 1000 + (index * 150));
    });
    
    // Animate discover more button
    if (discoverMoreBtn) {
        discoverMoreBtn.style.opacity = '0';
        discoverMoreBtn.style.transform = 'translateY(20px)';
        discoverMoreBtn.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            discoverMoreBtn.style.opacity = '1';
            discoverMoreBtn.style.transform = 'translateY(0)';
        }, 1500);
    }
}

// Add mouse move parallax effect to the hero section
function setupParallaxEffect() {
    const shapes = document.querySelectorAll('.shape');
    
    header.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            // Different movements for each shape based on index
            const offsetX = (index + 1) * 15;
            const offsetY = (index + 1) * 15;
            
            shape.style.transform = `translate(${x * offsetX}px, ${y * offsetY}px)`;
        });
        
        // Subtle parallax for the hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translate(${x * -10}px, ${y * -10}px)`;
        }
    });
}

// Enhanced About Section Animation
function setupAboutSectionEffects() {
    if (aboutImage) {
        aboutImage.addEventListener('mouseenter', () => {
            aboutImage.style.transform = 'rotate(0) scale(1.02)';
        });
        
        aboutImage.addEventListener('mouseleave', () => {
            aboutImage.style.transform = 'rotate(2deg) scale(1)';
        });
    }
    
    // Parallax effect for about section on scroll
    window.addEventListener('scroll', () => {
        if (aboutSection) {
            const scrollValue = window.scrollY;
            const aboutSectionTop = aboutSection.offsetTop;
            const aboutSectionHeight = aboutSection.offsetHeight;
            
            if (scrollValue > aboutSectionTop - window.innerHeight && 
                scrollValue < aboutSectionTop + aboutSectionHeight) {
                const parallaxValue = (scrollValue - (aboutSectionTop - window.innerHeight)) * 0.1;
                
                if (aboutImage) {
                    aboutImage.style.transform = `rotate(${2 - (parallaxValue * 0.05)}deg) translateY(${-parallaxValue * 0.3}px)`;
                }
            }
        }
    });
}

// Enhanced Member Cards Animation
function setupMemberCardsEffects() {
    memberCards.forEach((card, index) => {
        // Add staggered entrance animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            const memberImg = this.querySelector('.member-img');
            if (memberImg) {
                memberImg.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            const memberImg = this.querySelector('.member-img');
            if (memberImg) {
                memberImg.style.transform = 'scale(1)';
            }
        });
    });
}

// Enhanced Memory Cards Effects
function setupMemoryCardsEffects() {
    // Memory view toggle (grid/list)
    if (listViewBtns && listViewBtns.length) {
        listViewBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                listViewBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const viewType = this.getAttribute('data-view');
                
                // Toggle class on memories grid
                const memoriesGrid = document.querySelector('.memories-grid');
                if (memoriesGrid) {
                    if (viewType === 'list') {
                        memoriesGrid.classList.add('list-view');
                    } else {
                        memoriesGrid.classList.remove('list-view');
                    }
                    
                    // Animate the transition
                    const cards = memoriesGrid.querySelectorAll('.memory-card');
                    cards.forEach((card, index) => {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.9)';
                        
                        setTimeout(() => {
                            card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50 + (index * 30));
                    });
                }
            });
        });
    }
    
    // Add 3D tilt effect to memory cards
    memoryCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = this.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            // Calculate rotation based on mouse position
            const rotateX = mouseY * -0.05;
            const rotateY = mouseX * 0.05;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });
}

// Add fade-in animation to elements with data-aos attribute
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const delay = element.getAttribute('data-aos-delay') || 0;
            
            setTimeout(() => {
                let animation = 'fadeInUp';
                if (element.getAttribute('data-aos') === 'fade-right') {
                    animation = 'fadeInRight';
                } else if (element.getAttribute('data-aos') === 'fade-left') {
                    animation = 'fadeInLeft';
                } else if (element.getAttribute('data-aos') === 'zoom-in') {
                    animation = 'zoomIn';
                }
                
                element.style.opacity = '0';
                element.style.animation = `${animation} 0.8s forwards`;
                element.style.opacity = '1';
            }, delay);
            
            observer.unobserve(element);
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});

// Update scroll handler to handle sticky navbar and active section highlighting
window.addEventListener('scroll', () => {
    // Highlight active menu item based on scroll position
    highlightActiveSection();
    
    // Add shadow on scroll
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Menu toggle functionality
if (menuToggle && navLinksContainer && menuOverlay) {
    menuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    menuOverlay.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    });

    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Smooth scroll for navigation links with improved animation
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const navbarHeight = navbar.offsetHeight;
        
        // Close mobile menu if open
        if (window.innerWidth <= 768 && navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
            if (menuOverlay) menuOverlay.classList.remove('active');
            if (menuToggle) menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = 'auto';
        }
        
        // Scroll to section with navbar offset
        window.scrollTo({
            top: targetSection.offsetTop - navbarHeight,
            behavior: 'smooth'
        });
    });
});

// Discover more button functionality
if (discoverMoreBtn) {
    discoverMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = discoverMoreBtn.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const navbarHeight = navbar.offsetHeight;
        
        window.scrollTo({
            top: targetSection.offsetTop - navbarHeight,
            behavior: 'smooth'
        });
    });
}

// Set active class on menu items with improved detection
function highlightActiveSection() {
    const scrollPosition = window.scrollY;
    const navbarHeight = navbar.offsetHeight;
    
    // Check each section's position relative to scroll position
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 20;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to corresponding link
            const correspondingLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
    
    // Handle home section (header) separately for better UX
    if (scrollPosition < document.getElementById('about').offsetTop - navbarHeight - 20) {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        const homeLink = document.querySelector('.nav-links a[href="#home"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
}

// Memory cards hover effect
memoryCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
});

// Parallax effect for header
window.addEventListener('scroll', function() {
    const scrollValue = window.scrollY;
    if (scrollValue < window.innerHeight) {
        // Parallax effect for shapes
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.2;
            shape.style.transform = `translateY(${scrollValue * speed}px)`;
        });
    }
});

// Handle responsive design issues
function handleResponsiveDesign() {
    const width = window.innerWidth;
    
    // Reset mobile menu when resize
    if (width > 768 && navLinksContainer) {
        navLinksContainer.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
        if (menuToggle) menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = 'auto';
    }
    
    // Adjust hero title font size for small screens
    if (heroTitle) {
        if (width < 400) {
            heroTitle.style.fontSize = '2.2rem';
        } else if (width < 576) {
            heroTitle.style.fontSize = '2.8rem';
        } else if (width < 768) {
            heroTitle.style.fontSize = '3.2rem';
        } else if (width < 900) {
            heroTitle.style.fontSize = '3.8rem';
        } else if (width < 1100) {
            heroTitle.style.fontSize = '4.5rem';
        } else {
            heroTitle.style.fontSize = '5rem';
        }
    }
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    // Pastikan menu mobile tersembunyi di awal
    if (navLinksContainer) {
        navLinksContainer.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Aktifkan link Home di awal
    const homeLink = document.querySelector('.nav-links a[href="#home"]');
    if (homeLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        homeLink.classList.add('active');
    }
    
    // Memperbaiki touch event untuk perangkat mobile
    if ('ontouchstart' in window) {
        navLinks.forEach(link => {
            link.addEventListener('touchstart', function(e) {
                // Pastikan event listener click juga masih bisa berjalan
                this.click();
            });
        });
    }
    
    // Initialize active section highlighting
    highlightActiveSection();
    
    // Animate memory cards with delay
    memoryCards.forEach((card, index) => {
        card.style.opacity = '0';
        setTimeout(() => {
            card.style.transition = 'opacity 0.8s ease, transform 0.5s ease, box-shadow 0.5s ease';
            card.style.opacity = '1';
        }, index * 150);
    });
    
    // Initialize hero animations
    animateHeroElements();
    setupParallaxEffect();
    
    // Initialize member cards animations
    setupMemberCardsEffects();
    
    // Initialize about section effects
    setupAboutSectionEffects();
    
    // Initialize enhanced memory cards effects
    setupMemoryCardsEffects();
    
    // Handle responsive design
    handleResponsiveDesign();
});

// Handle window resize
window.addEventListener('resize', handleResponsiveDesign); 