
export const mapCharacterAssignedToDetailsCardElement = (character: CharacterAssigment): DetailsCardElement => {
    return {
        id: character.id,
        field1: character.name,
        field2: character.age?.toString(),
        field3: "",
        field4: character.history,
        field5: "",
        image1: character.image,
        list1: [],
        check1: character.assigned,
        extraField1: ""
    };
}

export const mapDetailsCardElementToCharacterAssigned = (detailsCardElement: DetailsCardElement): CharacterAssigment => {
    return {
        id: detailsCardElement.id,
        name: detailsCardElement.field1,
        age: detailsCardElement.field2,
        history: detailsCardElement.field4,
        image: detailsCardElement.image1,
        assigned: detailsCardElement.check1
    };
}