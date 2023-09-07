var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  slidesPerView: "auto",
  // autoplay: {
  //   delay: 2500,
  //   disableOnInteraction: false,
  // },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

function toggleMenu(el) {
  el.classList.toggle("active");
  document.querySelector("header .container nav").classList.toggle("show");
}

function removeActive(el) {
  if (el) {
    document.querySelector("header .container .burger").classList.remove("active");
    document.querySelector("header .container nav").classList.remove("show");
  }
}

function updateProgressBar(e) {
  // const { scrollLeft, scrollWidth } = document.querySelector(".WhyUs");
  // console.log(scrollLeft);
  // let scrollPercent = `${(scrollLeft / (scrollWidth - window.innerWidth)) * 3525}px`;
  // console.log(scrollWidth);
  // document.querySelector(".progres-line").style.setProperty("--progress", scrollPercent);
  // if(document.querySelector('.WhyUs').scrollWidth <= "568px"){
  //   let scrollPercent = `${scrollLeft / (scrollWidth - window.innerWidth) * 1880}px`
  //   console.log(scrollPercent)
  //   document.querySelector('.progres-line').style.setProperty('--progress', scrollPercent);
  // } else{
  // }
}

let specialSection = document.querySelector(".scroll-reading");
let body = document.querySelector("body");
let isIntersecting = false;

function isIntersectingViewport(element) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isIntersecting = true;
        } else isIntersecting = false;
      });
    },
    { threshold: 0.7 }
  );
  observer.observe(element);
  return isIntersecting;
}

window.addEventListener("wheel", function (e) {
  if (isIntersectingViewport(specialSection)) {
    updateProgressBar(specialSection);
    let totalWidth = specialSection.scrollWidth;
    let visibleWidth = specialSection.offsetWidth;
    specialSection.scrollLeft += e.deltaY;

    if (specialSection.scrollLeft === 0 || specialSection.scrollLeft + visibleWidth >= totalWidth - 100) {
      body.classList.remove("noScroll");
    } else {
      specialSection.scrollIntoView({ block: "center" });
      body.classList.add("noScroll");
    }
  }
});

function updateProgressBar(section) {
  const visibleWidth = section.offsetWidth;

  // Total scrollable width (total width minus visible width)
  const totalScrollableWidth = section.scrollWidth - visibleWidth;

  // Current scroll position from the left of the section (how far it has been scrolled)
  const scrollPosition = section.scrollLeft;

  // Calculate progress bar width in pixels
  const progressBarWidth = (scrollPosition / totalScrollableWidth) * visibleWidth;

  // Update the progress bar width using the calculated pixel value

  document.querySelector(".progres-line").style.setProperty("--progress", `${progressBarWidth}px`);
}
