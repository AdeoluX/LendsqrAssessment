const dateFormatter = () => {
  const minutes = hours * 60;
  const seconds = minutes * 60;
  const milliseconds = seconds * 1000;

  return new Date(new Date().getTime() + milliseconds);
};
