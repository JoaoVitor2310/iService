import React from 'react'

const LoadingInput = ({loading, value}) => {
    
    switch (loading) {
        case true:
            return (
                <>
                    <input type="submit" value='Aguarde...' disabled />
                </>
            )
        case false:
            return (
                <>
                    <input type="submit" value={value} />
                </>
            )
        default:
            break;
    }
    
}

export default LoadingInput