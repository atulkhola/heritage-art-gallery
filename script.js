// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Set initial states
gsap.set(".gallery-item", { opacity: 0, y: 60 });
gsap.set(".title", { opacity: 0, y: 30 });
gsap.set(".subtitle", { opacity: 0, y: 20 });
gsap.set(".section-title", { opacity: 0, y: 30 });
gsap.set(".section-subtitle", { opacity: 0, y: 20 });

// Header animations on load
const headerTl = gsap.timeline({ delay: 0.5 });

headerTl
  .to(".title", {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: "power3.out"
  })
  .to(".subtitle", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out"
  }, "-=0.8");

// Section header animations
gsap.to(".section-title", {
  opacity: 1,
  y: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".section-header",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse"
  }
});

gsap.to(".section-subtitle", {
  opacity: 1,
  y: 0,
  duration: 0.8,
  ease: "power3.out",
  delay: 0.2,
  scrollTrigger: {
    trigger: ".section-header",
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse"
  }
});

// Gallery items staggered animation
gsap.to(".gallery-item", {
  opacity: 1,
  y: 0,
  duration: 1.2,
  ease: "power3.out",
  stagger: {
    amount: 0.8,
    from: "start"
  },
  scrollTrigger: {
    trigger: ".gallery-grid",
    start: "top 85%",
    end: "bottom 15%",
    toggleActions: "play none none reverse"
  }
});

// Advanced hover animations for gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
  const container = item.querySelector('.artwork-container');
  const image = item.querySelector('.artwork-image img');
  const overlay = item.querySelector('.artwork-overlay');
  const title = item.querySelector('.artwork-title');
  const details = item.querySelector('.artwork-details');
  
  // Create hover timeline for each item
  const hoverTl = gsap.timeline({ paused: true });
  
  hoverTl
    .to(container, {
      y: -10,
      duration: 0.4,
      ease: "power2.out"
    })
    .to(image, {
      scale: 1.05,
      duration: 0.6,
      ease: "power2.out"
    }, 0)
    .to(overlay, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    }, 0.1)
    .to(title, {
      color: "#d4af37",
      duration: 0.3,
      ease: "power2.out"
    }, 0.2)
    .to(details, {
      color: "#888",
      duration: 0.3,
      ease: "power2.out"
    }, 0.2);
  
  // Hover events
  item.addEventListener('mouseenter', () => {
    hoverTl.play();
  });
  
  item.addEventListener('mouseleave', () => {
    hoverTl.reverse();
  });
});

// Parallax effect for header background
gsap.to(".header::before", {
  yPercent: -50,
  ease: "none",
  scrollTrigger: {
    trigger: ".header",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: target,
        ease: "power3.inOut"
      });
    }
  });
});

// View button click animations
document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Create ripple effect
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(212, 175, 55, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = (e.clientX - e.target.offsetLeft) + 'px';
    ripple.style.top = (e.clientY - e.target.offsetTop) + 'px';
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
    
    // Button animation
    gsap.to(this, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });
  });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .view-btn {
    position: relative;
    overflow: hidden;
  }
`;
document.head.appendChild(style);

// Scroll progress indicator (optional enhancement)
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 3px;
  background: linear-gradient(90deg, #d4af37, #f4e4bc);
  z-index: 1000;
  transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

ScrollTrigger.create({
  trigger: "body",
  start: "top top",
  end: "bottom bottom",
  onUpdate: self => {
    gsap.set(progressBar, {
      width: (self.progress * 100) + "%"
    });
  }
});

// Refresh ScrollTrigger on window resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});

// Loading animation
window.addEventListener('load', () => {
  gsap.to('body', {
    opacity: 1,
    duration: 0.5,
    ease: "power2.out"
  });
});

// Set initial body opacity
gsap.set('body', { opacity: 0 });

console.log('🎨 Heritage Art Gallery GSAP animations loaded successfully!'); 