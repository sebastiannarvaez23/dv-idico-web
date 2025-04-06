export const mapGenderToAutocompleteSelectItem = (gender: Gender): AutocompleteSelectItem => {
    return {
        label: gender.name,
        value: gender.id
    };
}