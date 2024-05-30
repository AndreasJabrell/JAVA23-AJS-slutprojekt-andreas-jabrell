import { onValue } from "firebase/database";
import { useState, useEffect } from "react";
import { assignmentsRef } from "../utils/firebaseConfig.js";

import AssignmentCard from "./AssignmentCard.jsx";

function ColumnContainer(users) {
    //useState för assignments
    const [assignments, setAssignments] = useState([]);
    //hämtar assignments från databasen
    function fetch(){
        onValue(assignmentsRef, snapshot =>{
        const data = snapshot.val();
        const assignmentsArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
        }))
        setAssignments(assignmentsArray)
    }) 
    }
    //uppdaterar utseendet vid ändringar i databasen
    useEffect( ()=>{ 
        fetch()
    }, [])
    //separerar och delar upp assignments beroende på status
    const toDoAssignments = assignments.filter(assignment => assignment.status === 'toDo');
    const inProgressAssignments = assignments.filter(assignment => assignment.status === 'inProgress');
    const doneAssignments = assignments.filter(assignment => assignment.status === 'done')


    //skapar containers beroende på status, mappar ut assignments
    return (
        <div id="mainContainer">
            <div id="toDoCont" title="To do">
                <h1>TO DO</h1>
                {toDoAssignments.map(assignment => (
                    <AssignmentCard 
                        key={assignment.id}
                        id={assignment.id}
                        assignment={assignment.assignment}
                        category={assignment.category}
                        status={assignment.status}
                    />
                ))} 
            </div>
            <div id="inProgressCont" title="In progress">
                <h1>IN PROGRESS</h1>
                {inProgressAssignments.map(assignment => (
                    <AssignmentCard
                        key={assignment.id}
                        id={assignment.id}
                        assignment={assignment.assignment}
                        assigned={assignment.assigned}
                        category={assignment.category}
                        status={assignment.status}
                    />
                ))}
            </div>
            <div id="doneCont" title="Done">
                <h1>DONE</h1>
                {doneAssignments.map(assignment => (
                    <AssignmentCard
                        key={assignment.id}
                        id={assignment.id}
                        assignment={assignment.assignment}
                        assigned={assignment.assigned}
                        category={assignment.category}
                        status={assignment.status}
                    />
                ))}
            </div>
        </div>
    );
}

export default ColumnContainer;