import ColumnContainer from "./ColumnContainer.jsx";
import { useState, useEffect } from "react";

function MainContainer() {
    const[loggedIn, setLoggedIn] = useState(false)
    function adminTrueFalse(event){
        
        event.preventDefault();
        setLoggedIn(prevLoggedIn => !prevLoggedIn);
    }

    useEffect(() => {
        console.log(loggedIn); // Detta kommer att köras varje gång loggedIn uppdateras
    }, [loggedIn]);


    return ( <div>
        <ColumnContainer loggedIn={loggedIn}/>
        <button id='adminKnapp' onClick={(event)=>adminTrueFalse(event)}>BYT FRÅN USER TILL ADMIN</button>
        <p>admin är för tillfället {loggedIn ? "true" : "false"}</p>
        </div>
    )

}

export default MainContainer;