import { db } from "../utils/firebaseConfig";
import { remove, update, ref} from "firebase/database"; 
import { useState, useEffect } from "react";

function AssignmentCard(assignments) {

    let tempText = '';
    const [updatedAssignment, setUpdatedAssignment]= useState(assignments.assignment);

    //deconstructar assignments och sätter variabler
    const{id, assigned, assignment, status, category} = assignments;
    let selectValue = '';
    
    //hanterar submit på toDo korten
    async function handleSubmit(event, assignmentId){
        event.preventDefault();
        if(!selectValue){
            alert('Please choose an unlucky person who has to work')
            return;}
        const assignmentToUpdateRef = ref(db, `/assignments/${assignmentId}`);
        try{
            await update(assignmentToUpdateRef, {assigned: selectValue, status: 'inProgress'});
            console.log(selectValue + ' has been added to assignment' + assignmentId)
        }catch(error){
            console.error('Error updating assignments:', error);
            alert('Error updating assignments, try again')
        }
    }
    
    //hanterar vid klick från inProgress till done
    async function handleAssignmentInProgress(event, assignmentId) {
        event.preventDefault();
        const assignmentToUpdateRef = ref(db, `/assignments/${assignmentId}`);
        try{
            await update(assignmentToUpdateRef, {status: 'done'});
            console.log(`Assignment with id ${assignmentId} successfully moved to Done`)
        }catch(error){
            console.error('Error updating assignments:', error);
            alert('Error updating assignments, try again')
        }
    }
    //hantering vid klick från done till under review
    async function handleAssignmentDone(event, assignmentId) {
        event.preventDefault();
        const assignmentToUpdateRef = ref(db, `/assignments/${assignmentId}`);
        try{
            await update(assignmentToUpdateRef, {status: 'underReview'});
            console.log(`Assignment with id ${assignmentId} successfully moved to Under Review`)
        }catch(error){
            console.error('Error updating assignments:', error);
            alert('Error updating assignments, try again')
        }
    }
    //hantering av reject
    async function handleAssignmentReject(event, assignmentId, oldAssignment) {
        event.preventDefault();
        const assignmentToUpdateRef = ref(db, `/assignments/${assignmentId}`);
        try {
            const tempTextWithClass = `<span class="highlight-text">${tempText}</span>`;
            await update(assignmentToUpdateRef, { status: 'inProgress', assignment: oldAssignment + ' ' + tempTextWithClass });
            console.log(`Assignment with id ${assignmentId} successfully moved back to inProgress`);
        } catch (error) {
            console.error('Error updating assignments:', error);
            alert('Error updating assignments, try again');
        }
    }
    //sparar värdet från select
    const handleSelectChange = (event) => {
        selectValue = event.target.value;   
    };

    //hanterar knappen på under review-korten, tar bort från databasen efter det blivit godkänt
    async function handleAssignmentComplete(event, assignmentId) {
        event.preventDefault();
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

    const handleInputChange = (event)=>{
        tempText = event.target.value;
    }

    return ( 
        <div 
            className='cardDiv'
            >
        <h4 dangerouslySetInnerHTML={{ __html: updatedAssignment }}></h4>
        <p>{assignments.category} - {assignments.assigned}</p>
        <p></p>
        {assignments.status === 'toDo' &&
            <form onSubmit={(event) => handleSubmit(event, assignments.id)}>
                <select onChange={handleSelectChange}>
                    <option value="">Who'll get the honor?</option>
                    <option value='Clara'>Clara</option>
                    <option value='Andreas'>Andreas</option>
                    <option value='hela klassen'>Hela klassen</option>
                    <option value='Joel'>Joel</option>
                </select>
                <button className="btn">ASSIGN</button>
            </form>}
        {assignments.status === 'inProgress' &&
        (<button className="btn" onClick={(event) => handleAssignmentInProgress(event, assignments.id)}>DONE</button>
            )}
        {assignments.status === 'done' && 
        (<button className="btn" onClick={(event) => handleAssignmentDone(event, assignments.id)}>REMOVE</button>
            )}
        {assignments.status === 'underReview' &&
        (<div>
            <form action=""><input type="text" placeholder='What is missing?' onChange={handleInputChange}/>
                <button className="btn" onClick={(event) => handleAssignmentReject(event, assignments.id, assignments.assignment)}>REJECT</button>
            </form><button className="btn" onClick={(event) => handleAssignmentComplete(event, assignments.id)}>APPROVE</button>
            
        </div>
        )}
    </div> 
    );
}

export default AssignmentCard;