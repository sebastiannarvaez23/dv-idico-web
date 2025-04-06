const months: string[] = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
];

const formattingDate = (date: string | Date): string => {
    const dateObj = new Date(date);
    const day = dateObj.getUTCDate().toString().padStart(2, '0');
    const month = months[dateObj.getUTCMonth()];
    const year = dateObj.getUTCFullYear();
    return `${day} de ${month} de ${year}`;
}

const parseDateString = (dateString: string): string => {
    const dateParts = dateString.split(" ");
    const day = parseInt(dateParts[0]).toString().padStart(2, '0');
    const monthStr = dateParts[2];
    const month = (parseMonth(monthStr) + 1).toString().padStart(2, '0');
    const year = parseInt(dateParts[4]);
    return new Date(`${year}-${month}-${day}T00:00:00Z`).toISOString();
}

const parseMonth = (monthStr: string): number => {
    return months.findIndex(month => month === monthStr.toLowerCase());
}

export const mapProductToDetailsCardElement = (product: Product): DetailsCardElement => {
    return {
        id: product.id,
        field1: product.title,
        field2: (product.createdDate) ? formattingDate(product.createdDate) : "",
        field3: product.qualification,
        field4: product.gender?.name,
        field5: product.kind?.name,
        extraField1: product.gender?.id,
        image1: product.image as string,
        list1: product.characters,
        check1: undefined,
    };
}

export const mapDetailsCardElementToProduct = (detailsCardElement: DetailsCardElement): Product => {
    return {
        id: detailsCardElement.id,
        title: detailsCardElement.field1,
        createdDate: (detailsCardElement.field2) ? parseDateString(detailsCardElement.field2) : "",
        qualification: detailsCardElement.field3,
        gender: { id: detailsCardElement.extraField1, name: detailsCardElement.field4 },
        kind: { id: "", name: "" },
        image: detailsCardElement.image1,
        characters: detailsCardElement.list1
    };
}
