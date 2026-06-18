import { TipoContactPage } from "./enums/tipo-contact-page"

export interface contactPageModel {
    type: TipoContactPage,
    srcImg: string,
    idImg: string,
    altImg: string,
    spanId: string | null,
    spanContent: string | null,
    text: string | null,
    anchor: {
        id: string,
        href: string,
        target: string | null,
        content: string
    } | null
}
