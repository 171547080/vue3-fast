import moment from "moment";
export function dateFormat(str:string, format='YYYY-MM-DD'): string {
  if (!str){
    return '--'
  }
  try {
    return moment(str).format(format);
  } catch (e) {
    return "--";
  }
}

export function datetimeFormat(str:string, format='YYYY-MM-DD HH:mm:ss'): string {
  if (!str){
    return '--'
  }
  try {
    
    return moment(str).format(format);
  } catch (e) {
    return "--";
  }
}
export default {
  dateFormat,
  datetimeFormat
};
