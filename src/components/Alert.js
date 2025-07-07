import React ,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';

const Alert=(props)=>{
    console.log("Alert is Being activated")
    const {alert,Showalert}=useContext(noteContext);
    return(
        <>{alert && <div className="alert alert-primary" role="alert" >{alert}
</div>}
        </>
    )
}

export default Alert