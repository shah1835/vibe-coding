/* ---------------------------
   Buy Now
--------------------------- */
function buyNow() { 
  alert("Thank you for your purchase!"); 
}

/* ---------------------------
   Quantity Selector
--------------------------- */
let quantity = 1;
function increaseQty() { 
  quantity++; 
  document.getElementById('quantity').innerText = quantity; 
}
function decreaseQty() { 
  if(quantity > 1) quantity--; 
  document.getElementById('quantity').innerText = quantity; 
}

/* ---------------------------
   Carousel (Gallery Section)
--------------------------- */
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel img');
const dotsContainer = document.querySelector('.carousel-dots');

slides.forEach((s, i) => {
  const dot = document.createElement('span');
  if(i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => showSlide(i));
  dotsContainer.appendChild(dot);
});

function showSlide(index) {
  slides.forEach((s, i) => { 
    s.classList.toggle('active', i === index); 
    dotsContainer.children[i].classList.toggle('active', i === index); 
  });
  currentSlide = index;
}

function nextSlide() { 
  showSlide((currentSlide + 1) % slides.length); 
}

function prevSlide() { 
  showSlide((currentSlide - 1 + slides.length) % slides.length); 
}

/* ---------------------------
   FAQ Accordion
--------------------------- */
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => { 
    item.classList.toggle('active'); 
  });
});

/* ---------------------------
   Back to Top
--------------------------- */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => { 
  backToTop.classList.toggle('show', window.scrollY > 300); 
});
function scrollToTop() { 
  window.scrollTo({top: 0, behavior: 'smooth'}); 
}

/* ---------------------------
   Scroll-triggered animations
--------------------------- */
const scrollElements = document.querySelectorAll('.animate-on-scroll');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { 
    if(entry.isIntersecting) { 
      entry.target.classList.add('visible'); 
    } 
  });
}, {threshold: 0.2});
scrollElements.forEach(el => observer.observe(el));

/* ---------------------------
   Social Icon Clicks (Footer + Features)
--------------------------- */
document.querySelectorAll('.social-icon').forEach(icon => {
  icon.addEventListener('click', () => {
    const alt = icon.getAttribute('alt').toLowerCase();

    switch(alt) {
      case 'facebook':
        window.open('https://facebook.com', '_blank');
        break;
      case 'twitter':
        window.open('https://twitter.com', '_blank');
        break;
      case 'instagram':
        window.open('https://instagram.com', '_blank');
        break;
      default:
        console.warn('No link set for this icon:', alt);
    }
  });
});

/* ---------------------------
   Countdown Timer + Progress Bar
--------------------------- */
const countdownDuration = 10 * 60 * 1000; // 10 minutes
const countdownEnd = new Date().getTime() + countdownDuration;
const timeSpan = document.getElementById('time');
const progressFill = document.getElementById('progressFill');

setInterval(() => {
  const now = new Date().getTime();
  let distance = countdownEnd - now;
  if(distance < 0) distance = 0;

  // Update time text
  const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
  const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
  const seconds = Math.floor((distance % (1000*60)) / 1000);
  timeSpan.innerText = `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;

  // Update progress bar width
  const percentage = (distance / countdownDuration) * 100;
  progressFill.style.width = `${percentage}%`;

  // Dynamic color & glow
  progressFill.classList.remove('red-glow');
  if (percentage > 50) {
    progressFill.style.background = 'linear-gradient(135deg, #28a745, #71d57c)';
  } else if (percentage > 25) {
    progressFill.style.background = 'linear-gradient(135deg, #ffc107, #ffdd7f)';
  } else {
    progressFill.style.background = 'linear-gradient(135deg, #dc3545, #f86c6b)';
    progressFill.classList.add('red-glow');
  }
}, 1000);

/* ---------------------------
   Testimonial Slider
--------------------------- */
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-slide');
const testimonialDotsContainer = document.querySelector('.testimonial-dots');

testimonials.forEach((t, i) => {
  const dot = document.createElement('span');
  if(i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => showTestimonial(i));
  testimonialDotsContainer.appendChild(dot);
});

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i === index);
    testimonialDotsContainer.children[i].classList.toggle('active', i === index);
  });
  currentTestimonial = index;
}

function nextTestimonial() {
  showTestimonial((currentTestimonial + 1) % testimonials.length);
}

function prevTestimonial() {
  showTestimonial((currentTestimonial - 1 + testimonials.length) % testimonials.length);
}

/* ---------------------------
   Spin-to-Win
--------------------------- */
const spinBtn = document.getElementById('spinBtn');
const spinWheel = document.getElementById('spinWheel');
const spinResult = document.getElementById('spinResult');

const prizes = ['10% Off', 'Free Shipping', 'Accessory', '5% Off', 'No Prize', '15% Off'];
const prizeCount = prizes.length;
const sliceDeg = 360 / prizeCount;

const ctx = spinWheel.getContext('2d');
function drawWheel() {
  for(let i = 0; i < prizeCount; i++){
    ctx.beginPath();
    ctx.moveTo(150,150);
    ctx.arc(150,150,150,(sliceDeg*i)*Math.PI/180,(sliceDeg*(i+1))*Math.PI/180);
    ctx.fillStyle = i%2===0?'#b9968d':'#b27236';
    ctx.fill();
    ctx.strokeStyle='#fff';
    ctx.stroke();
    ctx.save();
    ctx.translate(150,150);
    ctx.rotate((sliceDeg*i+sliceDeg/2)*Math.PI/180);
    ctx.textAlign='right';
    ctx.fillStyle='#fff';
    ctx.font='bold 14px Poppins';
    ctx.fillText(prizes[i],140,5);
    ctx.restore();
  }
}
drawWheel();

spinBtn.addEventListener('click',()=>{
  spinBtn.disabled=true;
  spinResult.innerText='';
  const spins = Math.floor(Math.random()*5)+5;
  const prizeIndex = Math.floor(Math.random()*prizeCount);
  const degrees = spins*360 + prizeIndex*sliceDeg + sliceDeg/2;
  spinWheel.style.transition='transform 4s cubic-bezier(0.33, 1, 0.68, 1)';
  spinWheel.style.transform=`rotate(${degrees}deg)`;
  setTimeout(()=>{
    spinResult.innerText=`You won: ${prizes[prizeIndex]}!`;
    spinWheel.style.transition='none';
    spinWheel.style.transform=`rotate(${(prizeIndex*sliceDeg + sliceDeg/2)%360}deg)`;
    spinBtn.disabled=false;
  },4000);
});

/* ---------------------------
   Hamburger Menu
--------------------------- */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('open');
});
