let controller;
let slideScene;
let pageScene;

function animateSlides() {
  // init controller
  controller = new ScrollMagic.Controller();

  //selecting stuffs
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");

  //looping all slides
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");

    //gsap
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inout" },
    });
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" }, "-=1");
    slideTl.fromTo(img, { scale: 2 }, { scale: 1 });
    slideTl.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
    slideTl.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");

    //Creating scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false, //using reverse false so that when we scroll backup below slide classes wont be disappearing
    })
      .setTween(slideTl)
      .addIndicators({
        colorStart: "red",
        colorTrigger: "red",
        name: "slide",
      })
      .addTo(controller);
    // Second Animation
    const pageTL = gsap.timeline();
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    pageTL.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageTL.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    pageTL.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
    //create new scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      .addIndicators({
        colorStart: "red",
        colorTrigger: "red",
        name: "page",
        indent: 200,
      })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTL)
      .addTo(controller);
  });
}

// Cursor Animation
window.addEventListener("mousemove", cursor);
let mouse = document.querySelector(".cursor");
let mouseTxt = mouse.querySelector("span");
function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}

window.addEventListener("mouseover", activecursor);
function activecursor(e) {
  const item = e.target;
  if (item.id === "logo" || item.classList.contains("burger")) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }
  if(item.classList.contains("explore")){
    mouse.classList.add("explore-active");
    gsap.to(".title-swipe",1,{y:"0%"});
    mouseTxt.innerText="Tap";
  }
  else{
    mouse.classList.remove("explore-active");
    mouseTxt.innerText="";
    gsap.to(".title-swipe",1,{y:"100%"});
  }
}
animateSlides();
