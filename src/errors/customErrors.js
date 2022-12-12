export class NetworkError extends Error {
    constructor(msj){
        super(msj)
        this.name = "Network Error";
    }
}