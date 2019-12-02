export const eres = <T>(promise: Promise<T>): Promise<(T | null)[] | [null, any]> =>
  promise
    .then((result) => {
      return [result, null];
    })
    .catch((err) => {
      return [null, err];
    });
