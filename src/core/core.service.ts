import { API } from "./api.interface";

/**
 * Service Methods
 */

export const findByFirstName = (name: string): API => {

    const apiFound = Object.values(apis).find(api => getFirstName(api).toLowerCase() === name.toLowerCase())
    if (!apiFound) {
        throw new Error('No api found for the given first name')
    }
    return apiFound
}

const getFirstName = (api: API): string => {
    return api.name.split(' ')[0]
}

/**
 * Data
 */

let apis: { [key: number]: API } = {
    201720295:
    {
        name: "Allana Dos Santos Campos",
        address: "https://sd-ascampos-20212.herokuapp.com/"
    },
    201512136:
    {
        name: "Annya Rita De Souza Ourives",
        address: "https://sd-annyaourives-20212.herokuapp.com/hello"
    },
    201512137:
    {
        name: 'Daniel Andrade Penêdo Santos',
        address: '/'
    },
    201710375:
    {
        name: 'Emmanuel Norberto Ribeiro Dos Santos',
        address: 'https://sd-emmanuel.herokuapp.com/'
    },
    201420373:
    {
        name: 'Gabriel Figueiredo Góes',
        address: '/'
    },
    201710376:
    {
        name: 'Guilherme Senna Cruz',
        address: 'https://nodejs-sd-guilhermesenna.herokuapp.com/'
    },
    201710377:
    {
        name: 'Hiago Rios Cordeiro',
        address: 'https://sd-api-uesc.herokuapp.com/'
    },
    201810665:
    {
        name: 'Jenilson Ramos Santos',
        address: 'https://jenilsonramos-sd-20211.herokuapp.com/'
    },
    201610327:
    {
        name: 'João Pedro De Gois Pinto',
        address: 'https://sd-joaopedrop-20212.herokuapp.com/'
    },
    201610337:
    {
        name: 'Luís Carlos Santos Câmara',
        address: 'https://sd-20212-luiscarlos.herokuapp.com/'
    },
    201620181:
    {
        name: 'Matheus Santos Rodrigues',
        address: '/'
    },
    201620400:
    {
        name: 'Nassim Maron Rihan',
        address: 'https://sd-nassimrihan-2021-2.herokuapp.com/'
    },
    201710396:
    {
        name: 'Robert Morais Santos Broketa',
        address: '/'
    },
    201720308:
    {
        name: 'Victor Dos Santos Santana',
        address: 'https://sd-victor-20212.herokuapp.com/'
    }
};
