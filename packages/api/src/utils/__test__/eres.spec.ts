import { eres } from '../promise';

it('should reject the promise and return the error on the second item of the array', async () => {
  const execPromise = (): Promise<number> =>
    new Promise<number>((_resolve, reject) => {
      setTimeout(() => {
        reject('Should throw');
      }, 500);
    });

  const [res, err] = await eres(execPromise());

  expect(res).toBe(null);
  expect(err).toBe('Should throw');
});

it('should resolve the promise and return the value', async () => {
  const execPromise = (): Promise<number> =>
    new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(100);
      }, 500);
    });

  const [res, err] = await eres(execPromise());

  expect(res).toBe(100);
  expect(err).toBe(null);
});
