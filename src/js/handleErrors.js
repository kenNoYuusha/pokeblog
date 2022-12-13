import { NetworkError, NotFound } from "./customErrors";
const handleWrongResponses = (response) => {
    
    switch (response.status) {
    case 404:
      throw new NotFound("No se encontro lo que buscas compadrito");
    default:
      throw new Error("ya nose que sea");
  }
};
export { handleWrongResponses };
