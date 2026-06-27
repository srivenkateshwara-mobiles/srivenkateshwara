const catalogLinks = {
  iphone: "https://drive.google.com/drive/u/0/folders/1iOkfY5BZNNjfzlYlLrBBs6xKRiEm82Gt",
  samsung: "https://drive.google.com/drive/u/0/folders/1-EpURCniXsmC9Mj0m8qkZ_2gsbmtBpHP",
  android: "https://drive.google.com/drive/u/0/folders/1gEcwVv9tZIhbkhIcGx0SPTh9r2ufWTF6"
};

const whatsappUrl = "https://wa.me/918247011020?text=Hello%2C%20I%20am%20interested%20in%20your%20mobile%20accessories.";

const reviews = [
  {
    name: "Rakesh Kumar",
    text: "Very clean store experience. I found a premium iPhone case and tempered glass installation was perfect."
  },
  {
    name: "Sravani",
    text: "Good imported covers and quick service. The owner suggested the right charger for my phone."
  },
  {
    name: "Mahesh",
    text: "Fast repair support and fair pricing. New stock is updated often, especially cases and Bluetooth items."
  }
];

const loader = document.querySelector("[data-loader]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const topButton = document.querySelector("[data-top]");
const searchInput = document.querySelector("[data-search]");
const filterButtons = document.querySelectorAll("[data-filter]");
const items = document.querySelectorAll("[data-tags]");
const testimonial = document.querySelector("[data-testimonial]");
let activeFilter = "all";
let activeReview = 0;

window.addEventListener("load", () => {
  loader?.classList.add("hidden");
});

document.querySelectorAll(".catalog-link").forEach((link) => {
  const key = link.dataset.catalog;
  link.href = catalogLinks[key] || "https://drive.google.com/";
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", () => {
    nav?.classList.remove("open");
  });
});

menuToggle?.addEventListener("click", () => {
  nav?.classList.toggle("open");
});

document.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("svi-theme", document.body.classList.contains("light") ? "light" : "dark");
});

if (localStorage.getItem("svi-theme") === "light") {
  document.body.classList.add("light");
}

function applyFilters() {
  const query = searchInput?.value.trim().toLowerCase() || "";
  items.forEach((item) => {
    const tags = item.dataset.tags.toLowerCase();
    const matchesFilter = activeFilter === "all" || tags.includes(activeFilter);
    const matchesSearch = !query || tags.includes(query) || item.textContent.toLowerCase().includes(query);
    item.classList.toggle("is-hidden", !(matchesFilter && matchesSearch));
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    applyFilters();
  });
});

searchInput?.addEventListener("input", applyFilters);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

function renderReview() {
  if (!testimonial) return;
  const review = reviews[activeReview];
  testimonial.querySelector("p").textContent = review.text;
  testimonial.querySelector("h3").textContent = review.name;
}

document.querySelector("[data-prev]")?.addEventListener("click", () => {
  activeReview = (activeReview - 1 + reviews.length) % reviews.length;
  renderReview();
});

document.querySelector("[data-next]")?.addEventListener("click", () => {
  activeReview = (activeReview + 1) % reviews.length;
  renderReview();
});

setInterval(() => {
  activeReview = (activeReview + 1) % reviews.length;
  renderReview();
}, 5000);

renderReview();

window.addEventListener("scroll", () => {
  topButton?.classList.toggle("visible", window.scrollY > 700);
});

topButton?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();

window.sviCatalogLinks = catalogLinks;
window.sviWhatsAppUrl = whatsappUrl;
