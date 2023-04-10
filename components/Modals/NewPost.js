import React, { useState } from 'react'
import Modal from '@mui/material/Modal'

const NewPostModal = ( { open, handleClose }) => {
    const [step, setStep] = useState(1)

    const stepUp = () => setStep(step+1)
    const stepdown = () => {
        if(step > 1) return setStep(step-1)
    }

    const handleStepUp = (e) => {
        e.preventDefault()
        stepUp()
    }

    const handleStepDown = (e) => {
        e.preventDefault()
        stepdown()
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <button onClick={handleStepUp}>Step up</button>
                <button onClick={handleStepDown}>Step down</button>
                <div style={style}>
                    Create article
                </div>
            </Modal>
    )
}

export default NewPostModal