import './SeasonsDisplay.css'
import React from 'react'

const seasonConfig = {
  summer: {
    text: 'Lets hit the beach',
    iconName: 'sun',
  },
  winter: {
    text: 'Burr it is cold',
    iconName: 'snowflake',
  },
}

function getSeason(lat, month) {
  if (month > 3 && month < 10) {
    return lat > 0 ? 'summer' : 'winter'
  }
  return lat > 0 ? 'winter' : 'summer'
}

const SeasonsDisplay = (props) => {
  const season = getSeason(props.lat, new Date().getMonth + 1)
  const { text, iconName } = seasonConfig[season]

  return (
    <div className={`seasons-display ${season}`}>
      <i className={`icon-top massive ${iconName} icon`}></i>
      <h1>{text}</h1>
      <i className={`icon-bottom massive ${iconName} icon`}></i>
    </div>
  )
}

export default SeasonsDisplay
