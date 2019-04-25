export function toDate(obj: any, fieldName: string): any {
  if (obj != null && typeof obj[fieldName] === "number") {
    obj[fieldName] = new Date(obj[fieldName]);
  }
  return obj;
}

export function toTime(obj: any, fieldName: string): any {
  if (obj != null && obj[fieldName] != null && obj[fieldName].getTime) {
    obj[fieldName] = obj[fieldName].getTime();
  }
  return obj;
}
