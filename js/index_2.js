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

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextCard, 3000); // Adjust the interval as needed
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    document.querySelector('.next-button').addEventListener('click', () => {
        nextCard();
        resetAutoSlide();
    });

    document.querySelector('.prev-button').addEventListener('click', () => {
        prevCard();
        resetAutoSlide();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToCard(index);
            resetAutoSlide();
        });
    });

    // Start auto sliding
    startAutoSlide();

    showCard(currentIndex);
});
