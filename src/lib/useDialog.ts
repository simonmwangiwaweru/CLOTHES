import { RefObject, useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

let scrollLocks = 0;

function lockScroll() {
  scrollLocks += 1;
  document.body.style.overflow = 'hidden';
}

function unlockScroll() {
  scrollLocks = Math.max(0, scrollLocks - 1);
  if (scrollLocks === 0) document.body.style.overflow = '';
}

/**
 * Shared modal behaviour: Esc to close, page scroll lock, focus moved into the
 * dialog on open, Tab trapped inside it, and focus returned to the trigger on close.
 */
export function useDialog(open: boolean, onClose: () => void, ref: RefObject<HTMLElement | null>) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    lockScroll();

    const node = ref.current;
    const focusables = () => (node ? Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)) : []);
    (focusables()[0] ?? node)?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      unlockScroll();
      previouslyFocused?.focus?.();
    };
  }, [open, ref]);
}
