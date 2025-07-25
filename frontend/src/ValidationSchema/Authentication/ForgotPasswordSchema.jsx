import * as Yup from 'yup'

const ForgotPasswordSchma = Yup.object({
    email : Yup.string().email("Invalid Email").required("Email is required")
})

export default ForgotPasswordSchma;