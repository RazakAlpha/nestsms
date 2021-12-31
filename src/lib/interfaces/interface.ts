import { AcceptEnum, AuthTypes, MessageTypes } from "./enums";

export interface ICommonHeaders {
    ContentType: string;
    Accept: AcceptEnum;
    Host: string;
    Authorization: string;
}

export class CommonHeaders implements ICommonHeaders {
    ContentType: string;
    Accept: AcceptEnum;
    Host: string;
    Authorization: string;

    constructor(v?: ICommonHeaders){
        if (v){
            this.Host = v.Host;
            this.ContentType = v.ContentType;
            this.Accept = v.Accept;
            this.Authorization = v.Authorization;
        }else{
            this.ContentType = 'application/json';
            this.Accept = AcceptEnum.json;
            this.Host = 'api.sms.nestitservices.com',
            this.Authorization = ''
        }

    }

    setAuthorization(model: AuthModel){
        if(model.type === AuthTypes.key){
            this.Authorization = `key ${model.key}`
        }else if(model.type === AuthTypes.factor){
            // Base64 Encodeing;
           const factor = Buffer.from(model.username + '__::' + model.password, 'binary').toString('base64');
           this.Authorization = `factor ${factor}`
        }
    }

    get headers(){
        return {
            "Host": this.Host,
            "Content-Type": this.ContentType,
            "Accept": this.Accept,
            "Authorization": this.Authorization
        }
    }

}

export interface PlatformProps {
    version: string;
    host: string;
    resources?: string;
    authModel: AuthModel


}

export interface AuthModel {
    type: AuthTypes;
    username?: string;
    password?: string;
    key?: string;
}

export interface IQuickSend {
    From: string;
    To: number | number[],
    Content: string;
    Type: MessageTypes
}
export interface IQuickSendPersonalized {
    From: string;
    Content: string;
    Type: MessageTypes
    To: IPersonalizedDestination | IPersonalizedDestination[]
}

export interface IPersonalizedDestination {
    to: number;
    values: (string|number)[]

}