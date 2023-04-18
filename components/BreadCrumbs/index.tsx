import React, { FC } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const BradCrumbsContainer = styled.div`
    margin-top: 15px;
`

interface BreadcrumbProps {
    breadcrumb: {
        href: string,
        text: string  
    }
}

const Breadcrumb:FC<BreadcrumbProps> = ({ breadcrumb }) => {

    if(!breadcrumb.href) return <>{breadcrumb.text}</>

    return (
        <Link href={breadcrumb.href}>
            {breadcrumb.text}
        </Link>
    )
}

export const Breadcrumbs = ({ pathArray }) => {
    return (
        <BradCrumbsContainer>
            {pathArray.map((breadcrumb, i) => {

                const ArrowAfter = () => {
                    if(pathArray.length === i+1) return null
                    return <>{` `} - {` `}</>
                }

                return (
                    <span key={`${i}-${breadcrumb.text}`}>
                        <Breadcrumb breadcrumb={breadcrumb} key={breadcrumb.text} /> 
                        <ArrowAfter />
                    </span>
                )
            })}
        </BradCrumbsContainer>
    )
}

export default Breadcrumbs