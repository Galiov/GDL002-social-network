import { resolve } from "../src/";

const firestone = () => {
    return {
        collection: (nameTable) => {
            return{
                add: (objData) => {
                    return new Promise ((resolve) => {
                        resolve("Post agregado exitosamente")
                    })
                } 
            }
        }
    }
}

const firebase = {
    firestone: firestone
}

export default jest.fn (() => {
    return firebase;
})