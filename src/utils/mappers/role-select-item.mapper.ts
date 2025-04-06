
export const mapRoleToAutocompleteSelectItem = (role: Role): AutocompleteSelectItem => {
    return {
        label: role.name,
        value: role.id
    };
}