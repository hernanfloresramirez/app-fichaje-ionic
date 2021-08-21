export interface Ficha {
    id_ficha?: bigint,
    codmed: number,
    codesp: number,
    codserv: number,
    dia: number,
    periodo: number,
    codcon: number,
    codtit: bigint,
    codpac: bigint,
    fechasoli: Date,
    horasoli: Date,
    nroficha: number,
    horapres: Date,
    horaaten: Date,
    estado: string,
    codusu: number,
    estcons: string
}
