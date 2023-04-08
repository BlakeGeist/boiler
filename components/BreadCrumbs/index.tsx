import React, { FC } from 'react'
import Link from 'next/link'

interface BreadcrumbProps {
    breadcrumb: {
        href: string,
        text: string  
    }
}

const Breadcrumb:FC<BreadcrumbProps> = ({ breadcrumb }) => {
    return (
        <Link href={breadcrumb.href}>
            {breadcrumb.text}
        </Link>
    )
}



export const Breadcrumbs = ({ pathArray }) => {
    return pathArray.map((breadcrumb) => <Breadcrumb breadcrumb={breadcrumb} key={breadcrumb.text} />)
}

export default Breadcrumbs