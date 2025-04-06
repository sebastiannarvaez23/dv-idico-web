interface Product {
    id: string;
    title: string;
    image: File | string;
    createdDate: string;
    qualification: string;
    gender: Gender;
    kind: Kind;
    characters: string[];
}