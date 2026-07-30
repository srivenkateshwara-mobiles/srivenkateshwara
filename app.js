const catalogLinks = {
  iphone: "https://drive.google.com/drive/u/0/folders/1iOkfY5BZNNjfzlYlLrBBs6xKRiEm82Gt",
  samsung: "https://drive.google.com/drive/u/0/folders/1-EpURCniXsmC9Mj0m8qkZ_2gsbmtBpHP",
  android: "https://drive.google.com/drive/u/0/folders/1gEcwVv9tZIhbkhIcGx0SPTh9r2ufWTF6"
};

const reviews = [
  { name: "Rakesh Kumar", initial: "R", text: "Very clean store experience. I found a premium iPhone case and the tempered glass installation was perfect." },
  { name: "Sravani", initial: "S", text: "Good imported covers and quick service. The owner suggested the right charger for my phone." },
  { name: "Mahesh", initial: "M", text: "Fast repair support and fair pricing. New stock is updated often, especially cases and Bluetooth items." }
];

const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");
const testimonial = document.querySelector("[data-testimonial]");
let activeReview = 0;

window.addEventListener("load", () => document.querySelector("[data-loader]")?.classList.add("hidden"));

document.querySelectorAll(".catalog-link").forEach((link) => {
  link.href = catalogLinks[link.dataset.catalog] || "https://drive.google.com/";
});

document.querySelector("[data-menu-toggle]")?.addEventListener("click", () => nav?.classList.toggle("open"));
document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener("click", () => nav?.classList.remove("open")));

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

function renderReview() {
  if (!testimonial) return;
  const review = reviews[activeReview];
  testimonial.querySelector("p").textContent = `“${review.text}”`;
  testimonial.querySelector("h3").textContent = review.name;
  testimonial.querySelector("[data-avatar]").textContent = review.initial;
}
function moveReview(step) { activeReview = (activeReview + step + reviews.length) % reviews.length; renderReview(); }
document.querySelector("[data-prev]")?.addEventListener("click", () => moveReview(-1));
document.querySelector("[data-next]")?.addEventListener("click", () => moveReview(1));
setInterval(() => moveReview(1), 5500);
renderReview();

window.addEventListener("scroll", () => header?.classList.toggle("scrolled", window.scrollY > 18), { passive: true });
document.querySelector("[data-year]").textContent = new Date().getFullYear();
window.sviCatalogLinks = catalogLinks;
