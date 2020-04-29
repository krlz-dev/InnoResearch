exports.isDefined = (obj) => {
  return (obj || null) !== null;
};

exports.areDefined = (...objs) => {
  return objs.filter(obj => !isDefined(obj)).length === 0;
};

exports.isEmpty = (obj) => {
  return !isDefined(obj);
}

exports.hasItems = (array) => {
  return isDefined(array) && array.length > 0;
};

exports.dateNow = () => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!

  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  today = dd + '/' + mm + '/' + yyyy;
  return today
};

exports.getParameterFromUrl = (parameter) => {
  const url = new URL(document.location.href);
  let patientIdParameter = url.searchParams.get(parameter);
  if (isDefined(patientIdParameter)) {
    sessionStorage.setItem(`url-${parameter}`, patientIdParameter);
  }
  return sessionStorage.getItem(`url-${parameter}`)
};

exports.uuidGenerate = () => {
  let uuid = "", i, random;
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;

    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += "-";
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
};