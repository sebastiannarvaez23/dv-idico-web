
export const mapCharacterToDetailsCardElement = (character: Character): DetailsCardElement => {
    return {
        id: character.id,
        field1: character.name,
        field2: character.age?.toString(),
        field3: "",
        field4: character.history,
        field5: "",
        image1: character.image,
        list1: character.products,
        extraField1: ""
    };
}

export const mapDetailsCardElementToCharacter = (detailsCardElement: DetailsCardElement): Character => {
    return {
        id: detailsCardElement.id,
        name: detailsCardElement.field1,
        age: detailsCardElement.field2,
        history: detailsCardElement.field4,
        image: detailsCardElement.image1,
        products: detailsCardElement.list1 as Product[]
    };
}