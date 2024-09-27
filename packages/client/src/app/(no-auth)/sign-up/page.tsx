import React from 'react'
import Link from 'next/link'
import SingupForm from './SingupForm'


const SignUp = () => {
    return (
        <main className='flex h-screen'>
            <div className='basis-1/2 flex justify-center items-center'>
                some gifs
            </div>
            <div className='basis-1/2 flex justify-center items-center'>
                <div className='border p-10 rounded-md space-y-5'>
                    <div className='space-y-2'>
                        <p className='text-2xl text-center'>Create an account</p>
                    </div>
                    <SingupForm />
                    <div className='flex justify-center'>
                        <div className='flex space-x-2'><p>Already have an account?</p>
                            <Link href={'/sign-in'}>Sign-in here</Link>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    )
}

export default SignUp