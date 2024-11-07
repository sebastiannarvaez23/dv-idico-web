interface Product {
    id: string;
    title: string;
    image: File | string;
    createdDate: Date;
    qualification: string;
    gender: Gender;
    kind: Kind;
    characters: Character[];
}