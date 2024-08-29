let controller;
let slideScene;

function animateSlides(){
    // init controller 
    controller = new ScrollMagic.Controller();

    //selecting stuffs
    const sliders = document.querySelectorAll(".slide");
    const nav = document.querySelector(".nav-header");

    //looping all slides
    sliders.forEach(slide =>{
        const revealImg = slide.querySelector(".reveal-img");
        const img = slide.querySelector("img");
        const revealText = slide.querySelector(".reveal-text");

        //gsap
        const slideTl = gsap.timeline ({
            defaults: {duration: 1, ease: "power2.inout"}
        });     
        slideTl.fromTo(revealImg, {x: "0%"}, {x:"100%"}, "-=1");
        slideTl.fromTo(img, {scale: 2}, {scale:1});
        slideTl.fromTo(revealText, {x:"0%"}, {x:"100%"}, "-=0.75");
        slideTl.fromTo(nav, {y:"-100%"}, {y:"0%"}, "-=0.5");
    })


}

animateSlides()