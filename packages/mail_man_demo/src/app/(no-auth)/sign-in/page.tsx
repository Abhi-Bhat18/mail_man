'use client'
import React from 'react'
import SignInForm from './SignInForm'
import Link from 'next/link'
import { useAppSelector } from '@/lib/hook'
import { useRouter } from 'next/navigation'

const Signin = () => {

  const { isLoggedIn} = useAppSelector(state => state.auth);
  console.log("Is logged in", isLoggedIn)
  const router = useRouter();

  if(isLoggedIn) { 
    console.log("User already logged in");
    router.push('/home')
    return null
  }

   return (
     <main className="flex h-screen">
       <div className="basis-1/2 flex justify-center items-center">
         <Link href={"/"}>Mail man</Link>
       </div>
       <div className="basis-1/2 flex justify-center items-center">
         <div className="shadow-md border-secondary border p-10 rounded-md space-y-5">
           <div className="space-y-2">
             <p className="text-2xl text-center">Welcome back to Mailman</p>
             <p className="text-center">Login to your account</p>
           </div>
           <SignInForm />
           <div className="flex justify-between">
             <Link href={"/"}>Forgot password?</Link>{" "}
             <Link href={"/sign-up"}>Don&rsquot have an account</Link>
           </div>
         </div>
       </div>
     </main>
   );
}

export default Signin