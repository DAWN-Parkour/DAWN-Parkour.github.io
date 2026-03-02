// Copy BibTeX to clipboard
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');

    if (bibtexElement) {
        navigator.clipboard.writeText(bibtexElement.textContent).then(function() {
            // Success feedback
            button.classList.add('copied');
            copyText.textContent = 'Cop';

            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = bibtexElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);

            button.classList.add('copied');
            copyText.textContent = 'Cop';
            setTimeout(function() {
                button.classList.remove('copied');
                copyText.textContent = 'Copy';
            }, 2000);
        });
    }
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// Video autoplay when in view
function setupVideoCarouselAutoplay() {
    const carouselVideos = document.querySelectorAll('.video-card video');

    if (carouselVideos.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(e => {
                    console.log('Autoplay prevented:', e);
                });
            } else {
                video.pause();
            }
        });
    }, {
        threshold: 0.5
    });

    carouselVideos.forEach(video => {
        observer.observe(video);
    });
}

// Simulation Carousel
var simIdx = 0;
var simSlider = document.querySelector('.sim-carousel-slider');
var simTotal = document.querySelectorAll('.sim-carousel-slide').length;
var simDots = document.querySelectorAll('.sim-dot');

function simCarouselGo(idx) {
    simDots[simIdx].classList.remove('active');
    simIdx = ((idx % simTotal) + simTotal) % simTotal;
    simSlider.style.transform = 'translateX(-' + (simIdx * 100) + '%)';
    simDots[simIdx].classList.add('active');
}

function simCarouselNav(dir) {
    simCarouselGo(simIdx + dir);
}

// Lightbox for method figure
document.querySelector('.method-figure img').addEventListener('click', function () {
    const overlay = document.createElement('div');
    overlay.className = 'img-lightbox-overlay';
    const img = document.createElement('img');
    img.src = this.src;
    img.alt = this.alt;
    overlay.appendChild(img);
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('active'));
    overlay.addEventListener('click', () => {
        overlay.classList.remove('active');
        overlay.addEventListener('transitionend', () => overlay.remove());
    });
});

setupVideoCarouselAutoplay();
