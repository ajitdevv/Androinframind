import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useFloatingBlobs() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const blobs = document.querySelectorAll('.ambient-orb');
    const tweens = Array.from(blobs).map((blob, index) =>
      gsap.to(blob, {
        y: index % 2 === 0 ? -18 : 18,
        x: index % 2 === 0 ? 12 : -12,
        duration: 7 + index * 1.25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      }),
    );

    return () => {
      tweens.forEach((tween) => tween.kill());
    };
  }, []);
}

export function useScrollReveal(dependency) {
  useEffect(() => {
    const elements = document.querySelectorAll('.scroll-reveal');

    if (prefersReducedMotion()) {
      elements.forEach((element) => {
        element.style.opacity = '1';
        element.style.transform = 'none';
      });
      return;
    }

    ScrollTrigger.refresh();

    const tweens = Array.from(elements).map((element) => {
      let delay = 0;
      if (element.classList.contains('stagger-1')) delay = 0.05;
      if (element.classList.contains('stagger-2')) delay = 0.1;
      if (element.classList.contains('stagger-3')) delay = 0.15;
      if (element.classList.contains('stagger-4')) delay = 0.2;

      return gsap.fromTo(
        element,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        },
      );
    });

    return () => {
      tweens.forEach((tween) => {
        if (tween.scrollTrigger) {
          tween.scrollTrigger.kill();
        }
        tween.kill();
      });
    };
  }, [dependency]);
}

export function useMagneticButtons(dependency) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const buttons = document.querySelectorAll('.site-button, .icon-button, .pill-button');

    const cleanups = Array.from(buttons).map((button) => {
      const onMouseMove = (event) => {
        const bound = button.getBoundingClientRect();
        const mouseX = event.clientX - (bound.left + bound.width / 2);
        const mouseY = event.clientY - (bound.top + bound.height / 2);

        gsap.to(button, {
          x: mouseX * 0.35,
          y: mouseY * 0.35,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const onMouseLeave = () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.4)',
        });
      };

      button.addEventListener('mousemove', onMouseMove);
      button.addEventListener('mouseleave', onMouseLeave);

      return () => {
        button.removeEventListener('mousemove', onMouseMove);
        button.removeEventListener('mouseleave', onMouseLeave);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [dependency]);
}

