export interface CalculateWPMWorkerMessage {
  good: number;
  bad: number;
  timePassedInMilliseconds: number;
}

self.onmessage = function (e: MessageEvent<CalculateWPMWorkerMessage>) {
  const { good, bad, timePassedInMilliseconds } = e.data;

  const totalKeyStrokes = good + bad;
  const accuracy = totalKeyStrokes === 0 ? 0 : (good / totalKeyStrokes);
  const timeInSeconds = timePassedInMilliseconds / 1000;

  const currWpm = (totalKeyStrokes / 5) / (timeInSeconds / 60) * accuracy;

  postMessage(currWpm);
};
