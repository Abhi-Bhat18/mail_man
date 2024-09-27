'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import { getBreadCumbList } from '@/utils/paths';
import CustomBreadcrum from '@/components/CustomBreadCrum';
const Campaigns = () => {
    const pathName = usePathname();

    const breadCumbList = getBreadCumbList(pathName);

    return (
        <section className='p-5'>
            <div>
                <CustomBreadcrum items={breadCumbList} />
            </div>

        </section>
    )
}

export default Campaigns