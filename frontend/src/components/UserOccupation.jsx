import React from 'react'

const UserOccupation = ({user}) => {
  return (
    <div>
        {user.occupation && user.occupation.map(occup => (
            <p key={occup}>{occup}</p>
          ))}
    </div>
  )
}

export default UserOccupation