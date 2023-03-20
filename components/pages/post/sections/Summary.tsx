import React from 'react'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

const Summary = ({ summaryRef, summary }) => {
    if(!summary) return null
    
    return (
        <>
            <Alert ref={summaryRef} id="summary" style={{marginBottom: '15px'}} severity="info">
                <AlertTitle style={{fontWeight: 'bold'}}>Summary</AlertTitle>
                {summary}
            </Alert>                    
        </>

    )
}

export default Summary