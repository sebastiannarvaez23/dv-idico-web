interface TokenSession {
    sub: string;
    id: string;
    role: string;
    services: string[];
    iat: number;
    exp: number;
}