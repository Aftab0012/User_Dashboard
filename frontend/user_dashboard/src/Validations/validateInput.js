const validateInput = (data, enqueueSnackbar) => {
  const stringPattern = /^[A-Za-z]+$/; // Regular expression for strings only

  if (data.firstname === '') {
    enqueueSnackbar('First name is a required field', { variant: 'warning' });
    return false;
  }
  if (!stringPattern.test(data.firstname)) {
    enqueueSnackbar('First name should contain only letters', {
      variant: 'warning',
    });
    return false;
  }

  if (data.lastname === '') {
    enqueueSnackbar('Last name is a required field', { variant: 'warning' });
    return false;
  }
  if (!stringPattern.test(data.lastname)) {
    enqueueSnackbar('Last name should contain only letters', {
      variant: 'warning',
    });
    return false;
  }

  if (data.email === '') {
    enqueueSnackbar('Email is a required field', { variant: 'warning' });
    return false;
  }

  if (data.department === '') {
    enqueueSnackbar('Department is a required field', { variant: 'warning' });
    return false;
  }
  if (!stringPattern.test(data.department)) {
    enqueueSnackbar('Department should contain only letters', {
      variant: 'warning',
    });
    return false;
  }
  return true;
};

export default validateInput;
