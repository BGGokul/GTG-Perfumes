const header = document.querySelector(".header");
const webBody = document.body;
const burger = document.querySelector(".burger");
const dropdownLinks = document.querySelectorAll(".navlist .dropdown > a");

burger.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent immediate outside close

  const isOpen = header.classList.toggle("menu-open");
  webBody.classList.toggle("menu-open-body", isOpen);

  burger.setAttribute("aria-expanded", isOpen);
});

/* Mobile dropdown toggle */
dropdownLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    if (window.innerWidth <= 1199) {
      e.preventDefault();
      e.stopPropagation();

      const parent = link.parentElement;
      parent.classList.toggle("open");
    }
  });
});

/* Close menu on outside click */
document.addEventListener("click", (e) => {
  if (header.classList.contains("menu-open") && !e.target.closest(".header")) {
    header.classList.remove("menu-open");
    webBody.classList.remove("menu-open-body");
    burger.setAttribute("aria-expanded", false);
  }
});

// Count Section JS

const counters = document.querySelectorAll(".count");
let hasAnimated = false;

const animateCounter = (counter) => {
  const target = +counter.dataset.target;
  const duration = 1500; // ms
  const startTime = performance.now();

  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(progress * target);

    counter.textContent = `${value}%`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent = `${target}%`;
    }
  };

  requestAnimationFrame(update);
};

const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !hasAnimated) {
      counters.forEach(animateCounter);
      hasAnimated = true;
      observer.disconnect();
    }
  },
  { threshold: 0.4 }
);

observer.observe(document.getElementById("countSection"));

//Accordian

const accordionItemHeaders = document.querySelectorAll(
  ".accordion-item-header"
);

accordionItemHeaders.forEach((accordionItemHeader) => {
  accordionItemHeader.addEventListener("click", (event) => {
    accordionItemHeader.classList.toggle("active");
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if (accordionItemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
    } else {
      accordionItemBody.style.maxHeight = 0;
    }
  });
});

// Product Slider JS

const images = [
  "assets/slider-image.jpg",
  "assets/slider-image-2.png",
  "assets/slider-image-3.png",
  "assets/slider-image.jpg",
  "assets/slider-image-2.png",
  "assets/slider-image-3.png",
];

let currentIndex = 0;

const mainImage = document.getElementById("mainImage");
const thumbnails = document.querySelectorAll(".thumbnails img");
const dotsContainer = document.getElementById("dots");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

// Create dots
images.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.addEventListener("click", () => setSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll("span");

function setSlide(index) {
  currentIndex = index;
  mainImage.src = images[index];

  thumbnails.forEach((thumb, i) =>
    thumb.classList.toggle("active", i === index)
  );

  dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
}

prevBtn.addEventListener("click", () => {
  currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  setSlide(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
  setSlide(currentIndex);
});

thumbnails.forEach((thumb, index) => {
  thumb.addEventListener("click", () => setSlide(index));
});

// Init
setSlide(0);

//Subscription

const plans = document.querySelectorAll(".plan");
const radios = document.querySelectorAll('input[name="plan"]');

radios.forEach((radio, index) => {
  radio.addEventListener("change", () => {
    plans.forEach((plan) => plan.classList.remove("active", "show-double"));

    const selectedPlan = plans[index];
    selectedPlan.classList.add("active");

    if (selectedPlan.dataset.plan === "double") {
      selectedPlan.classList.add("show-double");
    }
  });
});

// Fragrance selection
document.querySelectorAll(".fragranceGrid").forEach((grid) => {
  grid.addEventListener("click", (e) => {
    const item = e.target.closest(".fragrance");
    if (!item) return;

    grid
      .querySelectorAll(".fragrance")
      .forEach((f) => f.classList.remove("active"));

    item.classList.add("active");
  });
});
