export interface IClients {
    id: string;
    name: string;
    phone: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface IClientLogin {
    email: string;
    password: string;
}

export interface IClientsRequest {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export interface IClientUpdate {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
}
