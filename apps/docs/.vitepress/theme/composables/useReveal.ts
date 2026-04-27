import { onMounted, onUnmounted, ref, type Ref } from "vue";

export function useReveal(delay = 0): Ref<HTMLElement | null> {
  const el = ref<HTMLElement | null>(null);
  let observer: IntersectionObserver | null = null;
  let fallbackTimer: ReturnType<typeof setTimeout> | null = null;

  onMounted(() => {
    if (!el.value) return;
    const target = el.value;
    target.style.setProperty("--reveal-delay", `${delay}ms`);
    target.classList.add("reveal-pending");

    const show = () => {
      target.classList.remove("reveal-pending");
      target.classList.add("reveal-visible");
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
        fallbackTimer = null;
      }
      observer?.disconnect();
      observer = null;
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(target);
    fallbackTimer = setTimeout(() => {
      const rect = target.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) show();
      else fallbackTimer = null;
    }, 900 + delay);
  });

  onUnmounted(() => {
    observer?.disconnect();
    if (fallbackTimer) {
      clearTimeout(fallbackTimer);
      fallbackTimer = null;
    }
  });

  return el;
}
