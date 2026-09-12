import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IoAddOutline, IoRemoveOutline, IoCloseOutline, IoChevronBack, IoChevronForward, IoRefreshOutline } from "react-icons/io5";
import styles from "./GalleryLightbox.module.css";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const initialView = { scale: 1, x: 0, y: 0 };

export default function GalleryLightbox({ images, initialIndex, projectName, onClose }) {
  const [index, setIndex] = useState(initialIndex);
  const [view, setView] = useState(initialView);
  const [failed, setFailed] = useState(false);
  const dialog = useRef(null);
  const stage = useRef(null);
  const pointers = useRef(new Map());
  const swipe = useRef(null);
  const liveView = useRef(initialView);

  const updateView = useCallback((next) => {
    liveView.current = next;
    setView(next);
  }, []);
  const reset = useCallback(() => updateView(initialView), [updateView]);
  const navigate = useCallback((step) => {
    setIndex((current) => (current + step + images.length) % images.length);
    setFailed(false);
    pointers.current.clear();
    swipe.current = null;
    reset();
  }, [images.length, reset]);

  const zoom = useCallback((factor, clientX, clientY) => {
    const current = liveView.current;
    const scale = clamp(current.scale * factor, 1, 5);
    const rect = stage.current.getBoundingClientRect();
    const x = (clientX ?? rect.left + rect.width / 2) - rect.left - rect.width / 2;
    const y = (clientY ?? rect.top + rect.height / 2) - rect.top - rect.height / 2;
    const ratio = scale / current.scale;
    updateView(scale === 1 ? initialView : {
      scale,
      x: clamp(x - (x - current.x) * ratio, -rect.width * (scale - 1) / 2, rect.width * (scale - 1) / 2),
      y: clamp(y - (y - current.y) * ratio, -rect.height * (scale - 1) / 2, rect.height * (scale - 1) / 2),
    });
  }, [updateView]);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const node = dialog.current;
    node.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      node.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  useEffect(() => {
    const node = stage.current;
    const onWheel = (event) => {
      event.preventDefault();
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? node.clientHeight : 1);
      zoom(Math.exp(-clamp(delta, -100, 100) * .003), event.clientX, event.clientY);
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [zoom]);

  const onPointerDown = (event) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    swipe.current = pointers.current.size === 1 && liveView.current.scale === 1
      ? { x: event.clientX, y: event.clientY } : null;
  };
  const onPointerMove = (event) => {
    const previous = pointers.current.get(event.pointerId);
    if (!previous) return;
    const before = [...pointers.current.values()];
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const after = [...pointers.current.values()];
    if (after.length === 2) {
      const distance = (points) => Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
      const oldDistance = distance(before);
      if (oldDistance > 0) zoom(distance(after) / oldDistance, (after[0].x + after[1].x) / 2, (after[0].y + after[1].y) / 2);
    } else if (after.length === 1 && liveView.current.scale > 1) {
      const current = liveView.current;
      const rect = stage.current.getBoundingClientRect();
      updateView({ ...current,
        x: clamp(current.x + event.clientX - previous.x, -rect.width * (current.scale - 1) / 2, rect.width * (current.scale - 1) / 2),
        y: clamp(current.y + event.clientY - previous.y, -rect.height * (current.scale - 1) / 2, rect.height * (current.scale - 1) / 2),
      });
    }
  };
  const onPointerEnd = (event) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.delete(event.pointerId);
    if (event.type === "pointerup" && swipe.current && liveView.current.scale === 1) {
      const dx = event.clientX - swipe.current.x;
      const dy = event.clientY - swipe.current.y;
      if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy) * 1.5) navigate(dx < 0 ? 1 : -1);
    }
    swipe.current = null;
  };
  const onKeyDown = (event) => {
    const actions = { ArrowLeft: () => navigate(-1), ArrowRight: () => navigate(1), "+": () => zoom(1.25), "=": () => zoom(1.25), "-": () => zoom(.8), "0": reset };
    if (actions[event.key]) { event.preventDefault(); actions[event.key](); }
  };

  return createPortal(
    <dialog ref={dialog} className={styles.dialog} aria-label={`${projectName} ছবি গ্যালারি`} onCancel={(event) => { event.preventDefault(); onClose(); }} onKeyDown={onKeyDown}>
      <header className={styles.toolbar}>
        <div className={styles.title}><strong>{projectName}</strong><span aria-live="polite">ছবি {index + 1} / {images.length}</span></div>
        <div className={styles.controls}>
          <button type="button" onClick={() => zoom(.8)} disabled={view.scale <= 1} aria-label="Zoom out" title="Zoom out (−)"><IoRemoveOutline /></button>
          <output aria-label="Zoom level">{Math.round(view.scale * 100)}%</output>
          <button type="button" onClick={() => zoom(1.25)} disabled={view.scale >= 5} aria-label="Zoom in" title="Zoom in (+)"><IoAddOutline /></button>
          <button type="button" onClick={reset} aria-label="Reset zoom" title="Reset (0)"><IoRefreshOutline /></button>
          <button type="button" onClick={onClose} aria-label="Close gallery" title="Close (Esc)" autoFocus><IoCloseOutline /></button>
        </div>
      </header>
      <div ref={stage} className={styles.stage} style={{ cursor: view.scale > 1 ? "grab" : "zoom-in" }} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerEnd} onPointerCancel={onPointerEnd} onLostPointerCapture={onPointerEnd} onDoubleClick={(event) => view.scale > 1 ? reset() : zoom(2, event.clientX, event.clientY)}>
        {failed ? <p className={styles.error}>ছবিটি লোড করা যায়নি। পরের ছবিটি দেখুন।</p> : <img key={index} src={images[index]} alt={`${projectName} — ছবি ${index + 1}`} draggable={false} onError={() => setFailed(true)} style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }} />}
      </div>
      {images.length > 1 && <>
        <button type="button" className={`${styles.arrow} ${styles.previous}`} onClick={() => navigate(-1)} aria-label="Previous image" title="আগের ছবি (←)"><IoChevronBack /></button>
        <button type="button" className={`${styles.arrow} ${styles.next}`} onClick={() => navigate(1)} aria-label="Next image" title="পরের ছবি (→)"><IoChevronForward /></button>
      </>}
      <footer className={styles.hint}>স্ক্রল / পিঞ্চ করে জুম · ড্র্যাগ করে সরান · ডাবল ক্লিকে জুম / রিসেট · ← → ছবি বদলান</footer>
    </dialog>, document.body,
  );
}
