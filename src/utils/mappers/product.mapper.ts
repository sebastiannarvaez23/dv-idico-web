const months: string[] = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];

const formattingDate = (date: string): string => {
    const arrDate = date.split("-");
    const day: string = arrDate[2];
    const month: string = months[parseInt(arrDate[1]) - 1];
    const year: string = arrDate[0];
    return `${day} de ${month} de ${year}`;
}

const parseDateString = (dateString: string): string => {
    const dateParts = dateString.split(" ");
    const day = parseInt(dateParts[0]).toString().padStart(2, '0');
    const monthStr = dateParts[2];
    const month = (parseMonth(monthStr) + 1).toString().padStart(2, '0');
    const year = parseInt(dateParts[4]);
    return `${year}-${month}-${day}`;
}

const parseMonth = (monthStr: string): number => {
    return months.findIndex(month => month === monthStr.toLowerCase());
}

export const mapProductToDetailsCardElement = (product: Product): DetailsCardElement => {
    return {
        id: product.id,
        field1: product.title,
        field2: (product.created_date) ? formattingDate(product.created_date) : "",
        field3: product.qualification,
        field4: product.gender?.name,
        extraField1: product.gender?.id,
        endpoint: product.endpoint,
        image1: product.image as string,
        list1: product.characters,
    };
}

export const mapDetailsCardElementToProduct = (detailsCardElement: DetailsCardElement): Product => {
    return {
        id: detailsCardElement.id,
        title: detailsCardElement.field1,
        created_date: (detailsCardElement.field2) ? parseDateString(detailsCardElement.field2) : "",
        qualification: detailsCardElement.field3,
        endpoint: detailsCardElement.endpoint,
        gender: { id: detailsCardElement.extraField1, name: detailsCardElement.field4 },
        image: detailsCardElement.image1,
        characters: detailsCardElement.list1
    };
}