/**
 * copy(text) + `state` ('idle' | 'copied' | 'failed') that resets after ~2s.
 * Async Clipboard API (Widely available; secure contexts only). A rejected write (denied
 * permission, no clipboard) reports 'failed' so the caller can show and announce it.
 * Repeated copies restart the timer instead of stacking timers; `attempt` counts them, so
 * a caller can make a repeated status message differ (VoiceOver skips a message identical
 * to the previous one: MWG copy-button).
 */
import { useEffect, useRef, useState } from "react";

type CopyState = "idle" | "copied" | "failed";

export function useCopyToClipboard(resetMs = 2000) {
  const [state, setState] = useState<CopyState>("idle");
  const [attempt, setAttempt] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy(text: string) {
    clearTimeout(timer.current);
    let copied = true;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      copied = false;
    }
    setState(copied ? "copied" : "failed");
    setAttempt((n) => n + 1);
    timer.current = setTimeout(() => setState("idle"), resetMs);
    return copied;
  }

  return { state, attempt, copy };
}
