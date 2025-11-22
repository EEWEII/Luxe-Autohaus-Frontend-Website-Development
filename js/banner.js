class Carousel {
    constructor() {
        this.banner = document.querySelector('.banner');
        this.pic = this.banner.querySelector('.pic');
        this.picItems = this.banner.querySelectorAll('.pic li');
        this.indicators = this.banner.querySelectorAll('.indicator span');
        this.prevBtn = this.banner.querySelector('.prev');
        this.nextBtn = this.banner.querySelector('.next');
        
        this.currentIndex = 0;
        this.timer = null;
        this.isAnimating = false;  // Add animation state flag
        
        this.init();
    }
    
    init() {
        this.picItems[0].classList.add('active');
        this.bindEvents();
        this.startAutoPlay();
    }
    
    bindEvents() {
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                if (!this.isAnimating && index !== this.currentIndex) {
                    this.switchTo(index);
                }
            });
        });
        
        this.prevBtn.addEventListener('click', () => {
            if (!this.isAnimating) this.prev();
        });
        
        this.nextBtn.addEventListener('click', () => {
            if (!this.isAnimating) this.next();
        });
        
        this.banner.addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });
        
        this.banner.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });
    }
    
    switchTo(index) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        // Update indicator state
        this.indicators[this.currentIndex].classList.remove('active');
        this.indicators[index].classList.add('active');
        
        // Update image state
        this.picItems[this.currentIndex].classList.remove('active');
        this.picItems[index].classList.add('active');
        
        // Switch image
        this.pic.style.transform = `translateX(-${index * 25}%)`;
        
        // Update state after animation ends
        setTimeout(() => {
            this.isAnimating = false;
        }, 800);  // Match CSS transition time
        
        this.currentIndex = index;
    }
    
    prev() {
        const index = this.currentIndex - 1 < 0 ? 3 : this.currentIndex - 1;
        this.switchTo(index);
    }
    
    next() {
        const index = this.currentIndex + 1 > 3 ? 0 : this.currentIndex + 1;
        this.switchTo(index);
    }
    
    startAutoPlay() {
        this.timer = setInterval(() => {
            this.next();
        }, 4000);  // Increase to 4 seconds
    }
    
    stopAutoPlay() {
        clearInterval(this.timer);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
}); 