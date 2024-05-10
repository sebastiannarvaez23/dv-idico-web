interface SerieMovie {
    id: string;
    title: string;
    image: File | string;
    created_date: string;
    qualification: string;
    gender: Gender;
    characters: string[];
}