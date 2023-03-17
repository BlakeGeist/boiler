import React from 'react'

const SectionsBuilder = ({ sections, setSections, defaultSections }) => {

    const addSection = (section) => {
        setSections([...sections, section])
    }

    const removeSection = (section) => {
        const newSections = sections.filter((sec) => sec !== section)
        setSections(newSections)
    }

    const handleToggle = (section) => {
        const itemAlreadyPresentInSections = sections.includes(section)
        if (itemAlreadyPresentInSections) return removeSection(section)

        return addSection(section)
    }

    return (
        <div>
            <div>
                <label htmlFor="keyword">Keyword</label>
                <input type="text" id="keyword" name="keyword" />
                <label htmlFor="link">Link</label>
                <input type="text" id="link" name="link" />
                <label htmlFor="times">Times</label>
                <input type="number" id="times" name="times" /> 
                <button>Add Keyword</button>
            </div>
            {defaultSections.map(section => {
                return (
                    <button key={section.name} onClick={() => handleToggle(section)}>{section.name}</button>
                )
            })}
        </div>
    )
}

export default SectionsBuilder