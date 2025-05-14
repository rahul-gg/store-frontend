import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signup } from '../../../utilities/auth';
// import { useNavigate } from 'react-router';

export const SignUpForm = () => {



    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Email cannot be empty'),
                password: Yup.string().min(6, 'Password should be 6 characters atleast')
            })}
            onSubmit={async (values) => {
                console.log(values)
                await signup(values.email, values.password)
            }}
        >{(props) => (
            <Form className='w-2/5 h-3/5 h bg-black p-5 flex flex-col gap-10 rounded-md'>
                <h2 className='text-white font-semibold text-3xl'>Sign Up</h2>
                <div className='flex flex-col gap-5'>
                    <div className='flex-col flex gap-1'>
                        <Field className='w-full text-white h-8 px-2 py-5 border border-[#2B2B2B] bg-inherit rounded-md' name="email" type="text" placeholder='Email' />
                        <p className='text-sm font-light text-red-500 px-2'><ErrorMessage name='email' /></p>
                    </div>
                    <div className='flex-col gap-1'>
                        <Field className='w-full text-white h-8 px-2 py-5 border border-[#2B2B2B] bg-inherit rounded-md' name="password" type="text" placeholder='Password' />
                        <p className='text-sm font-light text-red-500 px-2'><ErrorMessage name='password' /></p>
                    </div>
                </div>
                <button type="submit" className='flex items-center justify-center text-center bg-white text-black text-lg font-medium h-8 py-5 px-2 rounded-md' onClick={props.submitForm}>Sign Up</button>
            </Form>)}
        </Formik>
    )
}