import * as yup from 'yup'

export const checkoutValidationSchema = yup.object().shape({
  fullName: yup.string().required('A recipient full name is required.'),
  email: yup
    .string()
    .email('A valid email is required')
    .required('A valid email is required'),
  address: yup.string().required('A shipping address is required.'),
  country: yup
    .object()
    .shape({
      name: yup.string().required('Country name needed'),
      iso2: yup.string().required('Country iso2 needed')
    })
    .typeError('A shipping country is required.')
    .required('A shipping country is required.'),
  city: yup.string().required('A shipping city is required.')
  // phone: yup.string().required('Enter a city')
})
