export const waitSeconds = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

async function* endlessGenerator() {
  let count = 0;
  while (true) {
    yield count++;
  }
}

const waitAsyncResult = <T extends () => Promise<any>>(
  fetcher: T,
  maxWaitTime: number = 100,
  interval = 3
) => {
  let isStop = false;
  const stop = () => (isStop = true);
  const promise = new Promise<NonNullable<Awaited<ReturnType<T>>>>(
    async (resolve, reject) => {
      const generator =
        maxWaitTime === 0
          ? endlessGenerator()
          : Array.from({ length: Math.floor(maxWaitTime / interval) });

      for await (const _ of generator) {
        try {
          if (isStop) {
            reject(new Error("Wait async stop"));
            return;
          }
          const res = await fetcher();
          if (res) {
            resolve(res);
            return;
          }
        } catch (_) {
        } finally {
          await waitSeconds(interval);
        }
      }
      reject(new Error("Wait async timeout"));
    }
  );

  return [promise, stop] as const;
};

export default waitAsyncResult;
