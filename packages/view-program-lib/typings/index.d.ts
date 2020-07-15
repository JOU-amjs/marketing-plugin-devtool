
/*
 * @Date: 2020-04-09 11:06:01
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-04-10 15:27:00
 */

// type TEventChannel = {
//   on(eventName: string, fn: Function): void,
//   off(eventName: string, fn: Function): void,
//   emit(eventName: string, args: any): void,
//   once(eventName: string, fn: Function): void,
// };

// type TNavCallback = {
//   success?(res?: { eventChannel: TEventChannel }): void,
//   fail?(): void,
//   complete?(): void,
// };

// type TNavOptions = {
//   url: string,
// } & TNavCallback;
// type TBackOptions = {
//   delta?: number
// } & TNavCallback;

// declare module 'weixin-js-sdk' {
//   export namespace miniProgram {
//     function navigateTo(object: TNavOptions & { events?: { [eventName: string]: Function } }): void;
//     function redirectTo(object: TNavOptions): void;
//     function navigateBack(object: TBackOptions): void;
//     function getEnv(callback: (res: { miniprogram: boolean }) => void): void;
//   }
// }