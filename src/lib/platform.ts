import axios, { Axios, AxiosInstance } from "axios";
import { AcceptEnum, AuthTypes } from "./interfaces/enums";
import { CommonHeaders, PlatformProps, IQuickSend, IQuickSendPersonalized } from "./interfaces/interface";

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

    sendPersonalized(body: IQuickSendPersonalized){
        // check to make sure personalise values matches message slots
        const slots = body.Content.match(/\{\$[\S]+\}/gm);
        console.log({slots});

         if (Array.isArray(body.To)){
            if (body.To.some(el =>  el.values.length !== slots?.length)){
                throw new Error("Message personalization slots does not match with provided values for some destinations") 
            }
         }else{
            if (body.To.values.length !== slots?.length){
                throw new Error("Message personalization slots does not match with provided destinations values") 
            }
         }
        return this._axiosInstance.post(`/message/sms/send`, {messages: [this.createPersonalizedMessage(body)]})
    }


    checkBalance(){
        return this._axiosInstance.post(`/reports/balance`)
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
    createPersonalizedMessage(body: IQuickSendPersonalized){
        return {text: body.Content,
                type: body.Type,
                sender: body.From,
                destinations: Array.isArray(body.To)? body.To : [body.To]
            }
    }
    
}