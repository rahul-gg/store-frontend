import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signIn } from '../../../utilities/auth';
import { Button } from '../../../utilities/ui/Button';
import React from 'react';
import { useNavigate } from 'react-router';
import type { AuthResponse } from '@supabase/supabase-js';

export const SignInForm = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<String | null>(null)

    const handleSignIn = async (email: string, password: string) => {
        try {
            setLoading(true)
            setError(null)
            const signInResponse: AuthResponse = await signIn(email, password)
            if (signInResponse.error === null) {
                navigate('/')
                setLoading(false)
            } else {
                setError(signInResponse.error.message)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <Formik
            initialValues={{ email: '', password: ''}}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Email cannot be empty'),
                password: Yup.string().min(6, 'Password should be 6 characters atleast').required('Enter your password'),
            })}
            onSubmit={async (values) => {
                console.log(values)
                await handleSignIn(values.email, values.password)
            }}
        >
            <Form className='w-2/5 h-3/5 h bg-black p-5 flex flex-col gap-10 rounded-md'>
                <h2 className='text-white font-semibold text-3xl'>Sign In</h2>
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
                </div>
                <div className='flex flex-col gap-5'>
                    {error && <p className='text-red-500 text-lg text-center italic'>{error}</p>}
                    <Button label='Sign In' isLoading={loading} disabled={loading} />
                     <p className='text-white text-sm text-center'>Do not have an account? Go to <a href="/signup" className='text-blue-300'>sign up</a></p>
                </div>
            </Form>
        </Formik>
    )
}