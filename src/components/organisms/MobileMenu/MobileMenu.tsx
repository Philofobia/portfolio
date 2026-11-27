"use client";

/**
 * 'use client' — burger toggle + full-screen overlay nav for small screens.
 *
 * The burger is a bar cell of the header; the sheet (MenuSheet) sits in a modal <dialog>
 * (top layer, focus kept inside, page inert, Escape closes: all native), and this
 * component feeds it the live section (useScrollSpy).
 * The page underneath does not scroll: overscroll-behavior on the dialog and its
 * backdrop (MWG prevent-page-scroll-under-modal-dialog), never overflow on <html>.
 *
 * Opening: invoker commands (commandfor + command="show-modal") open it with no script,
 * even before hydration; where they are missing, the click handler calls showModal()
 * (MWG declarative-dialog-popover-control, without its polyfill: the project's policy).
 * Closing: × submits a <form method="dialog">; Escape; choosing a link or the logo.
 * Motion (motion-safe only; otherwise, and before hydration for the exit, it is instant):
 * one clip-path transition, 500ms, the same both ways. The sheet's top row is the header's
 * bar, so it opens by unrolling downward from that row (@starting-style on the open state)
 * and closes by retracting up into it, handing over to the bar without a jump.
 * The exit is the MWG animate-to-from-top-layer fallback, used in every browser: all three
 * ways to close go through close(), where data-closing runs the transition while the
 * dialog stays open, and close() waits for it. The guide's pure-CSS exit (display/overlay
 * with allow-discrete) runs in Chromium only, so it is not used.
 * The dialog is the scroll-target-group, so the logo's #hero counts as a section, as in the bar.
 * The Header hides the burger once the bar fits the inline Nav.
 */
import { useTranslations } from "next-intl";
import { type SyntheticEvent, useId, useRef } from "react";
import { BurgerIcon } from "@/components/atoms/BurgerIcon";
import { IconButton } from "@/components/atoms/IconButton";
import { MenuSheet } from "@/components/organisms/MenuSheet";
import { navIds } from "@/content/nav";
import { useScrollSpy } from "@/hooks/useScrollSpy";

export function MobileMenu({ className }: { className?: string }) {
  const t = useTranslations("header");
  const dialogId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const current = useScrollSpy(navIds, listRef);

  function open() {
    if (!("commandForElement" in HTMLButtonElement.prototype)) {
      dialogRef.current?.showModal();
    }
  }

  async function close() {
    const dialog = dialogRef.current;
    if (!dialog?.open || dialog.hasAttribute("data-closing")) return;
    dialog.setAttribute("data-closing", "");
    // getAnimations() flushes styles, so the clip-path transition has started.
    await Promise.race([
      Promise.allSettled(
        dialog.getAnimations().map(({ finished }) => finished),
      ),
      new Promise((resolve) => setTimeout(resolve, 1000)),
    ]);
    dialog.removeAttribute("data-closing");
    dialog.close();
  }

  // × (its form's submit bubbles here) and Escape: animate instead of closing at once.
  function closeAnimated(event: SyntheticEvent) {
    event.preventDefault();
    void close();
  }

  return (
    <>
      <IconButton
        label={t("menu.open")}
        aria-haspopup="dialog"
        commandfor={dialogId}
        command="show-modal"
        onClick={open}
        className={className}
      >
        <BurgerIcon />
      </IconButton>

      <dialog
        ref={dialogRef}
        id={dialogId}
        aria-label={t("menu.title")}
        onSubmit={closeAnimated}
        onCancel={closeAnimated}
        className="inset-0 m-0 h-auto max-h-none w-auto max-w-none overscroll-contain border-0 bg-bg p-0 text-ink [--menu-bar:var(--bar)] [clip-path:inset(0)] scroll-target-group backdrop:overflow-hidden backdrop:overscroll-contain data-closing:[clip-path:inset(0_0_calc(100%-var(--menu-bar))_0)] motion-safe:transition-[clip-path] motion-safe:duration-500 motion-safe:ease-in-out md:[--menu-bar:var(--cell)] motion-safe:open:starting:[clip-path:inset(0_0_calc(100%-var(--menu-bar))_0)]"
      >
        <MenuSheet current={current} listRef={listRef} onNavigate={close} />
      </dialog>
    </>
  );
}
