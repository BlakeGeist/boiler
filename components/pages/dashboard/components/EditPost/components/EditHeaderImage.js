import React from 'react'

const EditHeaderImage = () => {
    
    const handleSubmit = (e) => {
        const headerImagePrompt = e.target.headerImage.value
        e.preventDefault()
        
        console.log(headerImagePrompt)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="headerImage">Describe the header image: </label> <br />
                <input type="text" id="headerImage" name="headerImage" />
            </div>
            <input type='submit' />
        </form>
    )
}

export default EditHeaderImage