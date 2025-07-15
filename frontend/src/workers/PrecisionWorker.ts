export interface CalculatePrecisionWorkerMessage {
  good: number;
  bad: number;
}

self.onmessage = function (e: MessageEvent<CalculatePrecisionWorkerMessage>) {
  const { good, bad } = e.data;

  const totalKeystrokes = good + bad;

  const accuracy = totalKeystrokes === 0 ? 0 : (good / totalKeystrokes) * 100;

  postMessage(accuracy);
};
