export const mapKindToAutocompleteSelectItem = (kind: Kind): AutocompleteSelectItem => {
    return {
        label: kind.name,
        value: kind.id
    };
}