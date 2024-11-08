
export const mapCharacterToListItem = (character: Character, status: 'A' | 'P'): ListItem => {
    return {
        id: character.id,
        status: status,
        value: character.name
    };
}