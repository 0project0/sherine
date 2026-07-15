/* JavaScript for Shereen Sedik Portfolio Website */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Header Scroll Effect ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('open');
            document.body.classList.toggle('nav-open');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                document.body.classList.remove('nav-open');
                const icon = mobileToggle.querySelector('i');
                icon.classList.replace('fa-xmark', 'fa-bars');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('open') && header && !header.contains(e.target)) {
                navMenu.classList.remove('open');
                document.body.classList.remove('nav-open');
                const icon = mobileToggle.querySelector('i');
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    }

    // --- 3. Active Link Highlight on Scroll (Intersection Observer) ---
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // --- 4. Portfolio Filter System ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active from other buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                // Add scale out effect before hiding
                item.style.transform = 'scale(0.85)';
                item.style.opacity = '0';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        item.classList.remove('hidden');
                        setTimeout(() => {
                            item.style.transform = 'scale(1)';
                            item.style.opacity = '1';
                        }, 50);
                    } else {
                        item.classList.add('hidden');
                    }
                }, 250);
            });
        });
    });

    // --- 5. Contact / Order Modal Mapping ---
    const contactModal = document.getElementById('contact-modal');
    const khamsatBtn = document.getElementById('modal-khamsat-btn');
    const modalTitle = document.getElementById('modal-title');
    const triggerButtons = document.querySelectorAll('.trigger-modal-btn');
    const closeModalBtn = document.getElementById('close-modal');

    // Services mapping to Khamsat links
    const servicesLinks = {
        'web': 'https://khamsat.com/programming/custom-website-development/4398706',
        'apps': 'https://khamsat.com/programming/full-app-creation/4399006',
        'games': 'https://khamsat.com/programming/web-games/2990958',
        'cartoon': 'https://khamsat.com/video-design/animation-for-kids/3123943',
        'ugc': 'https://khamsat.com/video-design/video-ads/4396816',
        'books': 'https://khamsat.com/designing/kids-book-design/3273174',
        'general': 'https://khamsat.com/user/shereen_ahmed86'
    };

    // Services title mapping
    const servicesTitles = {
        'web': 'طلب خدمة تصميم المواقع وصفحات الهبوط',
        'apps': 'طلب خدمة تصميم تطبيقات الموبايل',
        'games': 'طلب خدمة الألعاب التعليمية التفاعلية',
        'cartoon': 'طلب خدمة إنتاج الفيديوهات الكرتونية والقصص',
        'ugc': 'طلب خدمة فيديوهات UGC والإعلانات التسويقية',
        'books': 'طلب خدمة تصميم كتب الأطفال وقصص التلوين',
        'general': 'تواصل معي / اطلب خدمتك الإبداعية'
    };

    triggerButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const serviceKey = btn.getAttribute('data-service') || 'general';
            
            // Set correct Khamsat link
            if (khamsatBtn) {
                khamsatBtn.setAttribute('href', servicesLinks[serviceKey] || servicesLinks['general']);
            }
            
            // Set modal title
            if (modalTitle) {
                modalTitle.textContent = servicesTitles[serviceKey] || servicesTitles['general'];
            }

            // Open Modal
            if (contactModal) {
                contactModal.classList.add('open');
                document.body.style.overflow = 'hidden'; // Lock scrolling
            }
        });
    });

    // Close contact modal
    if (closeModalBtn && contactModal) {
        closeModalBtn.addEventListener('click', () => {
            contactModal.classList.remove('open');
            document.body.style.overflow = ''; // Unlock scrolling
        });

        // Close on background click
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                contactModal.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }

    // --- 6. Video Lightbox Modal ---
    const videoModal = document.getElementById('video-modal');
    const videoIframe = document.getElementById('video-iframe');
    const playButtons = document.querySelectorAll('.play-video-btn');
    const closeVideoBtn = document.getElementById('close-video-modal');

    playButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const videoId = btn.getAttribute('data-video-id');
            if (videoId && videoIframe && videoModal) {
                // Set YouTube embed source with autoplay
                videoIframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`);
                videoModal.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeVideoBtn && videoModal && videoIframe) {
        closeVideoBtn.addEventListener('click', () => {
            videoModal.classList.remove('open');
            videoIframe.setAttribute('src', ''); // Clear iframe to stop video playing
            document.body.style.overflow = '';
        });

        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.classList.remove('open');
                videoIframe.setAttribute('src', '');
                document.body.style.overflow = '';
            }
        });
    }

    // --- 7. Image Zoom Lightbox Modal ---
    const imageModal = document.getElementById('image-modal');
    const zoomedImage = document.getElementById('zoomed-image');
    const zoomButtons = document.querySelectorAll('.zoom-image-btn');
    const closeImageBtn = document.getElementById('close-image-modal');
    
    // Gallery navigation controls inside image modal
    const prevImageBtn = document.getElementById('prev-image');
    const nextImageBtn = document.getElementById('next-image');
    const galleryCounter = document.getElementById('gallery-counter');

    let galleryImages = [];
    let currentImageIndex = 0;

    function updateLightboxImage() {
        if (galleryImages.length > 0 && zoomedImage) {
            zoomedImage.setAttribute('src', galleryImages[currentImageIndex]);
            if (galleryCounter) {
                galleryCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
            }
        }
    }

    zoomButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const imageSrc = btn.getAttribute('data-image-src');
            const imagesList = btn.getAttribute('data-images');

            if (imagesList) {
                // It's a gallery
                galleryImages = imagesList.split(',');
                currentImageIndex = 0;
                
                // Show navigation buttons and counter
                if (prevImageBtn) prevImageBtn.style.display = 'flex';
                if (nextImageBtn) nextImageBtn.style.display = 'flex';
                if (galleryCounter) galleryCounter.style.display = 'block';
            } else if (imageSrc) {
                // Single image
                galleryImages = [imageSrc];
                currentImageIndex = 0;

                // Hide navigation buttons and counter
                if (prevImageBtn) prevImageBtn.style.display = 'none';
                if (nextImageBtn) nextImageBtn.style.display = 'none';
                if (galleryCounter) galleryCounter.style.display = 'none';
            }

            if (galleryImages.length > 0 && imageModal) {
                updateLightboxImage();
                imageModal.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Gallery prev/next click event listeners
    if (prevImageBtn) {
        prevImageBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent closing modal
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            updateLightboxImage();
        });
    }

    if (nextImageBtn) {
        nextImageBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent closing modal
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            updateLightboxImage();
        });
    }

    if (closeImageBtn && imageModal && zoomedImage) {
        const closeLightbox = () => {
            imageModal.classList.remove('open');
            zoomedImage.setAttribute('src', '');
            document.body.style.overflow = '';
            galleryImages = [];
        };

        closeImageBtn.addEventListener('click', closeLightbox);

        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                closeLightbox();
            }
        });
    }

    // --- 8. Reviews Slider Carousel ---
    const slides = document.querySelectorAll('.review-slide');
    const prevBtn = document.getElementById('prev-review');
    const nextBtn = document.getElementById('next-review');
    const dotsContainer = document.getElementById('slider-dots');
    
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 6000; // 6 seconds

    if (slides.length > 0) {
        // Generate navigation dots dynamically
        slides.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (idx === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to review slide ${idx + 1}`);
            dot.addEventListener('click', () => {
                goToSlide(idx);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function goToSlide(n) {
            // Remove active from current
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            // Set next index
            currentSlide = (n + slides.length) % slides.length;
            
            // Add active to new slide
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        // Add event listeners for prev/next
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetInterval();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetInterval();
            });
        }

        // Setup autoplay interval
        function startInterval() {
            slideInterval = setInterval(nextSlide, slideDuration);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        // Start slide show
        startInterval();
    }
});
