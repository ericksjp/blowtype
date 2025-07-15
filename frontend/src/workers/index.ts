let wpmWorker: Worker | null = null;
let precisionWorker: Worker | null = null;

export function getWpmWorker() {
    if (!wpmWorker) {
        wpmWorker = new Worker(new URL("./WpmWorker.ts", import.meta.url));
    }
    return wpmWorker;
};

export function getPrecisionWorker() {
  if (!precisionWorker) {
    precisionWorker = new Worker(new URL("./PrecisionWorker.ts", import.meta.url));
  }
  return precisionWorker;
};

