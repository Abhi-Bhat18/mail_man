import { Button } from '../ui/button'
import React from 'react'

const Hero = () => {
    return (
        <div className='flex h-[60vh] items-center'>
            <div className='basis-1/2 space-y-5'>
                <p className='text-7xl'>Power Your Email Marketing</p>
                <p>Discover the ultimate open source solution for seamless email sending and powerful marketing campaigns.</p>
                <div className='flex space-x-5'>
                    <Button>
                        Get Started
                    </Button>
                    <Button>
                        Learn More
                    </Button>
                </div>
            </div>
            <div className='basis-1/2'>
                Second half
            </div>
        </div>
    )
}

export default Hero