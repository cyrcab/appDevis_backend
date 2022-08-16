// fonction pour formater la date en fonction de la position de l'utlisateur

function formatDate(date) {
  if (date.constructor !== Date) {
    console.error({ ErrorType: 'le paramètre est attendu au format Date' });
    return 1;
  }

  const dateDay = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const dateMonth = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const dateYear = date.getFullYear();
  const newDateHourLocale = date.toLocaleTimeString('fr-FR');

  const newDate = `${dateYear}-${dateMonth}-${dateDay}T${newDateHourLocale}.000Z`;

  return newDate;
}

export default formatDate;
