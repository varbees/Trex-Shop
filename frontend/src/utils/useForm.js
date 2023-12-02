import { useState } from 'react';

const useForm = initialState => {
  const [values, setValues] = useState(initialState);

  return [
    values,
    evt => {
      setValues({ ...values, [evt.target.name]: evt.target.value });
    },
  ];
};

export default useForm;
