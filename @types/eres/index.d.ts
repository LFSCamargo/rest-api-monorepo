declare module 'eres' {
  const eres: EresFn;
  interface EresFn {
    <T, Error>(value: Promise<T>): Promise<[Error, T]>;
  }
  export default eres;
}