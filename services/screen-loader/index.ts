let showFn: ShowFn<string>;
let closeFn: CloseFn;

export const setLoadingHandlers = (show: ShowFn<string>, close: CloseFn) => {
  showFn = show;
  closeFn = close;
};

export const loading = {
  show: (content?: string) => {
    if (showFn) showFn(content ?? "");
    else console.warn("Loading: show() not ready yet");
  },
  close: () => {
    if (closeFn) closeFn();
    else console.warn("Loading: close() not ready yet");
  },
};
