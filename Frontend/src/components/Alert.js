import React ,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';

const Alert=(props)=>{
    const {alert,Showalert}=useContext(noteContext);
    return(
        <>{alert && <div className="alert alert-primary" role="alert" >{alert}
</div>}
        </>
    )
}

export default Alert