// ===== ESPERAR A QUE EL DOM ESTÉ COMPLETAMENTE CARGADO =====
        document.addEventListener("DOMContentLoaded", function() {
            console.log("🚀 DOM cargado - Iniciando scripts personalizados para CV SASS");

            // ===== VARIABLES GLOBALES =====
            const navbar = document.querySelector(".navbar");
            const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
            const sections = document.querySelectorAll("section[id]");
            const cards = document.querySelectorAll(".card");
            const heroTitle = document.querySelector(".hero-content h1");
            const bootstrap = window.bootstrap;

            // ===== FUNCIÓN PARA SMOOTH SCROLL =====
            function initSmoothScroll() {
                navLinks.forEach(function(link) {
                    link.addEventListener("click", function(e) {
                        e.preventDefault();
                        console.log("📍 Click en enlace:", this.getAttribute("href"));

                        const targetId = this.getAttribute("href");
                        const targetSection = document.querySelector(targetId);

                        if (targetSection) {
                            const headerHeight = navbar.offsetHeight;
                            const targetPosition = targetSection.offsetTop - headerHeight - 20;

                            window.scrollTo({
                                top: targetPosition,
                                behavior: "smooth"
                            });

                            // Cerrar el menú en móviles después del click
                            const navbarCollapse = document.querySelector(".navbar-collapse");
                            if (navbarCollapse && navbarCollapse.classList.contains("show")) {
                                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                                bsCollapse.hide();
                            }
                        }
                    });
                });

                // Smooth scroll para enlaces del footer
                const footerLinks = document.querySelectorAll('footer a[href^="#"]');
                footerLinks.forEach(function(link) {
                    link.addEventListener("click", function(e) {
                        e.preventDefault();
                        const targetId = this.getAttribute("href");
                        const targetSection = document.querySelector(targetId);

                        if (targetSection) {
                            const headerHeight = navbar.offsetHeight;
                            const targetPosition = targetSection.offsetTop - headerHeight - 20;

                            window.scrollTo({
                                top: targetPosition,
                                behavior: "smooth"
                            });
                        }
                    });
                });
            }

            // ===== FUNCIÓN PARA HIGHLIGHT DEL ENLACE ACTIVO =====
            function highlightActiveSection() {
                const scrollPosition = window.scrollY + 150;

                sections.forEach(function(section) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    const sectionId = section.getAttribute("id");
                    const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);

                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        // Remover clase activa de todos los enlaces
                        navLinks.forEach(function(link) {
                            link.classList.remove("active");
                        });

                        // Agregar clase activa al enlace correspondiente
                        if (correspondingLink) {
                            correspondingLink.classList.add("active");
                        }
                    }
                });
            }

            // ===== FUNCIÓN PARA CAMBIO DE ESTILO DEL NAVBAR AL HACER SCROLL =====
            function handleNavbarScroll() {
                if (window.scrollY > 50) {
                    navbar.classList.add("scrolled");
                } else {
                    navbar.classList.remove("scrolled");
                }
            }

            // ===== FUNCIÓN PARA ANIMACIONES DE ENTRADA CON INTERSECTION OBSERVER =====
            function initScrollAnimations() {
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: "0px 0px -50px 0px"
                };

                const observer = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            // EXCLUIR LA FOTO DE PERFIL DE LAS ANIMACIONES
                            if (!entry.target.classList.contains("profile-image-container") &&
                                !entry.target.classList.contains("profile-image")) {
                                entry.target.style.opacity = "1";
                                entry.target.style.transform = "translateY(0)";
                                entry.target.classList.add("loaded");
                            }
                        }
                    });
                }, observerOptions);

                // Observar cards EXCLUYENDO la foto de perfil
                cards.forEach(function(card, index) {
                    // NO aplicar animaciones a la foto de perfil
                    if (!card.classList.contains("profile-image-container")) {
                        card.style.opacity = "0";
                        card.style.transform = "translateY(30px)";
                        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
                        card.classList.add("loading");
                        observer.observe(card);
                    }
                });
            }

            // ===== FUNCIÓN PARA INICIALIZAR TOOLTIPS DE BOOTSTRAP =====
            function initTooltips() {
                if (bootstrap && bootstrap.Tooltip) {
                    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
                    const tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
                        return new bootstrap.Tooltip(tooltipTriggerEl);
                    });
                    console.log("💡 Tooltips inicializados:", tooltipList.length);
                }
            }

            // ===== FUNCIÓN PARA EFECTOS DE HOVER EN BADGES =====
            function initBadgeEffects() {
                const badges = document.querySelectorAll(".badge");
                badges.forEach(function(badge) {
                    badge.addEventListener("mouseenter", function() {
                        this.style.transform = "scale(1.05)";
                    });

                    badge.addEventListener("mouseleave", function() {
                        this.style.transform = "scale(1)";
                    });
                });
            }

            // ===== FUNCIÓN PARA EFECTOS DE HOVER EN ICONOS =====
            function initIconEffects() {
                const icons = document.querySelectorAll(".bi");
                icons.forEach(function(icon) {
                    // NO aplicar efectos a iconos dentro de la foto de perfil
                    if (!icon.closest(".profile-image-container")) {
                        icon.addEventListener("mouseenter", function() {
                            this.style.transform = "scale(1.1) rotate(5deg)";
                        });

                        icon.addEventListener("mouseleave", function() {
                            this.style.transform = "scale(1) rotate(0deg)";
                        });
                    }
                });
            }

            // ===== FUNCIÓN PARA LAZY LOADING DE IMÁGENES =====
            function initLazyLoading() {
                const images = document.querySelectorAll("img[src]");
                const imageObserver = new IntersectionObserver(function(entries) {
                    entries.forEach(function(entry) {
                        if (entry.isIntersecting) {
                            const img = entry.target;

                            // NO aplicar lazy loading a la foto de perfil
                            if (!img.classList.contains("profile-image")) {
                                img.style.opacity = "0";
                                img.style.transition = "opacity 0.5s ease";

                                img.onload = function() {
                                    img.style.opacity = "1";
                                };
                            }

                            imageObserver.unobserve(img);
                        }
                    });
                });

                images.forEach(function(img) {
                    imageObserver.observe(img);
                });
            }

            // ===== EVENT LISTENERS PRINCIPALES =====
            window.addEventListener("scroll", function() {
                highlightActiveSection();
                handleNavbarScroll();
            });

            window.addEventListener("resize", function() {
                highlightActiveSection();
            });

            window.addEventListener("load", function() {
                document.body.classList.add("loaded");
                console.log("✅ Página completamente cargada");
            });

            // ===== FUNCIÓN PRINCIPAL DE INICIALIZACIÓN =====
            function init() {
                console.log("🔧 Inicializando efectos del CV SASS...");

                // Ejecutar todas las funciones de inicialización
                initSmoothScroll();
                highlightActiveSection();
                handleNavbarScroll();
                initScrollAnimations();
                initTooltips();
                initBadgeEffects();
                initIconEffects();
                initLazyLoading();

                console.log("✅ Todos los efectos inicializados correctamente");
                console.log("📸 Foto de perfil: COMPLETAMENTE ESTÁTICA");
            }

            // ===== EJECUTAR INICIALIZACIÓN =====
            init();

            // ===== DEBUG INFO =====
            console.log("📋 Scripts cargados:");
            console.log("  ✅ Smooth scroll");
            console.log("  ✅ Active link highlighting");
            console.log("  ✅ Navbar scroll effect");
            console.log("  ✅ Card animations");
            console.log("  ✅ Badge effects");
            console.log("  ✅ Icon effects");
            console.log("  ✅ Lazy loading");
            console.log("  ✅ Tooltips");
            console.log("  📸 Foto de perfil: ESTÁTICA");
        });

        console.log("🎯 JavaScript del CV SASS cargado completamente");