(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Scroll reveal
     The `js` class is what switches [data-reveal] elements to their
     hidden start state, so content stays visible if this script never
     runs. rootMargin (not a threshold ratio) does the triggering, so
     sections taller than the viewport still reveal on small screens.
     ------------------------------------------------------------------ */
  var revealItems = document.querySelectorAll("[data-reveal]");

  function showAll() {
    for (var i = 0; i < revealItems.length; i++) {
      revealItems[i].classList.add("is-visible");
    }
  }

  if (!("IntersectionObserver" in window)) {
    showAll();
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );

    revealItems.forEach(function (item) {
      // Anything already on screen shows straight away — never wait on the
      // observer for content the visitor is looking at right now.
      if (item.getBoundingClientRect().top < window.innerHeight) {
        item.classList.add("is-visible");
      } else {
        observer.observe(item);
      }
    });

    // Safety net: if the observer never fires, content must not stay hidden.
    window.setTimeout(showAll, 1200);
  }

  /* ------------------------------------------------------------------
     Sticky header shadow
     ------------------------------------------------------------------ */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------
     Mobile navigation
     ------------------------------------------------------------------ */
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    navLinks.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        navLinks.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------ */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------
     Gallery lightbox
     ------------------------------------------------------------------ */
  var cards = Array.prototype.slice.call(
    document.querySelectorAll(".gallery-card")
  );

  if (cards.length) {
    var lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Project photo viewer");
    lightbox.innerHTML =
      '<button class="lightbox-close" type="button" aria-label="Close">&times;</button>' +
      '<button class="lightbox-nav lightbox-prev" type="button" aria-label="Previous photo">&#8249;</button>' +
      '<button class="lightbox-nav lightbox-next" type="button" aria-label="Next photo">&#8250;</button>' +
      '<figure class="lightbox-figure"><img alt=""><figcaption></figcaption></figure>';
    document.body.appendChild(lightbox);

    var lbImg = lightbox.querySelector("img");
    var lbCaption = lightbox.querySelector("figcaption");
    var closeBtn = lightbox.querySelector(".lightbox-close");
    var index = 0;
    var lastFocused = null;

    function render(i) {
      index = (i + cards.length) % cards.length;
      var source = cards[index].querySelector("img");
      var caption = cards[index].querySelector(".gallery-overlay span");
      if (!source) return;
      lbImg.src = source.currentSrc || source.src;
      lbImg.alt = source.alt || "";
      lbCaption.textContent = caption ? caption.textContent : "";
    }

    function open(i) {
      lastFocused = document.activeElement;
      render(i);
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    }

    function close() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    cards.forEach(function (card, i) {
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.addEventListener("click", function () {
        open(i);
      });
      card.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          open(i);
        }
      });
    });

    closeBtn.addEventListener("click", close);
    lightbox.querySelector(".lightbox-prev").addEventListener("click", function () {
      render(index - 1);
    });
    lightbox.querySelector(".lightbox-next").addEventListener("click", function () {
      render(index + 1);
    });

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) close();
    });

    document.addEventListener("keydown", function (event) {
      if (!lightbox.classList.contains("is-open")) return;
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") render(index - 1);
      if (event.key === "ArrowRight") render(index + 1);
    });
  }
})();
