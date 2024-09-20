import { Button } from '../ui/button'
import React from 'react'

const Hero = () => {
    return (
        <div className='flex h-[60vh] items-center'>
            <div className='basis-1/2 space-y-5'>
                <h5 className='text-7xl font-semibold'>Power Your Email Marketing</h5>
                <p>Discover the ultimate open source solution for seamless email sending and powerful marketing campaigns.</p>
                <div className='flex space-x-5'>
                    <button>
                        Get Started
                    </button>
                    <button>
                        Learn More
                    </button>
                </div>
            </div>
            <div className='basis-1/2'>
                Second half
            </div>
        </div>
    )
}

export default Hero