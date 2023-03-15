import { mainWindow } from "./electron-main";
import { MenuItemConstructorOptions } from "electron";

export const menuTemplate: MenuItemConstructorOptions[] = [
  // { role: 'appMenu' }
  ...[],
  // { role: 'fileMenu' }
  {
    label: "File",
    submenu: [
      {
        label: "Settings",
        accelerator: "CmdOrCtrl+,",
        click() {
          mainWindow?.webContents.send("show-settings");
        },
      },
      { role: "quit" },
    ],
  },
  // { role: 'editMenu' }
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },
      { type: "separator" },
      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      { role: "delete" },
      { type: "separator" },
      { role: "selectAll" },
    ] as MenuItemConstructorOptions[],
  },
  // { role: 'viewMenu' }
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forceReload" },
      { role: "toggleDevTools" },
      { type: "separator" },
      { role: "resetZoom" },
      { role: "zoomIn" },
      { role: "zoomOut" },
      { type: "separator" },
      { role: "togglefullscreen" },
    ] as MenuItemConstructorOptions[],
  },
  // { role: 'windowMenu' }
  {
    label: "Window",
    submenu: [
      { role: "minimize" },
      { role: "zoom" },
      { role: "close" },
    ] as MenuItemConstructorOptions[],
  },
  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click: async () => {
          const { shell } = require("electron");
          await shell.openExternal("https://electronjs.org");
        },
      },
    ],
  },
];
