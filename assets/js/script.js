// DOM Elements
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section');
const header = document.getElementById('home');
const memoryCards = document.querySelectorAll('.memory-card');
const heroIcons = document.querySelectorAll('.hero-icon');
const heroTitle = document.querySelector('.main-title');
const heroTagline = document.querySelector('.tagline');
const heroQuote = document.querySelector('.hero-quote');
const heroBadge = document.querySelector('.hero-badge');
const discoverMoreBtn = document.querySelector('.discover-more');
const addMemoryBtn = document.getElementById('addMemoryBtn');
const memoryModal = document.getElementById('memoryModal');
const closeModalBtn = document.querySelector('.close-modal');
const memoryForm = document.getElementById('memoryForm');
const imagePreview = document.getElementById('imagePreview');
const memoryImageInput = document.getElementById('memoryImage');
const memoriesGrid = document.querySelector('.memories-grid');
const aboutSection = document.getElementById('about');
const aboutImage = document.querySelector('.about-image');
const memberCards = document.querySelectorAll('.member-card');
const listViewBtns = document.querySelectorAll('.list-view-btn');
const deleteMemoryBtns = document.querySelectorAll('.delete-memory');
const deleteModal = document.getElementById('deleteModal');
const cancelDeleteBtn = document.getElementById('cancelDelete');
const confirmDeleteBtn = document.getElementById('confirmDelete');

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

// Setup delete memory functionality
function setupDeleteMemoryFunctionality() {
    let memoryToDelete = null;
    
    // Open delete confirmation modal
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('delete-memory') || 
            (e.target.parentElement && e.target.parentElement.classList.contains('delete-memory'))) {
            
            // Get the memory card
            const btn = e.target.classList.contains('delete-memory') ? e.target : e.target.parentElement;
            const memoryCard = btn.closest('.memory-card');
            
            if (memoryCard && deleteModal) {
                e.preventDefault();
                memoryToDelete = memoryCard;
                deleteModal.style.display = 'block';
            }
        }
    });
    
    // Cancel delete action
    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', function() {
            memoryToDelete = null;
            deleteModal.style.display = 'none';
        });
    }
    
    // Confirm delete action
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function() {
            if (memoryToDelete) {
                // Animate card removal
                memoryToDelete.style.transition = 'all 0.5s ease';
                memoryToDelete.style.transform = 'scale(0.8)';
                memoryToDelete.style.opacity = '0';
                
                setTimeout(() => {
                    memoryToDelete.remove();
                    memoryToDelete = null;
                    deleteModal.style.display = 'none';
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Memory deleted successfully!';
                    
                    document.body.appendChild(successMessage);
                    
                    setTimeout(() => {
                        successMessage.style.opacity = '0';
                        setTimeout(() => {
                            document.body.removeChild(successMessage);
                        }, 500);
                    }, 2000);
                }, 500);
            }
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === deleteModal) {
            memoryToDelete = null;
            deleteModal.style.display = 'none';
        }
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

// Make navbar sticky on scroll with animation
window.addEventListener('scroll', () => {
    // Navbar effects
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Highlight active menu item based on scroll position
    highlightActiveSection();
});

// Mobile menu toggle with animation
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        
        // Add animation to menu toggle icon
        if (navLinksContainer.classList.contains('active')) {
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            // Animate menu items sequentially
            navLinks.forEach((link, index) => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    link.style.transition = 'all 0.3s ease';
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0)';
                }, 100 * index);
            });
        } else {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        if (menuToggle) {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Smooth scroll for navigation links with improved animation
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const navbarHeight = navbar.offsetHeight;
        
        // Smooth scroll with easing
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
        const sectionTop = section.offsetTop - navbarHeight - 100;
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
    if (scrollPosition < document.getElementById('about').offsetTop - navbarHeight - 100) {
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

// Memory Upload Modal Functionality
if (addMemoryBtn && memoryModal) {
    // Open modal
    addMemoryBtn.addEventListener('click', () => {
        memoryModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });

    // Close modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            memoryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === memoryModal) {
            memoryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Image preview functionality for memory upload
if (memoryImageInput && imagePreview) {
    memoryImageInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                imagePreview.innerHTML = `<img src="${e.target.result}" alt="Memory preview">`;
            }
            
            reader.readAsDataURL(file);
        } else {
            imagePreview.innerHTML = `<p>No image selected</p>`;
        }
    });
}

// Memory form submission
if (memoryForm && memoriesGrid) {
    memoryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('memoryTitle').value;
        const date = document.getElementById('memoryDate').value;
        const description = document.getElementById('memoryDescription').value;
        const file = document.getElementById('memoryImage').files[0];
        
        if (title && description && file && date) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Format date for display
                const formattedDate = new Date(date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
                
                // Generate a unique ID for the memory
                const memoryId = 'memory' + Date.now();
                
                // Create new memory card
                const newCard = document.createElement('div');
                newCard.className = 'memory-card';
                newCard.setAttribute('data-aos', 'fade-up');
                newCard.setAttribute('data-id', memoryId);
                
                newCard.innerHTML = `
                    <div class="memory-img">
                        <img src="${e.target.result}" alt="${title}">
                        <div class="memory-actions">
                            <button class="delete-memory" title="Delete Memory"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                    <div class="memory-content">
                        <div class="memory-date">
                            <i class="far fa-calendar-alt"></i> ${formattedDate}
                        </div>
                        <h3>${title}</h3>
                        <p>${description}</p>
                    </div>
                `;
                
                // Apply the same effects to the new card as we do for existing cards
                newCard.addEventListener('mousemove', function(e) {
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
                
                newCard.addEventListener('mouseleave', function() {
                    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 300);
                });
                
                // Add hover effects to the new card
                newCard.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-15px) scale(1.02)';
                    this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
                });
                
                newCard.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                });
                
                // Add the new card to the grid (at the beginning)
                memoriesGrid.insertBefore(newCard, memoriesGrid.firstChild);
                
                // Add entrance animation
                newCard.style.opacity = '0';
                newCard.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    newCard.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    newCard.style.opacity = '1';
                    newCard.style.transform = 'translateY(0)';
                }, 100);
                
                // Clear form and close modal
                memoryForm.reset();
                imagePreview.innerHTML = `<p>No image selected</p>`;
                memoryModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Memory added successfully!';
                
                document.body.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(successMessage);
                    }, 500);
                }, 2000);
            };
            
            reader.readAsDataURL(file);
        }
    });
}

// Handle responsive design issues
function handleResponsiveDesign() {
    const width = window.innerWidth;
    
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
    
    // Initialize delete memory functionality
    setupDeleteMemoryFunctionality();
    
    // Handle responsive design
    handleResponsiveDesign();
});

// Handle window resize
window.addEventListener('resize', handleResponsiveDesign); 