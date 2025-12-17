// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link, .contact-btn');

// Toggle mobile menu
mobileMenuToggle.addEventListener('click', () => {
  mobileMenuToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  
  // Prevent body scroll when menu is open
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
    mobileMenuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Initialize Swiper for Portfolio
// const portfolioSwiper = new Swiper('.portfolioSwiper', {
//   slidesPerView: 1,
//   spaceBetween: 20,
//   loop: true,
//   autoplay: {
//     delay: 3000,
//     disableOnInteraction: false,
//   },
//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true,
//     dynamicBullets: true,
//   },
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
//   breakpoints: {
//     480: {
//       slidesPerView: 2,
//       spaceBetween: 20,
//     },
//     768: {
//       slidesPerView: 2,
//       spaceBetween: 30,
//     },
//   },
// });

// Enhanced skill progress rings animation
const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px'
};

const animateSkillRings = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const circle = entry.target.querySelector('.progress-ring-circle');
      const percentage = entry.target.querySelector('.skill-percentage');
      
      if (circle && percentage) {
        // Add gradient definition if not exists
        const svg = circle.closest('svg');
        if (!svg.querySelector('defs')) {
          const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
          const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
          gradient.setAttribute('id', 'gradient');
          gradient.setAttribute('x1', '0%');
          gradient.setAttribute('y1', '0%');
          gradient.setAttribute('x2', '100%');
          gradient.setAttribute('y2', '100%');
          
          const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
          stop1.setAttribute('offset', '0%');
          stop1.setAttribute('style', 'stop-color:#925ff0;stop-opacity:1');
          
          const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
          stop2.setAttribute('offset', '100%');
          stop2.setAttribute('style', 'stop-color:#a87ff3;stop-opacity:1');
          
          gradient.appendChild(stop1);
          gradient.appendChild(stop2);
          defs.appendChild(gradient);
          svg.insertBefore(defs, svg.firstChild);
        }
        
        // Animate from full circle to 97% (3% gap)
        const circumference = 628;
        const targetOffset = circumference * 0.03; // 3% gap = 97% filled
        
        // Start from full circle
        circle.style.strokeDashoffset = circumference;
        
        // Animate to target
        setTimeout(() => {
          circle.style.strokeDashoffset = targetOffset;
        }, 100);
        
        // Animate percentage counter
        let currentPercentage = 0;
        const targetPercentage = 97;
        const duration = 1500;
        const increment = targetPercentage / (duration / 16);
        
        const counter = setInterval(() => {
          currentPercentage += increment;
          if (currentPercentage >= targetPercentage) {
            currentPercentage = targetPercentage;
            clearInterval(counter);
          }
          percentage.textContent = Math.round(currentPercentage) + '%';
        }, 16);
      }
      observer.unobserve(entry.target);
    }
  });
};

const skillObserver = new IntersectionObserver(animateSkillRings, observerOptions);

document.querySelectorAll('.skill-card').forEach(card => {
  skillObserver.observe(card);
});

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

const highlightNavigation = () => {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
};

window.addEventListener('scroll', highlightNavigation);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  // ESC key closes mobile menu
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    mobileMenuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Portfolio card interactions
const portfolioCards = document.querySelectorAll('.portfolio-card');

portfolioCards.forEach(card => {
  const button = card.querySelector('.card-button');
  
  button.addEventListener('click', (e) => {
    e.preventDefault();
    // Add your portfolio detail navigation logic here
    console.log('Portfolio card clicked:', card.querySelector('.card-title').textContent);
    alert('Portfolio detail page would open here');
  });
});

// CV Download button
const cvButton = document.querySelector('.cv-download-btn');

cvButton.addEventListener('click', (e) => {
  e.preventDefault();
  // Add your CV download logic here
  console.log('CV download initiated');
  alert('CV download would start here');
});

// Add loading animation for images
const images = document.querySelectorAll('img');

images.forEach(img => {
  img.addEventListener('load', () => {
    img.classList.add('loaded');
  });
});

// Parallax effect for hero image (optional enhancement)
// const heroImage = document.querySelector('.hero-image img');

// if (heroImage && window.innerWidth > 768) {
//   window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const rate = scrolled * 0.3;
//     heroImage.style.transform = `translateY(${rate}px)`;
//   });
// }

// Console welcome message
console.log('%c👋 Welcome to Cristian Munoz Portfolio!', 'color: #925ff0; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out the repository!', 'color: #c8fec7; font-size: 14px;');
