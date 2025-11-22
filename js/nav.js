document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  const hasSubmenuItems = document.querySelectorAll('.has-submenu');
  const body = document.body;

  // Hamburger menu click event
  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    nav.classList.toggle('active');
    body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  });

  // Handle submenu click events
  hasSubmenuItems.forEach(item => {
    const link = item.querySelector('a');
    
    link.addEventListener('click', function(e) {
      // Only handle clicks on mobile
      if (window.innerWidth <= 768) {
        e.preventDefault(); // Prevent link navigation
        
        // Close other open submenus
        hasSubmenuItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current submenu state
        item.classList.toggle('active');
      }
    });
  });

  // Close navigation when clicking submenu items
  nav.querySelectorAll('.submenu a').forEach(subLink => {
    subLink.addEventListener('click', () => {
      navToggle.classList.remove('active');
      nav.classList.remove('active');
      body.style.overflow = '';
      // Close all submenus
      hasSubmenuItems.forEach(item => item.classList.remove('active'));
    });
  });

  // Close navigation when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
      navToggle.classList.remove('active');
      nav.classList.remove('active');
      body.style.overflow = '';
      // Close all submenus
      hasSubmenuItems.forEach(item => item.classList.remove('active'));
    }
  });

  // Listen for window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      navToggle.classList.remove('active');
      nav.classList.remove('active');
      body.style.overflow = '';
      hasSubmenuItems.forEach(item => item.classList.remove('active'));
    }
  });
}); 