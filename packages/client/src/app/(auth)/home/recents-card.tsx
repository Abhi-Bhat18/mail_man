import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


import React from 'react'

interface Props {
    projectName?: string,
    campaignName?: string,
    templateName?: string,
    description: string,
}
const RecentCard: React.FC<Props> = ({ description = "Card description" }) => {
    return (
        <Card className="w-64">
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>{description}  </CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>

    )
}

export default RecentCard