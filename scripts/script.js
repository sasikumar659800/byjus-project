console.clear();
const slides = document.querySelectorAll("section");
const container = document.querySelector("#panelWrap");
let dur = 0.5;
let offsets = [];
let oldSlide = 0;
let activeSlide = 0;
let dots = document.querySelector(".dots");
let navDots = [];
let iw = window.innerWidth;
const mouseAnim = gsap.timeline({
  repeat: -1,
  repeatDelay: 1
});
const handAnim = gsap.timeline({
  repeat: -1,
  repeatDelay: 1
});
const cursorAnim = gsap.timeline({
  repeat: -1,
  repeatDelay: 1
});
const arrowAnim = gsap.timeline({
  repeat: -1,
  repeatDelay: 1
});

document.querySelector("#leftArrow").addEventListener("click", slideAnim);
document.querySelector("#rightArrow").addEventListener("click", slideAnim);
document.addEventListener("keydown", slideAnim);

// create the dataoption for link
for (let i = 0; i < slides.length; i++) {
  const dataOption = "[data-option='" + i + "']";
  if (document.querySelector(dataOption)) {
    document.querySelector(dataOption).addEventListener("click", slideAnim);
  }
}

// create the nav dots
for (let i = 0; i < slides.length; i++) {
  let newDot = document.createElement("div");
  newDot.className = "dot";
  newDot.index = i;
  navDots.push(newDot);
  newDot.addEventListener("click", slideAnim);
  dots.appendChild(newDot);
}

// make the whole thing draggable
let dragMe = Draggable.create(container, {
  type: "x",
  edgeResistance: 1,
  snap: offsets,
  inertia: false,
  bounds: "#masterWrap",
  onDrag: tweenDot,
  onThrowUpdate: tweenDot,
  onDragEnd: slideAnim,
  allowNativeTouchScrolling: false,
  zIndexBoost: false,
});

dragMe[0].id = "dragger";
sizeIt();

// main action check which of the 4 types of interaction called the function
function slideAnim(e) {
  oldSlide = activeSlide;
  // dragging the panels
  if (this.id === "dragger") {
    activeSlide = offsets.indexOf(this.endX);
  } else {
    if (gsap.isTweening(container)) {
      return;
    }
    // arrow clicks
    if (this.id === "leftArrow" || this.id === "rightArrow") {
      activeSlide =
        this.id === "rightArrow" ? (activeSlide += 1) : (activeSlide -= 1);
    } // keyboard navigation
    else if (e.keyCode === 37 || e.keyCode === 39) {
      activeSlide = e.keyCode === 39 ? (activeSlide += 1) : (activeSlide -= 1);
    } // click on a dot
    else if (this.className === "dot") {
      console.log(this.index, "asda");
      activeSlide = this.index;
      // menu link
    } else if (this.className === "sidenav-option") {
      activeSlide = Number(this.getAttribute("data-option"));
      closeNav();
      // scrollwheel
    } else {
      activeSlide = e.deltaY > 0 ? (activeSlide += 1) : (activeSlide -= 1);
    }
  }
  // make sure we're not past the end or beginning slide
  activeSlide = activeSlide < 0 ? 0 : activeSlide;
  activeSlide =
    activeSlide > slides.length - 1 ? slides.length - 1 : activeSlide;
  if (oldSlide === activeSlide) {
    return;
  }
  // if we're dragging we don't animate the container
  if (this.id != "dragger") {
    console.log(this.id, "asdas");
    // gsap.to(container, dur, { x: offsets[activeSlide], onUpdate: tweenDot });
    var tl = new TimelineMax();
    tl.to("#panelWrap", 0, {
      duration: 0.5,
      x: offsets[activeSlide],
      opacity: 0.1,
      ease: Power2.easeOutIn,
    }).to("#panelWrap", 0, {
      opacity: 1,
      ease: Power1.easeInOut,
    });
  }
}
// update the draggable element snap points
function sizeIt() {
  offsets = [];
  iw = window.innerWidth;
  gsap.set("#panelWrap", {
    width: slides.length * iw
  });
  gsap.set(slides, {
    width: iw
  });
  for (let i = 0; i < slides.length; i++) {
    offsets.push(-slides[i].offsetLeft);
  }
  gsap.set(container, {
    x: offsets[activeSlide]
  });
  dragMe[0].vars.snap = offsets;
}

gsap.set(".hideMe", {
  opacity: 1
});
window.addEventListener("wheel", slideAnim);
window.addEventListener("resize", sizeIt);

// update dot animation when dragger moves
function tweenDot() {
  gsap.set(dotAnim, {
    time: Math.abs(gsap.getProperty(container, "x") / iw) + 1,
  });
}

// sidebar open
function openNav() {
  document.getElementById("Sidebar").style.width = "230px";
  document.getElementById("masterWrap").style.marginLeft = "230px";
}

function closeNav() {
  document.getElementById("Sidebar").style.width = "0";
  document.getElementById("masterWrap").style.marginLeft = "0";
}

// disable draggable
dragMe[0].disable();

// responsive image map
ImageMap("img[usemap]", 500);

//Modal//
$("#myModal1").on("shown.bs.modal", function () {
  $("#video1")[0].play();
});
$("#myModal1").on("hidden.bs.modal", function () {
  $("#video1")[0].pause();
});




//fullscreen toogle
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// function toggleFullscreen(elem) {
//   elem = elem || document.documentElement;

//   if (
//     !document.fullscreenElement &&
//     !document.mozFullScreenElement &&
//     !document.webkitFullscreenElement &&
//     !document.msFullscreenElement
//   ) {
//     document
//       .getElementById("fullscreen")
//       .setAttribute("data-original-title", "Exit Fullscreen");
//     if (elem.requestFullscreen) {
//       elem.requestFullscreen();
//     } else if (elem.msRequestFullscreen) {
//       elem.msRequestFullscreen();
//     } else if (elem.mozRequestFullScreen) {
//       elem.mozRequestFullScreen();
//     } else if (elem.webkitRequestFullscreen) {
//       elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
//     }
//   } else {
//     document
//       .getElementById("fullscreen")
//       .setAttribute("data-original-title", "Fullscreen");
//     if (document.exitFullscreen) {
//       document.exitFullscreen();
//     } else if (document.msExitFullscreen) {
//       document.msExitFullscreen();
//     } else if (document.mozCancelFullScreen) {
//       document.mozCancelFullScreen();
//     } else if (document.webkitExitFullscreen) {
//       document.webkitExitFullscreen();
//     }
//   }
// }
// document.getElementById("fullscreen").addEventListener("click", function () {
//   toggleFullscreen();
// });

function ReLoadImages() {
  $('img[data-src]').each(function () {
    $(this).attr('src', $(this).attr('data-src'));
  });
}

document.addEventListener('readystatechange', event => {
  if (event.target.readyState === "interactive") {
    ReLoadImages();
  }
});