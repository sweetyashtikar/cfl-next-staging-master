import moment from 'moment';

export function generateSlug(val: string) {
  return val.toLowerCase().replace(/\s|\//g, '-');
}

export const isToday = (date: string) => {
  const today = moment(new Date()).format('DD/MM/YYYY');
  return date === today;
};
