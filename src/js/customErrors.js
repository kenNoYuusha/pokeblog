export class NetworkError extends Error {
    constructor(msj){
        super(msj)
        this.name = "Network Error";
    }
}

export class NotFound extends Error {
    constructor(msj){
        super(msj)
        this.name = "You won't catch Pokemons"
    }
}