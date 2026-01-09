/* =====================
   Utilities
===================== */
const $ = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => [...scope.querySelectorAll(sel)];
const isMobile = () => window.innerWidth <= 1199;

/* =====================
   Header / Burger Menu
===================== */
const header = $(".header");
const burger = $(".burger");
const body = document.body;

if (burger && header) {
  burger.addEventListener("click", (e) => {
    e.stopPropagation();

    const isOpen = header.classList.toggle("menu-open");
    body.classList.toggle("menu-open-body", isOpen);
    burger.setAttribute("aria-expanded", isOpen);
  });

  document.addEventListener("click", (e) => {
    if (
      header.classList.contains("menu-open") &&
      !e.target.closest(".header")
    ) {
      header.classList.remove("menu-open");
      body.classList.remove("menu-open-body");
      burger.setAttribute("aria-expanded", "false");
    }
  });
}

/* =====================
   Mobile Dropdowns
===================== */
document.addEventListener("click", (e) => {
  const link = e.target.closest(".navlist .dropdown > a");
  if (!link || !isMobile()) return;

  e.preventDefault();
  e.stopPropagation();
  link.parentElement.classList.toggle("open");
});

/* =====================
   Counter Animation
===================== */
const counters = $$(".count");
const countSection = $("#countSection");

if (counters.length && countSection) {
  const animateCounter = (el) => {
    const target = Number(el.dataset.target) || 0;
    const duration = 1500;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = `${Math.floor(progress * target)}%`;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = `${target}%`;
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    ([entry], obs) => {
      if (entry.isIntersecting) {
        counters.forEach(animateCounter);
        obs.disconnect();
      }
    },
    { threshold: 0.1 }
  );

  observer.observe(countSection);
}

/* =====================
   Accordion
===================== */
document.addEventListener("click", (e) => {
  const header = e.target.closest(".accordion-item-header");
  if (!header) return;

  header.classList.toggle("active");
  const body = header.nextElementSibling;

  if (!body) return;
  body.style.maxHeight = header.classList.contains("active")
    ? body.scrollHeight + "px"
    : "0";
});

/* =====================
   Product Slider
===================== */
const images = [
  "assets/slider-image.jpg",
  "assets/slider-image-2.png",
  "assets/slider-image-3.png",
  "assets/slider-image.jpg",
  "assets/slider-image-2.png",
  "assets/slider-image-3.png",
];

const mainImage = $("#mainImage");
const thumbnails = $$(".thumbnails img");
const dotsContainer = $("#dots");
const prevBtn = $(".prev");
const nextBtn = $(".next");

let currentIndex = 0;

if (mainImage && dotsContainer) {
  const dots = images.map((_, i) => {
    const dot = document.createElement("span");
    dot.addEventListener("click", () => setSlide(i));
    dotsContainer.appendChild(dot);
    return dot;
  });

  function setSlide(index) {
    currentIndex = index;
    mainImage.src = images[index];

    thumbnails.forEach((t, i) => t.classList.toggle("active", i === index));
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  prevBtn?.addEventListener("click", () =>
    setSlide((currentIndex - 1 + images.length) % images.length)
  );

  nextBtn?.addEventListener("click", () =>
    setSlide((currentIndex + 1) % images.length)
  );

  thumbnails.forEach((t, i) => t.addEventListener("click", () => setSlide(i)));

  setSlide(0);
}

/* =====================
   Subscription Plans
===================== */
const plans = $$(".plan");
const radios = $$('input[name="plan"]');

radios.forEach((radio, index) => {
  radio.addEventListener("change", () => {
    plans.forEach((p) => p.classList.remove("active", "show-double"));

    const selected = plans[index];
    selected?.classList.add("active");

    if (selected?.dataset.plan === "double") {
      selected.classList.add("show-double");
    }
  });
});

/* =====================
   Fragrance Selection
===================== */
$$(".fragranceGrid").forEach((grid) => {
  grid.addEventListener("click", (e) => {
    const item = e.target.closest(".fragrance");
    if (!item) return;

    $$(".fragrance", grid).forEach((f) => f.classList.remove("active"));

    item.classList.add("active");
  });
});
