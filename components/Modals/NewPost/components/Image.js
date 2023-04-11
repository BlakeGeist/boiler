import React from 'react'

const Image = () => {

    //first lets promt for the images
    //then lets show them the images and ask for a confirm
    //give the option to regenerate the image
    //make it so a user can prompt the ai to generate the image
    //make it so the user must enter an alt tag in order continue
    //make it so the alt is auto populated via the prompt to generate

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const headerImagePrompt = e.target.headerImage.value
        const mediumImagePrompt = e.target.headerImage.value

        console.log(headerImagePrompt)
        console.log(mediumImagePrompt)

        //get the images
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="headerImage">Describe the header image: </label>
                <input type="text" name="headerImage" id="headerImage" />
            </div>
            <div>
                <label htmlFor="headerImageAlt">Header Image alt: </label>
                <input type="text" name="headerImageAlt" id="headerImageAlt" />
            </div>            
            <div>
                <label htmlFor="mediumImage">Describe the medium image: </label>
                <input type="text" name="mediumImage" id="mediumImage" />
            </div>
            <div>
                <label htmlFor="headerImageAlt">Medium Image alt: </label>
                <input type="text" name="headerImageAlt" id="headerImageAlt" />
            </div>               
            <input type="submit" />
        </form>
    )
}

export default Image