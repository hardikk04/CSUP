function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco();
var line = document.querySelector(".line");
var h6 = document.querySelector(".loder-line>h6");

line.style.width = "0%";

var num = 0;

var interval = setInterval(function () {
  if (num < 80) {
    num = num + Math.floor(Math.random() * 41);
    h6.innerHTML = num;
    line.style.width = num + "%";
  } else {
    num = 100;
    h6.innerHTML = num;
    over();
    clearInterval(interval);
  }
  console.log(num);
}, 300);

var t1 = gsap.timeline();

function over() {
  t1.to(".page1-main > img:nth-child(4),.loder-line", {
    opacity: 0,
    duration: 1,
  });

  t1.to(
    ".loder-top",
    1.5,
    {
      top: "-50%",
      delay: 1,
      duration: 1,
      ease: "power1.inOut",
    },
    0.5
  );

  t1.to(
    ".loder-bottom",
    1.5,
    {
      bottom: "-50%",
      delay: 1,
      duration: 1,
      ease: "power1.inOut",
    },
    0.5
  );

  t1.to(".loder-top, .loder-bottom", {
    opacity: 0,
    scale: 0,
  });

  t1.to(
    ".main-img>img",
    0.5,
    {
      delay: 1,
      filter: "grayscale(0)",
    },
    0.5
  );

  t1.to(".main-img, .main-img>img", {
    height: "85vh",
    width: "50vh",
    duration: 0.6,
    ease: "power1.inOut",
  });

  t1.to("nav , .circle-box", {
    opacity: 1,
  });

  t1.from(".page1-main > img:nth-child(1)", {
    opacity: 0,
    duration: 0.5,
    transform: "translate(0%, -50%) rotate(0deg)",
    ease: "power1.inOut",
  });

  t1.from(".page1-main > img:nth-child(2)", {
    opacity: 0,
    duration: 0.5,
    transform: "translate(-100%, -50%) rotate(0deg)",
    ease: "power1.inOut",
  });

  t1.to(".page1-main >h1", {
    opacity: 1,
    onStart: function () {
      $(".page1-main >h1").textillate({
        delay: 50,
        in: { effect: "fadeInUp" },
      });
    },
  });
}

document
  .querySelector(".main-img>img")
  .addEventListener("mouseenter", function () {
    gsap.to(".page1-main > img:nth-child(1)", {
      transform: "translate(-40%, -50%) rotate(-10deg)",
    });

    gsap.to(".page1-main > img:nth-child(2)", {
      transform: "translate(-60%, -50%) rotate(10deg)",
    });
  });

document
  .querySelector(".main-img>img")
  .addEventListener("mouseleave", function () {
    gsap.to(".page1-main > img:nth-child(1)", {
      transform: "translate(-50%, -50%) rotate(-15deg)",
    });

    gsap.to(".page1-main > img:nth-child(2)", {
      transform: "translate(-50%, -50%) rotate(15deg)",
    });
  });

// Shery.imageEffect(".main-img", {
//   style: 5, //Select Style
//   debug: true, // Debug Panel
//   config: {
//     a: { value: 2, range: [0, 30] },
//     b: { value: 0.75, range: [-1, 1] },
//     zindex: { value: "99", range: [-9999999, 9999999] },
//     aspect: { value: 2 },
//     gooey: { value: false },
//     infiniteGooey: { value: false },
//     growSize: { value: 4, range: [1, 15] },
//     durationOut: { value: 1, range: [0.1, 5] },
//     durationIn: { value: 1.5, range: [0.1, 5] },
//     displaceAmount: { value: 0.5 },
//     masker: { value: false },
//     maskVal: { value: 1, range: [1, 5] },
//     scrollType: { value: 0 },
//     geoVertex: { range: [1, 64], value: 1 },
//     noEffectGooey: { value: true },
//     onMouse: { value: 1 },
//     noise_speed: { value: 0.2, range: [0, 10] },
//     metaball: { value: 0.2, range: [0, 2] },
//     discard_threshold: { value: 0.5, range: [0, 1] },
//     antialias_threshold: { value: 0.002, range: [0, 0.1] },
//     noise_height: { value: 0.5, range: [0, 2] },
//     noise_scale: { value: 10, range: [0, 100] },
//   },
// });
