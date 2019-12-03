declare const eres: EresFn;
declare interface EresFn {
  <T, Error>(value: Promise<T>): Promise<[Error, T]>;
}
export default eres;