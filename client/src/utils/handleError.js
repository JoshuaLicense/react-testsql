const handleError = res => {
  if (!res.ok) {
    throw res;
  }

  return res;
};

export default handleError;
