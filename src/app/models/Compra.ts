export interface Compra{
    id?: number;
    usuarioId : string;
    fecha : Date;
    token: string;
    montoTotal: number;
    status?: number
}