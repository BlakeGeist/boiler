const StepTest = ({ step }) => {
    switch(step) {
        case 1:
            return 'Generate article ideas'         
        case 2:
            return 'Add image desc fields'
        case 3:
            return 'Creating article'
        case 4:
            return 'Creating article secondary data'
        case 5:
            return 'Ttranslating article'
        default:
            return 'Create Article'                 
    }
}

export default StepTest