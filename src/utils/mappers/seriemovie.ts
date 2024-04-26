const formattingDate = (date: Date): string => {
    const months: string[] = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    const day: number = date.getDate();
    const month: string = months[date.getMonth()];
    const year: number = date.getFullYear();

    return `${day} de ${month} de ${year}`;
}

const parseDateString = (dateString: string): string => {
    const dateParts = dateString.split(" ");
    const day = parseInt(dateParts[0]);
    const monthStr = dateParts[2];
    const month = parseMonth(monthStr);
    const year = parseInt(dateParts[4]);
    return `${year}-${month}-${day}`;
}

const parseMonth = (monthStr: string): number => {
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    return months.findIndex(month => month === monthStr.toLowerCase());
}

export const mapSerieMovieToDetailsCardElement = (serieMovie: SerieMovie): DetailsCardElement => {
    return {
        field1: serieMovie.title,
        field2: formattingDate(new Date(serieMovie.created_date)),
        field3: serieMovie.qualification,
        field4: serieMovie.gender,
        endpoint: "",
        image1: serieMovie.image,
        list1: serieMovie.characters
    };
}

export const mapDetailsCardElementToSerieMovie = (detailsCardElement: DetailsCardElement): SerieMovie => {
    return {
        title: detailsCardElement.field1,
        created_date: parseDateString(detailsCardElement.field2),
        qualification: detailsCardElement.field3,
        gender: detailsCardElement.field4,
        image: detailsCardElement.image1,
        characters: detailsCardElement.list1
    };
}