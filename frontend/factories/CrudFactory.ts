import {CrudRequest, RequestOptions} from "@crud/core";
import {chooseFile} from "@crud/web";
import axios, {AxiosRequestConfig} from "axios";

export interface ResponseType<T = any> {
    data: T,
    errors: any[],
    message: string,
    type: "error" | "success"
}

export interface CrudRequestOptions extends RequestOptions {
    signal?: AbortSignal
}

export class CrudFactory extends CrudRequest {
    baseUrl = "/api/";

    getUrl = (...segments) => segments.reduce((url, segment) => url + segment, this.baseUrl);

    async get<Request = any, Response = any> (url: string, data: any = {}, requestOptions: CrudRequestOptions = {}): Promise<ResponseType<Response>>{
        return this.send({
            method: "GET",
            url,
            data,
            ...requestOptions
        });
    }

    async post<Request = any, Response = any> (url: string, data: any = {}, requestOptions: CrudRequestOptions = {}): Promise<ResponseType<Response>>{
        return this.send({
            method: "POST",
            url,
            data,
            ...requestOptions
        });
    }

    async delete<Request = any, Response = any> (url: string, data: any = {}, requestOptions: CrudRequestOptions = {}): Promise<ResponseType<Response>>{
        return this.send({
            method: "DELETE",
            url,
            data,
            ...requestOptions
        });
    }

    async retrieve<Request = any, Response = any> (url: string, data: any = {}, requestOptions: CrudRequestOptions = {}): Promise<ResponseType<Response>>{
        return this.send({
            method: "GET",
            url: `retrieve${url}`,
            data,
            ...requestOptions
        });
    }

    async create<Request = any, Response = any> (url: string, data: any = {}, requestOptions: CrudRequestOptions = {}): Promise<ResponseType<Response>>{
        return this.send({
            method: "POST",
            url: `create${url}`,
            data,
            ...requestOptions
        });
    }

    async send (requestOptions: CrudRequestOptions = {}): Promise<ResponseType>{
        const {url, data, method, notify = true} = requestOptions;

        const options: AxiosRequestConfig = {
            ...requestOptions.ajaxOptions,
            method,
        };

        const fullUrl = this.getUrl(url);

        options.headers = {
            ...options.headers,
            Accept: "application/json"
        };

        if (!(data instanceof FormData)){
            options.headers["Content-Type"] = "application/json";
        }

        if (options.method === "GET"){
            options.params = data;
        } else {
            options.data = data;
        }

        try {
            const response = await axios(fullUrl, options);

            if ([200].includes(response.status)){
                const {type, message} = response.data;

                if (type === "error")
                    throw new Error(message);

                if (options.method !== "GET" && notify){
                    this.notify({
                        message,
                        type,
                    });
                }

                return response.data;
            } else {
                throw new Error(`${response.status} : ${response.statusText}`);
            }
        } catch (e){
            if (options.method !== "GET" && notify)
                this.notify({
                    message: e.message,
                    type: "error",
                });

            throw e;
        }
    }
}

export const $crud = new CrudFactory();
$crud.config(chooseFile);
