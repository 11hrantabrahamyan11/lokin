const getTimeFromString = (timestring) => {
  const hour = Number(timestring.slice(0, 2));
  const minute = Number(timestring.slice(2, 4));

  return {
    hour,
    minute,
  };
};

export default getTimeFromString;
