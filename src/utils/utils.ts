type ConfettiParticle = {
  id: number;
  emoji: string;
  x: number;
  y: number;
  angle: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  opacity: number;
  life: number;
};

type ConfettiOptions = {
  emoji?: string;
  particleCount?: number;
  duration?: number;
  container?: HTMLElement;
};

export const spawnConfetti = (options: ConfettiOptions = {}) => {
  // Default options
  const {
    emoji = "💩",
    particleCount = 30,
    duration = 2000,
    container = document.body,
  } = options;

  // Create confetti container if it doesn't exist
  let confettiContainer = document.getElementById("confetti-container");
  if (!confettiContainer) {
    confettiContainer = document.createElement("div");
    confettiContainer.id = "confetti-container";
    confettiContainer.style.position = "fixed";
    confettiContainer.style.top = "0";
    confettiContainer.style.left = "0";
    confettiContainer.style.width = "100%";
    confettiContainer.style.height = "100%";
    confettiContainer.style.pointerEvents = "none";
    confettiContainer.style.zIndex = "1000";
    confettiContainer.style.overflow = "hidden";
    container.appendChild(confettiContainer);
  }

  // Generate particles
  const particles: ConfettiParticle[] = [];
  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight * 0.5;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      id: Date.now() + i,
      emoji,
      x: startX,
      y: startY,
      angle: Math.random() * Math.PI * 2,
      speed: 1 + Math.random() * 3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      scale: 0.5 + Math.random() * 0.7,
      opacity: 1,
      life: 100 + Math.random() * 50,
    });
  }

  // Create DOM elements for particles
  const particleElements: HTMLElement[] = [];
  particles.forEach((particle) => {
    const el = document.createElement("div");
    el.textContent = particle.emoji;
    el.style.position = "absolute";
    el.style.left = `${particle.x}px`;
    el.style.top = `${particle.y}px`;
    el.style.fontSize = `${particle.scale}em`;
    el.style.transform = `rotate(${particle.rotation}deg)`;
    el.style.opacity = `${particle.opacity}`;
    el.style.willChange = "transform, opacity";
    el.style.userSelect = "none";
    confettiContainer?.appendChild(el);
    particleElements.push(el);
  });

  // Animation variables
  let animationId: number;
  let startTime: number | null = null;
  const particlesToAnimate = particles.map((p, i) => ({
    ...p,
    element: particleElements[i],
  }));

  // Animation loop
  const animate = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;

    particlesToAnimate.forEach((particle) => {
      if (particle.life <= 0) return;

      // Update particle physics
      particle.x += Math.cos(particle.angle) * particle.speed;
      particle.y += Math.sin(particle.angle) * particle.speed + 0.5; // Gravity
      particle.rotation += particle.rotationSpeed;
      particle.life -= 1;
      particle.opacity = Math.max(0, particle.life / 150);

      // Update DOM element
      if (particle.element) {
        particle.element.style.left = `${particle.x}px`;
        particle.element.style.top = `${particle.y}px`;
        particle.element.style.transform = `rotate(${particle.rotation}deg)`;
        particle.element.style.opacity = `${particle.opacity}`;
      }
    });

    // Continue animation if not all particles are dead or duration not exceeded
    if (elapsed < duration && particlesToAnimate.some((p) => p.life > 0)) {
      animationId = requestAnimationFrame(animate);
    } else {
      // Cleanup
      particleElements.forEach((el) => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    }
  };

  // Start animation
  animationId = requestAnimationFrame(animate);

  // Return cleanup function
  return () => {
    cancelAnimationFrame(animationId);
    particleElements.forEach((el) => {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    });
  };
};

// Example usage:
// spawnConfetti({ emoji: '👨', particleCount: 50 });
// spawnConfetti({ emoji: '❤️', duration: 3000 });
