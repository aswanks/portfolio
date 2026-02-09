// Typewriter Effect Script
const textElement = document.getElementById('typewriter-text');
const phrases = ['PHP Developer','Laravel Developer','WordPress Developer','Codelgniter Developer','Technical Trainer'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Faster deletion
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150; // Normal typing
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause before new phrase
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', type);

// Custom ScrollSpy
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll("section");
    const navLi = document.querySelectorAll(".navbar-nav .nav-item .nav-link");

    // Throttling scroll event for performance
    let isScrolling = false;

    window.addEventListener("scroll", () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                let current = "";
                sections.forEach((section) => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    // Offset for navbar height (approx 80px)
                    if (scrollY >= sectionTop - 100) {
                        current = section.getAttribute("id");
                    }
                });

                navLi.forEach((li) => {
                    li.classList.remove("active");
                    if (li.getAttribute("href").includes(current)) {
                        li.classList.add("active");
                    }
                });

                // Handle case when at the top of the page but not quite at the first section trigger
                if (window.scrollY < 100) {
                    navLi.forEach((li) => {
                        li.classList.remove("active");
                        if (li.getAttribute("href").includes("hero")) {
                            li.classList.add("active");
                        }
                    });
                }
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // Navbar collapse on mobile click
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                new bootstrap.Collapse(navbarCollapse).hide();
            }
        });
    });
});

// Image Modal Script
document.addEventListener('DOMContentLoaded', function () {
    const modal = new bootstrap.Modal(document.getElementById('imageModal'));
    const modalImage = document.getElementById('modalImage');
    const viewButtons = document.querySelectorAll('.view-img-btn');

    viewButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const portfolioItem = this.closest('.portfolio-item');
            const img = portfolioItem.querySelector('.portfolio-img');
            modalImage.src = img.src;
            modal.show();
        });
    });

    // Portfolio Filter Script
    const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item-wrapper');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    item.classList.add('hide');
                    item.classList.remove('show');
                }
            });
        });
    });
});

    // Download CV
    function downloadCV() {
        const link = document.createElement("a");
        link.href = "images/Aswan_K_S_PHP_&_Laravel_Developer_CV.pdf";
        link.download = "Aswan_K_S_PHP_&_Laravel_Developer_CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Mail send Script
    const form = document.getElementById('contact-data-form');
    const responseMessage = document.getElementById('response-message');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
      };

      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxdccYqJ4VTUwaEhz1h2oS8OqwDjQgCdTEAeECVOfB1dc226V_uWCPgvLLeAhUmJ-375g/exec', {
          method: 'POST',
          body: JSON.stringify(formData)
        });

            responseMessage.style.display = "block";

        if (response.ok) {
            responseMessage.textContent = 'Message sent! We’ll get back to you soon 📩';
            responseMessage.className = "success";
            form.reset();
          
        } else {
            responseMessage.textContent = 'Error submitting the form. Please try again.';
            responseMessage.className = "error";
        }
      } catch (error) {
            responseMessage.style.display = "block";
            responseMessage.textContent = 'An error occurred. Please try again.';
            responseMessage.className = "error";
      }
    });
