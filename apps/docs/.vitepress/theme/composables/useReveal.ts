import { onMounted, onUnmounted, ref, type Ref } from "vue";

export function useReveal(delay = 0): Ref<HTMLElement | null> {
  const el = ref<HTMLElement | null>(null);
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    if (!el.value) return;
    const target = el.value;
    target.style.setProperty("--reveal-delay", `${delay}ms`);

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          target.classList.add("reveal-visible");
          observer?.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(target);
  });

  onUnmounted(() => observer?.disconnect());

  return el;
}
