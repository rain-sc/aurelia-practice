import moment from "moment";

export class DateFormatValueConverter {
    toView(value) {
        return moment(value).format("DD-MM-YYYY HH:mm:ss")
    }
}
