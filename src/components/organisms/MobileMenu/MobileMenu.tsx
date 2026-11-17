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
 * The dialog is the scroll-target-group, so the logo's #hero counts as a section, as in the bar.
 * The Header hides the burger once the bar fits the inline Nav.
 */
import { useTranslations } from "next-intl";
import { useId, useRef } from "react";
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

  function close() {
    dialogRef.current?.close();
  }

  return (
    <>
      <IconButton
        frame="bar"
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
        className="inset-0 m-0 h-auto max-h-none w-auto max-w-none overscroll-contain border-0 bg-bg p-0 text-ink scroll-target-group backdrop:overflow-hidden backdrop:overscroll-contain"
      >
        <MenuSheet current={current} listRef={listRef} onNavigate={close} />
      </dialog>
    </>
  );
}
