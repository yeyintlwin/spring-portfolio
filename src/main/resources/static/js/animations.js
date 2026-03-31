(function () {
  "use strict";

  // ── 1. Scroll Progress Bar ─────────────────────────────────
  const progressBar = document.createElement("div");
  progressBar.classList.add("scroll-progress");
  document.body.prepend(progressBar);

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";
  });

  // ── 2. Typing Effect ───────────────────────────────────────
  const greetingEl = document.querySelector("[th\\:text='#{header.greeting}']")
    || document.querySelector(".section-home .content-left > p:first-child");

  if (greetingEl) {
    const originalText = greetingEl.textContent.trim();
    greetingEl.innerHTML = "";

    const textSpan = document.createElement("span");
    textSpan.classList.add("typing-text");

    const cursorSpan = document.createElement("span");
    cursorSpan.classList.add("typing-cursor");

    greetingEl.appendChild(textSpan);
    greetingEl.appendChild(cursorSpan);

    let i = 0;
    const speed = 65;

    function typeChar() {
      if (i < originalText.length) {
        textSpan.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeChar, speed);
      } else {
        setTimeout(() => {
          cursorSpan.style.display = "none";
        }, 2000);
      }
    }

    setTimeout(typeChar, 600);
  }

  // ── 3. Floating Particles ──────────────────────────────────
  const homeSection = document.querySelector(".section-home");
  if (homeSection) {
    const canvas = document.createElement("canvas");
    canvas.classList.add("particles-canvas");
    homeSection.prepend(canvas);

    const ctx = canvas.getContext("2d");
    let particles = [];
    const count = 40;

    function resizeCanvas() {
      canvas.width = homeSection.offsetWidth;
      canvas.height = homeSection.offsetHeight;
    }

    function createParticle() {
      const isDark = document.body.classList.contains("dark-theme");
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.5 + 1,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.3 + 0.1,
        color: isDark ? "255,255,255" : "99,102,241",
      };
    }

    function initParticles() {
      resizeCanvas();
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(createParticle());
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.body.classList.contains("dark-theme");

      particles.forEach((p) => {
        p.color = isDark ? "255,255,255" : "99,102,241";
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(
            particles[i].x - particles[j].x,
            particles[i].y - particles[j].y
          );
          if (dist < 120) {
            const c = isDark ? "255,255,255" : "99,102,241";
            ctx.strokeStyle = `rgba(${c}, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(drawParticles);
    }

    initParticles();
    drawParticles();
    window.addEventListener("resize", initParticles);
  }

  // ── 4. Staggered Fade-In ───────────────────────────────────
  const staggerGroups = [
    { selector: "ul.education li", parent: "ul.education" },
    { selector: ".tech-stack li", parent: ".tech-stack" },
    { selector: ".media-buttons a", parent: ".media-buttons" },
  ];

  staggerGroups.forEach((group) => {
    const items = document.querySelectorAll(group.selector);
    items.forEach((item) => item.classList.add("stagger-item"));
  });

  const staggerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll(".stagger-item");
          items.forEach((item, idx) => {
            setTimeout(() => {
              item.classList.add("visible");
            }, idx * 100);
          });
          staggerObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  staggerGroups.forEach((group) => {
    const parents = document.querySelectorAll(group.parent);
    parents.forEach((parent) => staggerObserver.observe(parent));
  });

  // ── 5. Emoji Wave ──────────────────────────────────────────
  const aboutIntro = document.querySelector(".section-about .content-right p");
  if (aboutIntro) {
    aboutIntro.innerHTML = aboutIntro.innerHTML.replace(
      /👋/g,
      '<span class="wave-emoji">👋</span>'
    );
  }

  // ── 6. 3D Hover Tilt on Project Cards ──────────────────────
  const cards = document.querySelectorAll(".project-card");

  if (cards.length && !window.matchMedia("(pointer: coarse)").matches) {
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform =
          "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
        card.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
        setTimeout(() => {
          card.style.transition = "";
        }, 400);
      });
    });
  }
})();
