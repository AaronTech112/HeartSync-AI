document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Initialize Particles.js with enhanced configuration
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 100,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#ff3e8f', '#7928ca', '#00d4ff']
                },
                shape: {
                    type: ['circle', 'triangle', 'polygon'],
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 6
                    }
                },
                opacity: {
                    value: 0.6,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ff3e8f',
                    opacity: 0.3,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'bubble'
                    },
                    onclick: {
                        enable: true,
                        mode: 'repulse'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    bubble: {
                        distance: 200,
                        size: 12,
                        duration: 2,
                        opacity: 0.8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    // Initialize Token Distribution Chart with animation
    const tokenChart = document.getElementById('tokenChart');
    if (tokenChart) {
        const chart = new Chart(tokenChart, {
            type: 'doughnut',
            data: {
                labels: ['Presale', 'Liquidity', 'Team', 'Marketing', 'Development', 'Reserve'],
                datasets: [{
                    data: [40, 20, 10, 15, 10, 5],
                    backgroundColor: [
                        '#ff3e8f',
                        '#7928ca',
                        '#00d4ff',
                        '#28ca7a',
                        '#ffc107',
                        '#6c757d'
                    ],
                    borderWidth: 0,
                    hoverOffset: 15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 2000,
                    easing: 'easeOutQuart'
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#f8f9fa',
                            font: {
                                family: 'Poppins',
                                size: 12
                            },
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        },
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        titleFont: {
                            family: 'Poppins',
                            size: 14
                        },
                        bodyFont: {
                            family: 'Poppins',
                            size: 12
                        },
                        padding: 12,
                        displayColors: true,
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1
                    }
                }
            }
        });
        
        // Add hover effect to chart segments
        tokenChart.addEventListener('mousemove', (e) => {
            const activePoints = chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false);
            document.body.style.cursor = activePoints.length ? 'pointer' : 'default';
        });
    }

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Add mobile menu styles dynamically
            if (!document.getElementById('mobile-menu-styles')) {
                const style = document.createElement('style');
                style.id = 'mobile-menu-styles';
                style.textContent = `
                    .nav-links.active {
                        display: flex;
                        flex-direction: column;
                        position: absolute;
                        top: 80px;
                        left: 0;
                        width: 100%;
                        background: rgba(5, 5, 16, 0.95);
                        backdrop-filter: blur(10px);
                        padding: 20px;
                        z-index: 1000;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    }
                    .nav-links.active a {
                        margin: 10px 0;
                    }
                `;
                document.head.appendChild(style);
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Waitlist form submission
    const waitlistForm = document.getElementById('waitlist-form');
    const formMessage = document.getElementById('form-message');
    
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            if (!email || !isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Store email in localStorage for demonstration
            // In a real implementation, you would send this to a server
            saveEmailToLocalStorage(email);
            
            // Show success message
            showFormMessage('Thank you for joining our waitlist! We will keep you updated.', 'success');
            
            // Reset form
            waitlistForm.reset();
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show form message
    function showFormMessage(message, type) {
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = type === 'success' ? 'success-message' : 'error-message';
            
            // Clear message after 5 seconds
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = '';
            }, 5000);
        }
    }

    // Save email to localStorage
    function saveEmailToLocalStorage(email) {
        let emails = JSON.parse(localStorage.getItem('waitlistEmails')) || [];
        
        // Check if email already exists
        if (!emails.includes(email)) {
            emails.push(email);
            localStorage.setItem('waitlistEmails', JSON.stringify(emails));
            
            // For demonstration, log the emails to console
            console.log('Current waitlist emails:', emails);
        }
    }

    // Function to export emails to CSV
    window.exportEmailsToCSV = function() {
        const emails = JSON.parse(localStorage.getItem('waitlistEmails')) || [];
        if (emails.length === 0) {
            alert('No emails in the waitlist yet.');
            return;
        }
        
        const csvContent = 'data:text/csv;charset=utf-8,' + emails.join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'heartsync_waitlist.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Add a hidden admin button (press Ctrl+Shift+A to show)
    let adminKeyPressed = false;
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            if (!adminKeyPressed) {
                adminKeyPressed = true;
                const adminButton = document.createElement('button');
                adminButton.textContent = 'Export Waitlist Emails';
                adminButton.className = 'btn-secondary';
                adminButton.style.position = 'fixed';
                adminButton.style.bottom = '20px';
                adminButton.style.right = '20px';
                adminButton.style.zIndex = '9999';
                adminButton.onclick = window.exportEmailsToCSV;
                document.body.appendChild(adminButton);
            }
        }
    });

    // Typing animation for chat bubbles
    const chatBubbles = document.querySelectorAll('.chat-bubble');
    chatBubbles.forEach(bubble => {
        const text = bubble.textContent;
        bubble.textContent = '';
        
        // Create typing animation function
        function typeText(element, text, i = 0) {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                setTimeout(() => typeText(element, text, i + 1), 50);
            }
        }
        
        // Start typing when bubble becomes visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        typeText(bubble, text);
                    }, 500);
                    observer.unobserve(bubble);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(bubble);
    });

    // Add floating elements animation
    const floatingElements = document.querySelectorAll('.floating-hearts .heart');
    floatingElements.forEach(element => {
        // Random initial position
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        element.style.left = `${randomX}%`;
        element.style.top = `${randomY}%`;
        
        // Random animation duration
        const duration = 5 + Math.random() * 5;
        element.style.animationDuration = `${duration}s`;
    });
    
    // Add 3D tilt effect to team member images
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mousemove', e => {
            const memberRect = member.getBoundingClientRect();
            const x = e.clientX - memberRect.left;
            const y = e.clientY - memberRect.top;
            
            const centerX = memberRect.width / 2;
            const centerY = memberRect.height / 2;
            
            const percentX = (x - centerX) / centerX;
            const percentY = (y - centerY) / centerY;
            
            const maxRotate = 10;
            const rotateX = maxRotate * -percentY;
            const rotateY = maxRotate * percentX;
            
            member.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Add depth to the image
            const memberImage = member.querySelector('.member-image');
            if (memberImage) {
                memberImage.style.transform = `translateZ(20px)`;
            }
        });
        
        member.addEventListener('mouseleave', () => {
            member.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            
            const memberImage = member.querySelector('.member-image');
            if (memberImage) {
                memberImage.style.transform = 'translateZ(0)';
            }
        });
    });

    // Add counter animation to token stats
    const tokenStats = document.querySelectorAll('.token-stat p');
    tokenStats.forEach(stat => {
        const finalValue = stat.textContent;
        if (finalValue.includes('$') || finalValue.includes(',')) {
            const numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
            let startValue = 0;
            const duration = 2000;
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsedTime = currentTime - startTime;
                if (elapsedTime < duration) {
                    const progress = elapsedTime / duration;
                    const currentValue = startValue + progress * (numericValue - startValue);
                    
                    if (finalValue.includes('$')) {
                        stat.textContent = `$${currentValue.toFixed(2)} USD`;
                    } else if (finalValue.includes(',')) {
                        stat.textContent = `${Math.floor(currentValue).toLocaleString()} $HEART`;
                    }
                    
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = finalValue;
                }
            }
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        requestAnimationFrame(updateCounter);
                        observer.unobserve(stat);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(stat);
        }
    });
});