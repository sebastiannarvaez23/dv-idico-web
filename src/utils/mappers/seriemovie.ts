const formattingDate = (date: Date): string => {
    const months: string[] = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    const dia: number = date.getDate();
    const mes: string = months[date.getMonth()];
    const año: number = date.getFullYear();

    return `${dia} de ${mes} de ${año}`;
}

export const mapSerieMovieToDetailsCardElement = (serieMovie: SerieMovie): DetailsCardElement => {
    return {
        field1: serieMovie.title,
        field2: formattingDate(new Date(serieMovie.created_date)),
        field3: serieMovie.qualification.toString(),
        field4: serieMovie.gender,
        image1: serieMovie.image,
        list1: serieMovie.characters
    };
}