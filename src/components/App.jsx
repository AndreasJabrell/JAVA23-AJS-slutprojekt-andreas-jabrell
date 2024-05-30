import { assignmentsRef } from "../utils/firebaseConfig.js";
import Header from "./Header.jsx";
import MainContainer from "./MainContainer.jsx";
import { useState } from "react";

export function App(){


    return ( <>
        <Header assignmentsRef={assignmentsRef}/>
        <MainContainer/>
    </> )
}