import React from 'react'
import SelectedIdea from './SelectedIdea'
import { generateEvenlySpacedDates } from 'utils/helpers'

const SelectedIdeas = ({ selectedIdeas, setSelectedIdeas, campaignLength, startDate, endDate }) => {

    const setSchedule = (e) => {
        e.preventDefault()

        const schedule = generateEvenlySpacedDates(startDate, endDate, selectedIdeas.length)

        console.log(schedule)

        const mappedSelectedIdeas = selectedIdeas.map((idea, i) => {
            return {
                ...idea,
                publishedDate: schedule[i]
            }
        })

        setSelectedIdeas(mappedSelectedIdeas)
    }

    return (
        <>
            <h2>Selected Ideas</h2>

            <div>
                <div>Ideas selected: {selectedIdeas.length}</div>
                <div>Campaign Length: {campaignLength} months</div>
                <div>There are  weeks in this campagin</div>
                
            </div>

            <ul>
                {selectedIdeas.map((item, i) => (
                    <SelectedIdea item={item} key={`${item.title}-idea`} i={i} />
                ))}
            </ul>

            <button onClick={setSchedule}>Set Schedule</button>
        </>
    )
}

export default SelectedIdeas