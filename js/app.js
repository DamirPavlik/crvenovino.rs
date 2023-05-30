const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')
const slider = document.querySelector('.slider');
const dotContainer = document.querySelector('.dots')
const maxSlide = slides.length;
let curSlide = 0

const createDots = () =>{
    slides.forEach((_,i)=>{
        dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
    })
}

const activateDot = (slide) =>{
    document.querySelectorAll('.dots__dot').forEach(dot =>{
        dot.classList.remove('dots__dot--active')
    })

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active')
}


const goToSlide = (slide) =>{
    slides.forEach((s, i)=> (
        s.style.transform = `translateX(${100 * (i - slide)}%)`
    ))
}


const nextSlide = () =>{
    if(curSlide === maxSlide - 1){
        curSlide = 0;
    }else{
        curSlide++
    }
    goToSlide(curSlide)
    activateDot(curSlide)
}

const prevSlide = () =>{
    if(curSlide === 0){
        curSlide = maxSlide -1
    }else{
        curSlide--;
    }
    goToSlide(curSlide)
    activateDot(curSlide)
}

const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
init();

// Event Handlers
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', e=>{
    if(e.key === 'ArrowLeft'){
        prevSlide();
    }
    if (e.key === 'ArrowRight'){
        nextSlide();
    }
})

dotContainer.addEventListener('click', e=>{
    if(e.target.classList.contains('dots__dot')){
        const slide = e.target.dataset.slide;
        goToSlide(slide)
        activateDot(slide)
    }
})


// Image Pop UP
let imgs = document.querySelectorAll('.gallery-item img');
let stepImgs = document.querySelectorAll(".step-img-box img")
let popup = document.querySelector('.popup-img');
let popup_img = document.querySelector('.popup-img img')
let close_btn = document.querySelector('.popup-img span')

stepImgs.forEach(img=>{
    img.addEventListener('click', e=>{
        popup.style.display ='block';
        popup_img.src = img.getAttribute('src')
    })
})

imgs.forEach(img =>{
    img.addEventListener('click', e=>{
        popup.style.display = 'block';
        popup_img.src = img.getAttribute('src')
    })
})

close_btn.addEventListener('click', e=>{
    popup.style.display = 'none';
})

popup.addEventListener('click', e=>{
    popup.style.display = 'none';
})

document.addEventListener('keydown', e=>{
    if(e.key === 'Escape'){
        popup.style.display = 'none';
    }
})

let touchstartX = 0
let touchendX = 0
    
function checkDirection() {
  if (touchendX < touchstartX) nextSlide()
  if (touchendX > touchstartX) prevSlide();
}

let sliderTestimonial = document.querySelector('.slider');

sliderTestimonial.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX
})

sliderTestimonial.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX
  checkDirection()
})


const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
// e.preventDefault();
    // const href = link.getAttribute("href");

    // Scroll back to top
    // if (href === "#")
    //   window.scrollTo({
    //     top: 0,
    //     behavior: "smooth",
    //   });

//     // Scroll to other links
    // if (href !== "#" && href.startsWith("#")) {
    //   const sectionEl = document.querySelector(href);
    //   // sectionEl.scrollIntoView({inline:"nearest", behavior: "smooth" });
    //   sectionEl.scrollTo({
    //     top:0
    //   })
    //   console.log(sectionEl)
    // }

//     // Close mobile naviagtion
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

const accordionItems = document.querySelectorAll('.accordion-collapse')
const acc = document.getElementById('accordionExample')

accordionItems.forEach((el)=>{
    el.addEventListener('shown.bs.collapse',(e)=>{
        // var scrollOffset = acc.scrollTop + el.parentNode.offsetTop
        var scrollOffset = acc.scrollTop + el.parentNode.offsetTop - 100
        window.scroll({
            top: scrollOffset,
            left: 0, 
            behavior: 'smooth'
        })

        console.log(scrollOffset)
    })
})

///////////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
   
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);