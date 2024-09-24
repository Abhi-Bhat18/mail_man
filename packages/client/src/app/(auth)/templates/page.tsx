'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import { DataTable } from '@/components/ui/data-table'
import { templateColumns, templateData } from './templates-data'
import { getBreadCumbList } from '@/utils/paths'
import CustomBreadcrum from '@/components/CustomBreadCrum'
import { Button } from '@/components/ui/button'

const Templates = () => {
    const pathName = usePathname();

    const breadCumbList = getBreadCumbList(pathName);

    return (
        <section className='p-5 space-y-5'>

            <div>
                <CustomBreadcrum items={breadCumbList} />
            </div>
           <div className='flex justify-between items-center'>
           <p>Templates</p>
           <Button>
            New Template
           </Button>
           </div>
            <DataTable columns={templateColumns} data={templateData} />
        </section>
    )
}

export default Templates