import React from 'react'
import SignInForm from './SignInForm'
import Link from 'next/link'

const Signin = () => {
  return (
    <main className='flex h-screen'>
      <div className='basis-1/2 flex justify-center items-center'>
        <Link href={'/'}>
        Mail man
        </Link>
      </div>
      <div className='basis-1/2 flex justify-center items-center'>
        <div className='border p-10 rounded-md space-y-5'>
          <div className='space-y-2'>
            <p className='text-2xl text-center'>Welcome back to Mailman</p>
            <p className='text-center'>Login to your account</p>
          </div>
          <SignInForm />
          <div className='flex justify-between'>
            <Link href={'/'}>Forgot password?</Link> <Link href={'/sign-up'}>Don't have an account</Link>
          </div>
        </div>
      </div>

    </main>
  )
}

export default Signin