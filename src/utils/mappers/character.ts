
export const mapCharacterToDetailsCardElement = (character: Character): DetailsCardElement => {
    return {
        field1: character.name,
        field2: character.age.toString(),
        field3: character.weight.toString(),
        field4: character.story,
        image1: character.image,
        list1: character.seriesmovies
    };
}

