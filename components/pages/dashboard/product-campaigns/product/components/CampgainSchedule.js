import React from 'react'
import DateTimePicker from 'react-datetime-picker'
import CampagainLength from './CampagionLength'
import styled from 'styled-components'

const DatePickersContainer = styled.div`
    margin-top: 25px;
    display: flex;

    div {
        &:first-of-type {
            padding-right: 15px;
        }
    }
`

const CampaignSchedule = ({ setStartDate, setEndDate, startDate, endDate, host, product, campaignLength, setCampaignLength }) => {
    return (
        <div>
            <h2>Campaign Schedule</h2>

            <CampagainLength setEndDate={setEndDate} startDate={startDate} endDate={endDate} host={host} product={product} campaignLength={campaignLength} setCampaignLength={setCampaignLength} />

            <DatePickersContainer>
                <div>
                    <strong>Start Date: </strong>
                    <DateTimePicker onChange={setStartDate} value={startDate} />
                </div>
                <div>
                    <strong>End Date: </strong>
                    <DateTimePicker onChange={setEndDate} value={endDate} />
                </div>
            </DatePickersContainer>
        </div>    
    )
}

export default CampaignSchedule