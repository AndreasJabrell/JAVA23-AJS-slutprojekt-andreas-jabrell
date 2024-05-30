import ColumnContainer from "./ColumnContainer.jsx";
import { useState, useEffect } from "react";

function MainContainer() {
    //skapar boolean loggedIn där man kan kontrollera vem som är inloggad och vad man rättigheter till att göra(admin/user) 
    //I detta fall så är man utloggad=user, inloggad = admin
    const[loggedIn, setLoggedIn] = useState(false)

    //när man klickar så ändras loggedIn beroende på värdet den har just nu
    function adminTrueFalse(event){
        event.preventDefault();
        setLoggedIn(prevLoggedIn => !prevLoggedIn);
    }

    //skriver ut det aktuella värdet av loggedIn
    useEffect(() => {
        console.log(loggedIn);
    }, [loggedIn]);


    return ( <div>
        <ColumnContainer loggedIn={loggedIn}/>
        <button id='adminKnapp' onClick={(event)=>adminTrueFalse(event)}>BYT FRÅN USER TILL ADMIN</button>
        <p>admin är för tillfället {loggedIn ? "true" : "false"}</p>
        </div>
    )

}

export default MainContainer;