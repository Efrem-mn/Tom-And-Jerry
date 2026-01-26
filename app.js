const menuBtn = document.querySelector(".menu-div");
const exitBtn = document.querySelector(".exit");

let t1 = gsap.timeline({ paused: true });
t1.to(".menu", { opacity: 1, duration: 1, top: 0, ease: Power2.easeInOut });
t1.to(
    ".nav",
    {
        opacity: 1,
        marginBottom: 0,
        duration: 1,
        ease: Power2.easeInOut,
        stagger: 0.3,
    },
    ">-0.5"
);

menuBtn.addEventListener("click", () => {
    t1.play().timeScale(1);
});

exitBtn.addEventListener("click", () => {
    t1.timeScale(2.5);
    t1.reverse();
});
const video = document.querySelector(".bg-video");

const playPause = document.getElementById("playPause");
const muteUnmute = document.getElementById("muteUnmute");


playPause.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playPause.innerHTML = '<i class="fa-solid fa-pause"></i>';
  } else {
    video.pause();
    playPause.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
});

muteUnmute.addEventListener("click", () => {
  video.muted = !video.muted;
  muteUnmute.innerHTML = video.muted
    ? '<i class="fa-solid fa-volume-xmark"></i>'
    : '<i class="fa-solid fa-volume-high"></i>';
});



document.addEventListener("DOMContentLoaded", () => {
  const sliderTrack = document.getElementById("sliderTrack");

  const thumbnailsData = [
    "img/Movie (1).png","img/Movie (2).png","img/Movie (3).png","img/Movie (4).png",
    "img/Movie (5).png","img/Movie (6).png","img/Movie (7).png","img/Movie (8).png",
    "img/Movie (9).png","img/Movie (10).png","img/Movie (1).jfif"
  ];

  [...thumbnailsData, ...thumbnailsData].forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    sliderTrack.appendChild(img);
  });

  let position = 0;
  const speed = 0.6; 

  function animate() {
    position -= speed;

    const firstImg = sliderTrack.children[0];
    const imgWidth = firstImg.offsetWidth + 15;

    if (Math.abs(position) >= imgWidth) {
      position += imgWidth;
      sliderTrack.appendChild(firstImg);
    }

    sliderTrack.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }

  animate();
});
const thumbnailSlider = document.querySelector(".thumbnail-slider");

menuBtn.addEventListener("click", () => {
    thumbnailSlider.style.opacity = "0";
    thumbnailSlider.style.pointerEvents = "none";
});

exitBtn.addEventListener("click", () => {
    thumbnailSlider.style.opacity = "1";
    thumbnailSlider.style.pointerEvents = "auto";
});

var radius = 240; 
var autoRotate = true; 
var rotateSpeed = -60; 
var imgWidth = 120; 
var imgHeight = 170; 

setTimeout(init, 1000);

var odrag = document.getElementById('drag-container');
var ospin = document.getElementById('spin-container');
var aImg = ospin.getElementsByTagName('img');
var aEle = aImg; 


ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";

var ground = document.getElementById('ground');
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + (i * (360 / aEle.length)) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

function applyTranform(obj) {
  if(tY > 180) tY = 180;
  if(tY < 0) tY = 0;

  obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
}

function playSpin(yes) {
  ospin.style.animationPlayState = (yes?'running':'paused');
}

var sX, sY, nX, nY, desX = 0,
    desY = 0,
    tX = 0,
    tY = 10;

if (autoRotate) {
  var animationName = (rotateSpeed > 0 ? 'spin' : 'spinRevert');
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}



document.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  var sX = e.clientX,
      sY = e.clientY;

  this.onpointermove = function (e) {
    e = e || window.event;
    var nX = e.clientX,
        nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function (e) {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };

  return false;
};

document.onmousewheel = function(e) {
  e = e || window.event;
  var d = e.wheelDelta / 20 || -e.detail;
  radius += d;
  init(1);
};
const fullscreen = document.getElementById("fullscreen");
const fullscreenImg = document.getElementById("fullscreen-img");

Array.from(aEle).forEach(img => {
  img.addEventListener("click", (e) => {
    e.stopPropagation(); 
    fullscreenImg.src = img.src;
    fullscreen.style.display = "flex";
    playSpin(false); 
  });
});

fullscreen.addEventListener("click", () => {
  fullscreen.style.display = "none";
  fullscreenImg.src = "";
  playSpin(true); 
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    fullscreen.style.display = "none";
    fullscreenImg.src = "";
    playSpin(true);
  }
});
const closeBtn = document.getElementById("close-btn");

closeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  fullscreen.style.display = "none";
  fullscreenImg.src = "";
  playSpin(true);
});
gsap.registerPlugin(ScrollTrigger);

let heros = document.querySelector(".hero-blur-image");
gsap.to(heros, {
  x: 100,
  duration: 2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: heros,        
    start: "top 80%",      
    end: "bottom 20%",    
    toggleActions: "play reverse play reverse"
  }
});


