// Only attributes the installed @types/react lacks. Delete each line once @types/react declares it.
import "react";

declare module "react" {
  // Merging needs React's own type parameter, unused here.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ButtonHTMLAttributes<T> {
    commandfor?: string;
    command?:
      | "show-modal"
      | "close"
      | "request-close"
      | "show-popover"
      | "hide-popover"
      | "toggle-popover"
      | `--${string}`;
  }
}
