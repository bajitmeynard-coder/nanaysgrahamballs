const header = document.getElementById("mainHeader");
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
const overlay = document.getElementById("overlay");
const backToTop = document.getElementById("backToTop");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function openMenu() {
  hamburger.classList.add("open");
  mobileNav.classList.add("open");
  overlay.classList.add("open");
}
function closeMenu() {
  hamburger.classList.remove("open");
  mobileNav.classList.remove("open");
  overlay.classList.remove("open");
}

hamburger.addEventListener("click", () =>
  hamburger.classList.contains("open") ? closeMenu() : openMenu(),
);
overlay.addEventListener("click", closeMenu);
document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 },
);

document
  .querySelectorAll(".card, .about h2, .about p, .contact h2, .contact p, .contact a")
  .forEach((el) => observer.observe(el));

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  header.classList.toggle("scrolled", scrollY > 60);
  backToTop.classList.toggle("visible", scrollY > 400);

  let current = "";
  sections.forEach((section) => {
    if (scrollY >= section.offsetTop - 120)
      current = section.getAttribute("id");
  });
  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + current,
    );
  });
});

backToTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);