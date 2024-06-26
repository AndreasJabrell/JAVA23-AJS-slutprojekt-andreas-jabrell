import { onValue } from "firebase/database";
import { useState, useEffect } from "react";
import { assignmentsRef } from "../utils/firebaseConfig.js";

import AssignmentCard from "./AssignmentCard.jsx";

function ColumnContainer({loggedIn}) {

    //hämtar och sätter assignments
    const [assignments, setAssignments] = useState([]);
    
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
    
    useEffect( ()=>{ 
        fetch()
    }, [])

    //separerar och delar upp assignments beroende på status
    const toDoAssignments = assignments.filter(assignment => assignment.status === 'toDo');
    const inProgressAssignments = assignments.filter(assignment => assignment.status === 'inProgress');
    const doneAssignments = assignments.filter(assignment => assignment.status === 'done')
    const underReviewAssignments = assignments.filter(assignment => assignment.status === 'underReview')


    //skapar containers beroende på status, mappar ut assignments
    return (
        <div id="mainContainer">
            <div value='toDo'id="toDoCont" title="To do">
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
            <div value='inProgress' id="inProgressCont" title="In progress">
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
            <div value='done' id="doneCont" title="Done">
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
            {loggedIn && <div value='underReview' id="underReviewCont" title="Under Review">
                <h1>UNDER REVIEW</h1>
                {underReviewAssignments.map(assignment => (
                    <AssignmentCard
                        key={assignment.id}
                        id={assignment.id}
                        assignment={assignment.assignment}
                        assigned={assignment.assigned}
                        category={assignment.category}
                        status={assignment.status}
                    />
                ))}
            </div>}
        </div>
    );
}

export default ColumnContainer;