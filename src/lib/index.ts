import { PlatformProps } from "./interfaces/interface";
import { smsEngine } from "./platform";
import {IQuickSend} from "./interfaces"

let _smsEngine: smsEngine

export function init(properties: PlatformProps){
   _smsEngine = new smsEngine(properties);
   return _smsEngine;
}

export function getSmsEngine() {
    return _smsEngine;
}
export function quickSend(body: IQuickSend) {
    return _smsEngine.quickSend(body)
}