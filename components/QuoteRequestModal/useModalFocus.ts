"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      FOCUSABLE_SELECTOR,
    ),
  ).filter(
    (element) =>
      element.tabIndex >= 0 &&
      !element.closest("[inert]") &&
      !element.matches(":disabled") &&
      element.getClientRects().length > 0 &&
      window.getComputedStyle(element).visibility === "visible",
  );
}

function getActivePopover(dialog: HTMLElement) {
  const controls = dialog.querySelectorAll<HTMLElement>(
    '[aria-expanded="true"][aria-controls]',
  );

  for (const control of controls) {
    if (control.closest("[inert]")) continue;

    const popoverId = control.getAttribute("aria-controls");

    if (!popoverId) continue;

    const popover = document.getElementById(popoverId);

    if (
      popover?.matches('[data-modal-popover="true"]') &&
      popover.getClientRects().length > 0
    ) {
      return popover;
    }
  }

  return null;
}

export function useModalFocus(
  dialogRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    dialog.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || event.defaultPrevented) {
        return;
      }

      const confirmation =
        dialog.querySelector<HTMLElement>(
          '[role="alertdialog"]',
        );

      const activePopover = confirmation
        ? null
        : getActivePopover(dialog);

      const activeContainer =
        confirmation ?? activePopover ?? dialog;

      const focusableElements =
        getFocusableElements(activeContainer);

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement =
        focusableElements[focusableElements.length - 1];

      const activeElement = document.activeElement;

      if (
        !activeContainer.contains(activeElement) ||
        !focusableElements.includes(
          activeElement as HTMLElement,
        )
      ) {
        event.preventDefault();

        if (event.shiftKey) {
          lastElement.focus();
        } else {
          firstElement.focus();
        }

        return;
      }

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );

      if (previousFocus?.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [dialogRef]);
}