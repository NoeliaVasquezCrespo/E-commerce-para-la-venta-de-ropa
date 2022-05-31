export interface Producto{
    id?: number;
    codigoProducto: string;
    nombreProducto : string;
    descripcion : string;
    precio : number;
    administradorId : number;
    status?: number;
}