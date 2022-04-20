export interface admin{
    id?: number;
    nombre: string;
    apellido: string;
    edad: number;
    correoElectronico: string;
    userName?: string;
    password: string;
    tipoAdministradorId: number;
    status: number;
    empresaId: number;
}
