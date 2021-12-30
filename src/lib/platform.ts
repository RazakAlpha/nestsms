import axios, { Axios, AxiosInstance } from "axios";
import { AcceptEnum, AuthTypes } from "./interfaces/enums";
import { CommonHeaders, PlatformProps, IQuickSend } from "./interfaces/interface";

export class smsEngine {
    private _props : PlatformProps;
    private _headers : CommonHeaders;
    private _axiosInstance : AxiosInstance
  
    constructor(properties: PlatformProps, header?: CommonHeaders){
        this._props = properties;
        this._headers = new CommonHeaders();
        // set Authorisation
        if(this._props.authModel){
            this._headers.setAuthorization(this._props.authModel)
        }

        this._axiosInstance = axios.create({
            baseURL: this.url,
            headers: this._headers.headers
        })
    }

    
    public set header(v : CommonHeaders) {
        this._headers = v;
    }

    public get url(){
        return `${this._props.host}/${this._props.version}`
    }

    quickSend(body:IQuickSend) {
        return this._axiosInstance.post(`/message/sms/send`, {messages: [this.createMessage(body)]})
    }

    createMessage(body: IQuickSend){
        return {text: body.Content,
                type: body.Type,
                sender: body.From,
                destinations: Array.isArray(body.To)? body.To.map(el =>  {
                    return {to: el}
                }) : [{to: body.To}]
            }
    }
    
}