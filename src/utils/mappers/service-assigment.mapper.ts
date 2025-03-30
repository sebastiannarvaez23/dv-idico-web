
export const mapServiceAssignedToDetailsCardElement = (character: ServiceAssigment): DetailsCardElement => {
    return {
        id: character.id,
        field1: character.name,
        field2: "",
        field3: "",
        field4: "",
        field5: "",
        image1: "",
        list1: [],
        check1: character.assigned,
        extraField1: ""
    };
}

export const mapDetailsCardElementToServiceAssigned = (detailsCardElement: DetailsCardElement): ServiceAssigment => {
    return {
        id: detailsCardElement.id,
        name: detailsCardElement.field1,
        assigned: detailsCardElement.check1
    };
}