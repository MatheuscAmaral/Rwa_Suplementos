import moment from "moment";

export const formatData = (data: string) => {
  const createdAtMoment = moment(data);

 return createdAtMoment.format('DD/MM/YYYY');
}
