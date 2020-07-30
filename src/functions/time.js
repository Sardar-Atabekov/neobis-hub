import moment from "moment";
import "moment/locale/ru";

function TimeFormat(date) {
  return moment(date).format("DD.MM.YYYY, HH:mm");
}

export { TimeFormat };
