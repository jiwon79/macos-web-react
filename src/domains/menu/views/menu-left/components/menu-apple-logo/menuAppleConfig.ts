import type { MenuConfig } from "domains/app/interface";

export const menuAppleconfig: MenuConfig = {
  name: "Apple",
  submenuGroups: [
    [{ name: "About This Mac" }],
    [{ name: "System Settings…" }, { name: "App Store" }],
    [{ name: "Recent Items" }],
    [{ name: "Force Quit", shortcut: "⌥⇧⌘⎋" }],
    [{ name: "Sleep" }, { name: "Restart…" }, { name: "Shut Down…" }],
    [
      { name: "Lock Screen", shortcut: "⌃⌘Q" },
      { name: "Log Out…", shortcut: "⇧⌘Q" }
    ]
  ]
};
