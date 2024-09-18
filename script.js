let controller;
let slideScene;
let pageScene;
let detailScene;

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
let burger = document.querySelector(".burger");
function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}

window.addEventListener("mouseover", activeCursor);
function activeCursor(e) {
  const item = e.target;
  if (item.id === "logo" || item.classList.contains("burger")) {
    mouse.classList.add("nav-active");
  } else {
    mouse.classList.remove("nav-active");
  }
  if (item.classList.contains("explore")) {
    mouse.classList.add("explore-active");
    gsap.to(".title-swipe", 1, { y: "0%" });
    mouseTxt.innerText = "Tap";
  } else {
    mouse.classList.remove("explore-active");
    mouseTxt.innerText = "";
    gsap.to(".title-swipe", 1, { y: "100%" });
  }
}
burger.addEventListener("click", navToggle);
function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "black" });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "black" });
    gsap.to("#logo", 1, { color: "black" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "#333" });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "#333" });
    gsap.to("#logo", 1, { color: "#333" });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
    document.body.classList.remove("hide");
  }
}

// ADDING TRANSITIONS

const logo = document.querySelector("#logo");
barba.init({
  views: [
    {
      namespace: "home",
      beforeEnter() {
        animateSlides();
        logo.href = "./index.html";
      },
      beforeLeave() {
        slideScene.destroy();
        pageScene.destroy();
        controller.destroy();
      },
    },
    {
      namespace: "products",
      beforeEnter() {
        logo.href = "../index.html";
        detailAnimation();
        gsap.fromTo(
          ".nav-header",
          1,
          { y: "100%" },
          { y: "0%", ease: "power2.inOut" }
        );
      },
    },
  ],
  transitions: [
    {
      leave({ current, next }) {
        let done = this.async();
        window.scrollTo(0, 0);
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
        tl.fromTo(
          ".swipe",
          0.75,
          { x: "-100%" },
          { x: "0%", onComplete: done },
          "-=0.5"
        );
      },
      enter({ current, next }) {
        let done = this.async();
        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        tl.fromTo(
          ".swipe",
          0.5,
          { x: "0%" },
          { x: "100%", stagger: 0.25, onComplete: done }
        );
        tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
      },
    },
  ],
});

function detailAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".detail-slide");
  slides.forEach((slide, index, slides) => {
    const slideTl = gsap.timeline({ defaults: { duration: 1 } });
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    const nextImg = nextSlide.querySelector("img");
    slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
    slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
    slideTl.fromTo(nextImg, { x: "50%" }, { x: "0%" });

    detailScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideTl)
      .addIndicators({
        colorStart: "red",
        colorTrigger: "red",
        name: "detailScene",
        indent: 200,
      })
      .addTo(controller);
  });
}
