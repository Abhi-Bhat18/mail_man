'use client'
import { usePathname } from 'next/navigation'
import CustomBreadcrum from '@/components/CustomBreadCrum'
import React from 'react'
import { DataTable } from '../../../components/ui/data-table'
import { columns, projectData } from './projects-data'
import { Button } from '@/components/ui/button'
import { getBreadCumbList } from '@/utils/paths'

const Projects = () => {
    const pathName = usePathname();

    const breadCumbList = getBreadCumbList(pathName);

    return (
        <section className='p-5 space-y-5'>
            <div className='flex justify-between items-center'>
                <CustomBreadcrum items={breadCumbList} />
                <div>
                    <Button>
                        New project
                    </Button>
                </div>
            </div>


            <DataTable columns={columns} data={projectData} />
            <div className="flex items-center justify-end space-x-2 py-4">

            </div>
        </section>
    )
}

export default Projects