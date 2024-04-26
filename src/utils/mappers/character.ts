
export const mapCharacterToDetailsCardElement = (character: Character): DetailsCardElement => {
    return {
        field1: character.name,
        field2: character.age?.toString(),
        field3: character.weight?.toString(),
        field4: character.history,
        endpoint: character.endpoint,
        image1: character.image,
        list1: character.seriesMovies
    };
}

export const mapDetailsCardElementToCharacter = (detailsCardElement: DetailsCardElement): Character => {
    return {
        name: detailsCardElement.field1,
        age: detailsCardElement.field2,
        weight: detailsCardElement.field3,
        history: detailsCardElement.field4,
        image: detailsCardElement.image1,
        endpoint: detailsCardElement.endpoint,
        seriesMovies: detailsCardElement.list1
    };
}