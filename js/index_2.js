document.addEventListener('scroll', function() {
    const progressBar = document.querySelector('.progress-bar');
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY;
    const scrollPercent = (scrollTop / totalHeight) * 100;
    
    progressBar.style.width = scrollPercent + '%';
  });

  document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.testimonial-dots');
    let currentIndex = 0;
    let startX = 0;
    let endX = 0;
    let autoSlideInterval;

    // Create dots dynamically
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === currentIndex) {
            dot.classList.add('active');
        }
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function showCard(index) {
        cards.forEach((card, i) => {
            card.classList.remove('active');
            card.style.left = '100%';
            dots[i].classList.remove('active');
            if (i === index) {
                card.classList.add('active');
                card.style.left = '0';
                dots[i].classList.add('active');
            }
        });
    }

    function nextCard() {
        currentIndex = (currentIndex + 1) % cards.length;
        showCard(currentIndex);
    }

    function prevCard() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        showCard(currentIndex);
    }

    function goToCard(index) {
        currentIndex = index;
        showCard(currentIndex);
    }

    document.querySelector('.next-button').addEventListener('click', nextCard);
    document.querySelector('.prev-button').addEventListener('click', prevCard);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToCard(index));
    });

    // Touch event listeners for swipe
    cards.forEach(card => {
        card.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX;
            stopAutoSlide(); // Stop auto-slide when interacting with the slider
        });

        card.addEventListener('touchmove', (event) => {
            endX = event.touches[0].clientX;
        });

        card.addEventListener('touchend', () => {
            if (startX > endX + 50) { // Swipe left
                nextCard();
            } else if (startX < endX - 50) { // Swipe right
                prevCard();
            }
            startAutoSlide(); // Resume auto-slide after interaction
        });
    });

    // Auto-slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextCard, 3000); // Slide every 3 seconds
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Start auto-slide on load
    startAutoSlide();

    // Pause auto-slide on mouse hover
    document.querySelector('.testimonial-slider').addEventListener('mouseenter', stopAutoSlide);
    document.querySelector('.testimonial-slider').addEventListener('mouseleave', startAutoSlide);

    showCard(currentIndex);
});
