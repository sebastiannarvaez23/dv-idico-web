
export const mapCharacterToDetailsCardElement = (character: Character): DetailsCardElement => {
    return {
        id: character.id,
        field1: character.name,
        field2: character.age?.toString(),
        field3: character.weight?.toString(),
        field4: character.history,
        endpoint: character.endpoint,
        image1: character.image,
        list1: character.products,
        extraField1: null
    };
}

export const mapDetailsCardElementToCharacter = (detailsCardElement: DetailsCardElement): Character => {
    return {
        id: detailsCardElement.id,
        name: detailsCardElement.field1,
        age: detailsCardElement.field2,
        weight: detailsCardElement.field3,
        history: detailsCardElement.field4,
        image: detailsCardElement.image1,
        endpoint: detailsCardElement.endpoint,
        products: detailsCardElement.list1
    };
}