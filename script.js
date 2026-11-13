const SITE_CONFIG = {
  email: "sumanthsuvarna30@gmail.com",
  phoneDisplay: "+91 82960 85495",
  phoneLink: "+918296085495"
};

const projectDetails = {
  StayDirect: {
    copy: "A complete direct-booking concept for independent hotels, designed around the guest journey from discovery to confirmation.",
    challenge: "Smaller hotels often depend on third-party platforms, pay commissions and lose the direct relationship with guests.",
    solution: "A fast booking website, secure checkout and simple dashboard for rooms, enquiries, offers and guest communication."
  },
  CareQueue: {
    copy: "A lightweight appointment experience that makes healthcare access simpler for patients and clinic teams.",
    challenge: "Telephone bookings create interruptions, missed appointments and repetitive administrative work.",
    solution: "Self-service appointment slots, automated reminders and a focused reception dashboard for daily schedules."
  },
  TableTap: {
    copy: "A restaurant ordering concept that brings menus, recommendations and repeat ordering into one friendly mobile experience.",
    challenge: "Static menus are difficult to update and third-party delivery platforms weaken margins and customer loyalty.",
    solution: "A visual digital menu, direct ordering, payments and offers managed by the restaurant through a simple dashboard."
  }
};

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-nav");
const dialog = document.querySelector("#project-dialog");

document.querySelector("#year").textContent = new Date().getFullYear();

const emailLink = document.querySelector("#email-link");
const emailText = document.querySelector("#email-text");
const phoneLink = document.querySelector("#phone-link");
const phoneText = document.querySelector("#phone-text");
emailLink.href = `mailto:${SITE_CONFIG.email}`;
emailText.textContent = SITE_CONFIG.email;
phoneLink.href = `tel:${SITE_CONFIG.phoneLink}`;
phoneText.textContent = SITE_CONFIG.phoneDisplay;

window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 20), { passive: true });

menuButton.addEventListener("click", () => {
  const open = menuButton.classList.toggle("active");
  nav.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  document.body.style.overflow = open ? "hidden" : "";
});

nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  menuButton.classList.remove("active");
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

document.querySelectorAll("[data-project]").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.project;
    const details = projectDetails[name];
    document.querySelector("#dialog-title").textContent = name;
    document.querySelector("#dialog-copy").textContent = details.copy;
    document.querySelector("#dialog-challenge").textContent = details.challenge;
    document.querySelector("#dialog-solution").textContent = details.solution;
    dialog.showModal();
  });
});

document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});
dialog.querySelector("a").addEventListener("click", () => dialog.close());

document.querySelector("#contact-form").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Project enquiry from ${data.get("name")} — ${data.get("service")}`);
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nBusiness: ${data.get("company") || "Not provided"}\nEmail: ${data.get("email")}\nService: ${data.get("service")}\n\nProject details:\n${data.get("message")}`
  );
  window.location.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;
});
