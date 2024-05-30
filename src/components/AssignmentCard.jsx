import { db } from "../utils/firebaseConfig";
import { remove, update, ref} from "firebase/database"; 
import { useState } from "react";

function AssignmentCard(assignments) {

    //deconstructar assignments och sätter variabler
    const{id, assigned, assignment, status, category} = assignments;
    const [selectValue, setSelectValue]= useState('');
    
    //hanterar submit på toDo korten
    async function handleSubmit(event, assignmentId){
        event.preventDefault();
        if(!selectValue){
            alert('Please choose an unlucky person who has to work')
            return;}
        const assignmentToUpdateRef = ref(db, `/assignments/${assignmentId}`);
        try{
        update(assignmentToUpdateRef, {assigned: selectValue, status: 'inProgress'});
        console.log(selectValue + ' has been added to assignment' + assignmentId)
        }catch(error){
            console.error('Error updating assignments:', error);
            alert('Error updating assignments, try again')
        }
    }
    
    //hanterar vid klick från inProgress till done
    async function handleAssignmentDone(event, assignmentId) {
        event.preventDefault();
        const assignmentToUpdateRef = ref(db, `/assignments/${assignmentId}`);
        try{
        update(assignmentToUpdateRef, {status: 'done'});
        console.log(`Assignment with id ${assignmentId} successfully moved to Done`)
        }catch(error){
            console.error('Error updating assignments:', error);
            alert('Error updating assignments, try again')
        }
    }

    //sparar värdet från select
    const handleSelectChange = (event) => {
        setSelectValue(event.target.value);   
    };

    //hanterar knappen på done-korten, tar bort från databasen
    async function handleDeleteAssignment(event, assignmentId) {
        event.preventDefault();
        console.log(assignmentId)
        try{
        const assignmentToDeleteRef = ref(db, `/assignments/${assignmentId}`);
        console.log("Assignment to delete reference:", assignmentToDeleteRef);
        await remove(assignmentToDeleteRef);
        console.log("Assignment successfully deleted");
        }catch(error){
            console.error('Error removing assignments:', error);
            alert('Error removing assignments, try again')
        }

    }
    
    return ( <div class="cardDiv">
        <h3>{assignments.assignment}</h3>
        <p>{assignments.assigned}</p>
        {assignments.status === 'toDo' &&
            <form onSubmit={(event) => handleSubmit(event, assignments.id)}>
                <select onChange={handleSelectChange}>
                    <option value="">Who'll get the honor?</option>
                    <option value='Clara'>Clara</option>
                    <option value='Andreas'>Andreas</option>
                </select>
                <button className="btn">ASSIGN</button>
            </form>}
        {assignments.status === 'inProgress' &&( <button className="btn" onClick={(event) => 
            handleAssignmentDone(event, assignments.id)}>DONE</button>)}
        {assignments.status === 'done' && (<button className="btn" onClick={(event) => 
            handleDeleteAssignment(event, assignments.id)}>REMOVE</button>)}
    </div> );
}

export default AssignmentCard;