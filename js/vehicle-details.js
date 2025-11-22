document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const vehicleId = urlParams.get('id');
  const vehicle = vehicleData[vehicleId];
  
  if (!vehicle) {
    handleVehicleNotFound();
    return;
  }
  
  // Populate page content
  populateContent(vehicle);
  
  // Initialize animations
  initAnimations();
  
  // Initialize form handler
  initFormHandler();
});

function populateContent(vehicle) {
  // Populate showcase section
  document.querySelector('.showcase-section .vehicle-name').textContent = vehicle.name;
  document.querySelector('.showcase-section .showcase-image img').src = vehicle.images[0];
  
  // Populate gallery slider
  const mainImage = document.querySelector('.main-image');
  const thumbsTrack = document.querySelector('.thumbs-track');
  let currentIndex = 0;
  
  // Set main image
  mainImage.src = vehicle.images[0];
  
  // Create thumbnails
  vehicle.images.forEach((image, index) => {
    const thumbItem = document.createElement('div');
    thumbItem.className = `thumb-item ${index === 0 ? 'active' : ''}`;
    thumbItem.innerHTML = `<img src="${image}" alt="Thumbnail ${index + 1}">`;
    thumbsTrack.appendChild(thumbItem);
    
    // Click thumbnail to switch main image
    thumbItem.addEventListener('click', () => {
      updateMainImage(index);
    });
  });
  
  // Initialize thumbnail slider
  initThumbsSlider();
  
  // Populate features
  const featuresGrid = document.querySelector('.features-grid');
  Object.entries(vehicle.specifications).forEach(([key, value]) => {
    const div = document.createElement('div');
    div.className = 'feature-item';
    div.innerHTML = `
      <h3>${key}</h3>
      <p>${value}</p>
    `;
    featuresGrid.appendChild(div);
  });
  
  // Populate specs highlight section
  const specsGrid = document.querySelector('.specs-highlight .specs-grid');
  specsGrid.innerHTML = ''; // Clear existing content
  
  // Add power output
  if (vehicle.specifications.Power) {
    const powerCard = document.createElement('div');
    powerCard.className = 'spec-card';
    powerCard.innerHTML = `
      <h3>POWER OUTPUT</h3>
      <p class="spec-value">${vehicle.specifications.Power}</p>
    `;
    specsGrid.appendChild(powerCard);
  }
  
  // Add acceleration time
  if (vehicle.specifications.Acceleration) {
    const accelerationCard = document.createElement('div');
    accelerationCard.className = 'spec-card';
    accelerationCard.innerHTML = `
      <h3>0-62 MPH</h3>
      <p class="spec-value">${vehicle.specifications.Acceleration.split(' in ')[1].split(' seconds')[0]}</p>
    `;
    specsGrid.appendChild(accelerationCard);
  }
  
  // Add top speed
  if (vehicle.specifications["Top Speed"]) {
    const speedCard = document.createElement('div');
    speedCard.className = 'spec-card';
    speedCard.innerHTML = `
      <h3>TOP SPEED</h3>
      <p class="spec-value">${vehicle.specifications["Top Speed"].split(' ')[0]}</p>
    `;
    specsGrid.appendChild(speedCard);
  }
  
  // Populate description
  const descriptionText = document.querySelector('.description-text');
  const descriptionBg = document.querySelector('.description-bg');
  
  if (vehicle.description) {
    // Set background image (using the third image as background)
    const bgImageIndex = Math.min(2, vehicle.images.length - 1); // Use third image or last available
    descriptionBg.style.backgroundImage = `url('${vehicle.images[bgImageIndex]}')`;
    
    // Convert <br> tags in description to actual paragraphs
    const paragraphs = vehicle.description.split('<br><br>');
    descriptionText.innerHTML = paragraphs
      .map(para => `<p>${para.trim()}</p>`)
      .join('');
  }
}