export function useCardTilt(dependency) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const cards = document.querySelectorAll('.surface-card, .surface-panel, .timeline-card');

    const cleanups = Array.from(cards).map((card) => {
      if (card.parentElement) {
        card.parentElement.style.perspective = '1000px';
      }

      const onMouseMove = (event) => {
        const bound = card.getBoundingClientRect();
        const mouseX = event.clientX - bound.left;
        const mouseY = event.clientY - bound.top;
        
        const xPercent = (mouseX / bound.width - 0.5) * 2;
        const yPercent = (mouseY / bound.height - 0.5) * 2;

        const tiltX = yPercent * -7.2;
        const tiltY = xPercent * 7.2;

        gsap.to(card, {
          rotateX: tiltX,
          rotateY: tiltY,
          transformPerspective: 1000,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      const onMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      card.addEventListener('mousemove', onMouseMove);
      card.addEventListener('mouseleave', onMouseLeave);

      return () => {
        card.removeEventListener('mousemove', onMouseMove);
        card.removeEventListener('mouseleave', onMouseLeave);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [dependency]);
}

export function useMetricCounters(dependency) {
  useEffect(() => {
    const counters = document.querySelectorAll('.metric-number[data-target]');

    if (prefersReducedMotion()) {
      counters.forEach((element) => {
        const target = element.dataset.target;
        if (!target) return;
        const current = (element.textContent || '').replace(/\d+/g, '').trim() || '+';
        element.textContent = `${target}${current}`;
      });
      return;
    }

    const tweens = Array.from(counters).map((element) => {
      const target = Number(element.dataset.target || 0);
      const suffix = (element.textContent || '').replace(/\d+/g, '').trim() || '+';
      const state = { value: 0 };

      return gsap.to(state, {
        value: target,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => {
          element.textContent = `${Math.round(state.value)}${suffix}`;
        },
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          once: true,
        },
      });
    });

    return () => {
      tweens.forEach((tween) => tween.scrollTrigger?.kill());
    };
  }, [dependency]);
}

export function useCustomCursor() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    const cursorRing = document.createElement('div');
    cursorRing.className = 'custom-cursor-ring';

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    const style = document.createElement('style');
    style.innerHTML = `
      .custom-cursor-dot {
        position: fixed;
        width: 8px;
        height: 8px;
        background-color: var(--accent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
      }
      .custom-cursor-ring {
        position: fixed;
        width: 36px;
        height: 36px;
        border: 1.5px solid var(--accent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s, background-color 0.3s, border-color 0.3s;
      }
      .custom-cursor-hover .custom-cursor-ring {
        width: 48px;
        height: 48px;
        background-color: rgba(37, 99, 235, 0.08);
        border-color: var(--accent-strong);
      }
      .custom-cursor-hover .custom-cursor-dot {
        background-color: var(--accent-strong);
        transform: translate(-50%, -50%) scale(1.5);
      }
      @media (max-width: 1024px) {
        .custom-cursor-dot, .custom-cursor-ring {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    const onMouseMove = (event) => {
      gsap.set(cursorDot, {
        x: event.clientX,
        y: event.clientY,
      });

      gsap.to(cursorRing, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const addHoverClass = () => {
      document.body.classList.add('custom-cursor-hover');
    };

    const removeHoverClass = () => {
      document.body.classList.remove('custom-cursor-hover');
    };

    window.addEventListener('mousemove', onMouseMove);

    const bindListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .pill-button');
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', addHoverClass);
        el.addEventListener('mouseleave', removeHoverClass);
      });
    };

    bindListeners();

    // Re-bind when route or DOM changes
    const observer = new MutationObserver(bindListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (document.body.contains(cursorDot)) document.body.removeChild(cursorDot);
      if (document.body.contains(cursorRing)) document.body.removeChild(cursorRing);
      if (document.head.contains(style)) document.head.removeChild(style);
      observer.disconnect();
    };
  }, []);
}

export function useTextReveal(dependency) {
  useEffect(() => {
    if (prefersReducedMotion()) {
      const targets = document.querySelectorAll('.hero-title, .section-title, .cta-title');
      targets.forEach((target) => {
        target.style.opacity = '1';
        target.style.transform = 'none';
      });
      return;
    }

    const targets = document.querySelectorAll('.hero-title, .section-title, .cta-title');

    // Reset styles on mount/dependency change to prevent animations from compounding
    targets.forEach((target) => {
      gsap.set(target, { clearProps: 'all' });
    });

    const animations = Array.from(targets).map((target) => {
      const isHero = target.classList.contains('hero-title');

      if (isHero) {
        return gsap.fromTo(
          target,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.15,
          }
        );
      } else {
        return gsap.fromTo(
          target,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: target,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    ScrollTrigger.refresh();

    return () => {
      animations.forEach((anim) => {
        if (anim) {
          if (anim.scrollTrigger) {
            anim.scrollTrigger.kill();
          }
          anim.kill();
        }
      });
      targets.forEach((target) => {
        gsap.set(target, { clearProps: 'all' });
      });
    };
  }, [dependency]);
}

export function usePageTransition(dependency) {
  useEffect(() => {
    const main = document.querySelector('.app-main');
    if (!main) return;

    gsap.fromTo(
      main,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );
  }, [dependency]);
}

export function useSmoothScroll(pathname) {
  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential ease
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    // Sync GSAP's ScrollTrigger with Lenis
    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', onScroll);

    // Coordinate drawing frame rate by hooking into GSAP ticker
    const onRaf = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onRaf);

    // Disable lag smoothing to keep GSAP and Lenis in perfect lockstep
    gsap.ticker.lagSmoothing(0);

    window.lenis = lenis;

    return () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(onRaf);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  // When pathname changes, reset Lenis scroll position instantly to top
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);
}
