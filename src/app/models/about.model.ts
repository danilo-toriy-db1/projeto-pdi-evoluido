export interface AboutModel {
    id: number,
    nome: string,
    idade: number,
    carreira: string,
    profissao: string,
    empresa: string,
    descricao: {
        biografia: string,
        hobbies: string,
        desgostos: string,
        objetivos: string
    }
}
