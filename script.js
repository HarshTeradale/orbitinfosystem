// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
    }
  })
})

// Navbar link active state
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link")

  navLinks.forEach((link) => {
    const href = link.getAttribute("href")
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })
}

// Card hover effects
document.querySelectorAll(".glass-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.boxShadow = "0 0 30px rgba(0, 255, 255, 0.4), inset 0 0 20px rgba(0, 255, 255, 0.1)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.boxShadow = "0 0 20px rgba(0, 255, 255, 0.1)"
  })
})

// Gallery image hover effect
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05)"
  })

  item.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)"
  })
})

// Particle animation on page load
function createBackgroundParticles() {
  const particleCount = 50
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.style.position = "fixed"
    particle.style.width = Math.random() * 3 + "px"
    particle.style.height = particle.style.width
    particle.style.background = "rgba(0, 255, 255, " + Math.random() * 0.5 + ")"
    particle.style.top = Math.random() * 100 + "%"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.borderRadius = "50%"
    particle.style.pointerEvents = "none"
    particle.style.zIndex = "0"
    particle.style.animation = "float " + (Math.random() * 20 + 20) + "s infinite"
    document.body.appendChild(particle)
  }
}

// Add float animation
const style = document.createElement("style")
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) translateX(100px); opacity: 0; }
    }
`
document.head.appendChild(style)

// Form input focus effects
document.querySelectorAll(".form-control").forEach((input) => {
  input.addEventListener("focus", function () {
    this.style.boxShadow = "0 0 20px rgba(0, 255, 255, 0.4)"
  })

  input.addEventListener("blur", function () {
    this.style.boxShadow = "0 0 0px rgba(0, 255, 255, 0)"
  })
})

// Scroll animation for elements
function observeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("scroll-animate")
        entry.target.style.animationDelay = "0s"
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe all major sections for scroll animation
  document.querySelectorAll(".container, .glass-card, section").forEach((el) => {
    el.classList.add("scroll-animate")
    observer.observe(el)
  })
}

// Call on page load
document.addEventListener("DOMContentLoaded", () => {
  observeScrollAnimations()
  setActiveNavLink()
})

// Form Validation
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form fields
    const nameInput = document.getElementById("name")
    const emailInput = document.getElementById("email")
    const messageInput = document.getElementById("message")

    // Reset errors
    document.querySelectorAll(".error-text").forEach((el) => {
      el.style.display = "none"
      el.textContent = ""
    })

    // Validation
    let isValid = true

    if (nameInput.value.trim() === "") {
      isValid = false
      nameInput.nextElementSibling.textContent = "Name is required"
      nameInput.nextElementSibling.style.display = "block"
      nameInput.classList.add("is-invalid")
    } else {
      nameInput.classList.remove("is-invalid")
    }

    if (emailInput.value.trim() === "") {
      isValid = false
      emailInput.nextElementSibling.textContent = "Email is required"
      emailInput.nextElementSibling.style.display = "block"
      emailInput.classList.add("is-invalid")
    } else if (!isValidEmail(emailInput.value)) {
      isValid = false
      emailInput.nextElementSibling.textContent = "Please enter a valid email"
      emailInput.nextElementSibling.style.display = "block"
      emailInput.classList.add("is-invalid")
    } else {
      emailInput.classList.remove("is-invalid")
    }

    if (messageInput.value.trim() === "") {
      isValid = false
      messageInput.nextElementSibling.textContent = "Message is required"
      messageInput.nextElementSibling.style.display = "block"
      messageInput.classList.add("is-invalid")
    } else {
      messageInput.classList.remove("is-invalid")
    }

    // If valid, show success message
    if (isValid) {
      alert("Thank you for your message! We will get back to you soon.")
      contactForm.reset()
    }
  })
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Function to create background particles
createBackgroundParticles()
// Mouse Tracking for Background Gradient
document.addEventListener("mousemove", (e) => {
  requestAnimationFrame(() => {
    const x = e.clientX
    const y = e.clientY
    
    document.documentElement.style.setProperty("--mouse-x", `${x}px`)
    document.documentElement.style.setProperty("--mouse-y", `${y}px`)
  })
})