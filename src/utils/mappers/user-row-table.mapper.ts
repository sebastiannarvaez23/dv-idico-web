interface RowTableUser {
    [key: string]: string;
    active: string;
}

export const mapUserToRowTableUser = (user: User): RowTableUser => {
    const mapped = Object.entries(user).reduce((acc, [key, value]) => {
        acc[key] = key === 'active'
            ? value ? 'S' : 'N'
            : String(value);
        return acc;
    }, {} as Record<string, string>);

    return mapped as RowTableUser;
}