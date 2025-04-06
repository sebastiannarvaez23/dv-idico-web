import dayjs, { Dayjs } from "dayjs";

export const dateToDaysjs = (date: String | Date): Dayjs | null => {
    if (date === '') return null;
    return dayjs(date.toString(), 'YYYY-MM-DD');
}