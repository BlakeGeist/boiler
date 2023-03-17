const StepTest = ({ step }) => {
    switch(step) {
        case 1:
            return 'Generate article ideas'         
        case 2:
            return 'Add image desc fields'
        case 3:
            return 'Creating post'
        case 4:
            return 'Creating post secondary data'
        case 5:
            return 'Create categories'
        case 6:
            return 'Creating faqs'
        case 7:
            return 'Creating listicle' 
        case 8:
            return 'Creating header image' 
        case 9:
            return 'Creating medium image'
            
        default:
            return 'Create Article'                 
    }
}

export default StepTest