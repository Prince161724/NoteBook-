import React from 'react'

const Alert=(props)=>{
    return(
        <><div className="alert alert-primary" role="alert">A simple primary alert—check it out!
        {props.message}
</div>
        </>
    )
}

export default Alert