function initAnimations() {
  document.querySelector('.showcase-content').classList.add('animate-fade-up');
  document.querySelector('.showcase-image img').classList.add('animate-fade-scale');
  
  // Add scroll listener to trigger animations
  const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target); // Animation triggers only once
      }
    });
  };

  const scrollObserver = new IntersectionObserver(animateOnScroll, {
    threshold: 0.2
  });

  // Observe elements that need animation
  document.querySelectorAll('.spec-card, .gallery-item, .feature-item, .description-content').forEach(el => {
    el.classList.add('animate-on-scroll');
    scrollObserver.observe(el);
  });
}

// Add thumbnail slider functionality
function initThumbsSlider() {
  const thumbsTrack = document.querySelector('.thumbs-track');
  const thumbItems = document.querySelectorAll('.thumb-item');
  const prevBtn = document.querySelector('.thumb-nav.prev');
  const nextBtn = document.querySelector('.thumb-nav.next');
  const mainImage = document.querySelector('.main-image');
  const sliderMain = document.querySelector('.slider-main');
  
  let currentIndex = 0;
  const itemWidth = 165;
  const visibleItems = Math.floor(thumbsTrack.parentElement.offsetWidth / itemWidth);
  
  // Create image container
  const imageTrack = document.createElement('div');
  imageTrack.className = 'image-track';
  
  // Create two image containers for switching
  const img1 = document.createElement('div');
  const img2 = document.createElement('div');
  img1.className = 'slide-container active';
  img2.className = 'slide-container';
  
  // Set initial image
  img1.innerHTML = `<img src="${mainImage.src}" class="main-image">`;
  imageTrack.appendChild(img1);
  imageTrack.appendChild(img2);
  
  // Replace original content
  sliderMain.innerHTML = '';
  sliderMain.appendChild(imageTrack);
  
  function updateMainImage(index, direction = 'next') {
    if (currentIndex === index) return;
    
    const currentSlide = imageTrack.querySelector('.slide-container.active');
    const nextSlide = imageTrack.querySelector('.slide-container:not(.active)');
    
    // Prepare next image
    nextSlide.innerHTML = `<img src="${thumbItems[index].querySelector('img').src}" class="main-image">`;
    
    // Set initial position and transition
    nextSlide.style.display = 'block';
    nextSlide.style.transform = `translateX(${direction === 'next' ? '100%' : '-100%'})`;
    
    // Add transition effect
    requestAnimationFrame(() => {
      currentSlide.style.transform = `translateX(${direction === 'next' ? '-100%' : '100%'})`;
      nextSlide.style.transform = 'translateX(0)';
    });
    
    // Clean up after transition
    setTimeout(() => {
      currentSlide.classList.remove('active');
      nextSlide.classList.add('active');
      currentSlide.style.display = 'none';
      currentSlide.style.transform = 'translateX(0)';
    }, 500);
    
    currentIndex = index;
    
    // Update thumbnail states
    thumbItems.forEach(item => item.classList.remove('active'));
    thumbItems[index].classList.add('active');
    
    // Scroll thumbnails into view
    const scrollPosition = index * itemWidth;
    thumbsTrack.style.transform = `translateX(${Math.min(0, Math.max(-(thumbItems.length - visibleItems) * itemWidth, -scrollPosition))}px)`;
    thumbsTrack.style.transition = 'transform 0.5s';
  }
  
  // Bind navigation button events
  prevBtn.addEventListener('click', () => {
    const newIndex = (currentIndex - 1 + thumbItems.length) % thumbItems.length;
    updateMainImage(newIndex, 'prev');
  });
  
  nextBtn.addEventListener('click', () => {
    const newIndex = (currentIndex + 1) % thumbItems.length;
    updateMainImage(newIndex, 'next');
  });
  
  // Click thumbnails to switch
  thumbItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      const direction = index > currentIndex ? 'next' : 'prev';
      updateMainImage(index, direction);
    });
  });
} 

function handleFormSubmission(event) {
  event.preventDefault(); // Prevent default form submission
  
  // Get form data
  const formData = new FormData(event.target);
  
  // Here you would typically send the data to your server
  // For demonstration, we'll just show a success message
  alert('Enquiry sent successfully!');
  
  // Clear the form
  event.target.reset();
  
  // Scroll back to the top of the page
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function initFormHandler() {
  const enquiryForm = document.getElementById('enquiry-form');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', handleFormSubmission);
  }
} 