import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signup } from '../../../utilities/auth';
import { Button } from '../../../utilities/ui/Button';
import React from 'react';
import { useNavigate } from 'react-router';
import type { AuthResponse } from '@supabase/supabase-js';

export const SignUpForm = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<String | null>(null)

    const handleSignUp = async (email: string, password: string, name: string) => {
        try {
            setLoading(true)
            setError(null)
            const signupResponse: AuthResponse = await signup(email, password, name)
            if (signupResponse.error === null) {
                navigate('/')
                setLoading(false)
            } else {
                setError(signupResponse.error.message)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <Formik
            initialValues={{ email: '', password: '', name: '' }}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Email cannot be empty'),
                password: Yup.string().min(6, 'Password should be 6 characters atleast').required('Enter your password'),
                name: Yup.string().min(2, 'Invalid name')
            })}
            onSubmit={async (values) => {
                console.log(values)
                await handleSignUp(values.email, values.password, values.name)
            }}
        >
            <Form className='w-2/5 h-3/5 h bg-black p-5 flex flex-col gap-10 rounded-md'>
                <h2 className='text-white font-semibold text-3xl'>Sign Up</h2>
                <div className='flex flex-col gap-5'>
                    <div className='flex-col flex gap-1'>
                        <label htmlFor="email" className='text-white text-lg'>Email</label>
                        <Field className='w-full text-white h-8 px-2 py-5 border border-[#2B2B2B] bg-inherit rounded-md' name="email" type="text" placeholder='' />
                        <p className='text-sm font-light text-red-500'><ErrorMessage name='email' /></p>
                    </div>
                    <div className='flex-col flex gap-1'>
                        <label htmlFor="password" className='text-white text-lg'>Password</label>
                        <Field className='w-full text-white h-8 px-2 py-5 border border-[#2B2B2B] bg-inherit rounded-md' name="password" type="password" placeholder='' />
                        <p className='text-sm font-light text-red-500'><ErrorMessage name='password' /></p>
                    </div>
                    <div className='flex-col flex gap-1'>
                        <label htmlFor="name" className='text-white text-lg'>Name</label>
                        <Field className='w-full text-white h-8 px-2 py-5 border border-[#2B2B2B] bg-inherit rounded-md' name="name" type="text" placeholder='' />
                        <p className='text-sm font-light text-red-500'><ErrorMessage name='name' /></p>
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    {error && <p className='text-red-500 text-lg text-center italic'>{error}</p>}
                    <Button label='Sign Up' isLoading={loading} disabled={loading} />
                     <p className='text-white text-sm text-center'>Already have an account? Go to <a href="/signin" className='text-blue-300'>sign in</a></p>
                </div>
            </Form>
        </Formik>
    )
}