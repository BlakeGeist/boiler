import React from 'react'

const Stepper = ({ step, setStep }) => {

    const stepUp = () => {
        setStep(step+1)
    }

    const stepDown = () => {
        if(step === 1) return
        setStep(step-1)
    }

    const handlePrev = (e) => {
        e.preventDefault()
        stepDown()
    }

    const handleNext = (e) => {
        e.preventDefault()
        stepUp()
    }    

    return (
        <div>
            {step > 1 &&
                <button onClick={(e) => handlePrev(e)}>Prev</button>
            }
            {step < 12 &&
                <button onClick={(e) => handleNext(e)}>Next</button>
            }                        
        </div>
    )
}

export default Stepper