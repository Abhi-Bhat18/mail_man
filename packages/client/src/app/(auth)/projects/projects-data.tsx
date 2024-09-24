import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from '@/components/ui/checkbox';

type Project = {
    id: string,
    name: string,
    status: 'active' | 'de-activated',
    created_at: Date,
    owner: string,
    email: string,
    role: 'owner' | 'manager' | 'admin' | 'analyst'
}

export const projectData: Project[] = [
    {
        id: '1',
        name: 'Mail man',
        status: 'active',
        created_at: new Date('2023-01-15'),
        owner: 'John Doe',
        email: 'john.doe@example.com',
        role: 'owner',
    },
    {
        id: '2',
        name: 'Mail man',
        status: 'active',
        created_at: new Date('2023-01-15'),
        owner: 'John Doe',
        email: 'john.doe@example.com',
        role: 'owner',
    },
    {
        id: '3',
        name: 'Mail man',
        status: 'active',
        created_at: new Date('2023-01-15'),
        owner: 'John Doe',
        email: 'john.doe@example.com',
        role: 'owner',
    },


];


export const columns: ColumnDef<Project>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'id',
        header: 'id'
    },
    {
        accessorKey: 'name',
        header: "Name"
    },
    {
        accessorKey: 'owner',
        header: "Owner"
    },
    {
        accessorKey: 'role',
        header: "Role"
    },
    {
        accessorKey: 'email',
        header: "Email"
    },
    {
        accessorKey: "created_at",
        header: 'Created At'
    }
]