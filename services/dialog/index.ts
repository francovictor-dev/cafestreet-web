let showFn: ShowFn<React.ReactNode>;
let closeFn: CloseFn;

export const setDialogHandler = (
  show: ShowFn<React.ReactNode>,
  close: CloseFn,
) => {
  showFn = show;
  closeFn = close;
};

export const dialog = {
  show: (content: React.ReactNode) => {
    if (showFn) showFn(content ?? "");
    else console.warn("Dialog: show() not ready yet");
  },
  close: () => {
    if (closeFn) closeFn();
    else console.warn("Dialog: close() not ready yet");
  },
};
