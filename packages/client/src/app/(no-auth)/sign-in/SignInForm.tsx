'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { useLoginMutation } from '@/lib/features/auth/authApis';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { setUserLogin } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';

const signInSchema = z.object({
    email: z.string().min(2).max(50).email(),
    password: z.string().min(8)
})


const SignInForm = () => {
    const { isLoggedIn } = useAppSelector((state) => state.auth);
    const router = useRouter();
    const [login, { isLoading, isError, isSuccess }] = useLoginMutation();
    const dispatch = useAppDispatch();

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (values: z.infer<typeof signInSchema>) => {
        console.log("Values", values);
        try {
            await login(values).unwrap();
            console.log("Login is successfull", isSuccess);
            if (isSuccess) {
                console.log("Login in successfull");
                dispatch(setUserLogin({ ...values }));
            }
            router.push('/home');
        } catch (error) {
            console.error("Failed to login", error);
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="john.snow@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="*****" {...field} />
                            </FormControl>
                            {/* <FormDescription>
                                This is your public display name.
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button disabled={isLoading} className='w-full' type="submit">Submit</Button>

            </form>
        </Form>
    )
}

export default SignInForm