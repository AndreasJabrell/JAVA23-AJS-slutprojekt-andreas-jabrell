import {update, push} from 'firebase/database';
import { useState } from 'react';

function Header({assignmentsRef}) {

    //skapar variabler åt select och inputvärden
    const [selectValue, setSelectValue] = useState('');
    const [tempText, setTempText] = useState('');

    const handleSelectChange = (event) => {
        setSelectValue (event.target.value);
    };

    function handleChange(event){
        setTempText(event.target.value);
    };

    //Skapar en ny assignment med unikt firebaseID
    function handleSubmit(event){
        event.preventDefault();
        event.target.reset();
        
        if(!selectValue){
            alert('Please choose a task')
            return;}

        if (!tempText.trim()) {
            setError('Please enter a valid task');
            return;
        }

        try {
        console.log(tempText, selectValue);
        let newAssignment = {};

        let newID = push(assignmentsRef).key;
        console.log(newID);
       
        newAssignment[newID] = {
           assigned: ' ',
           assignment: tempText,
           category: selectValue,
           status: 'toDo'
        };

        update(assignmentsRef, newAssignment);
        }catch(error){
            console.error('Error updating assignments:', error);
            alert('Error updating assignments, try again')
        }

        setSelectValue('');
        setTempText('');
    }

    return ( 
        <div id="mainHeader">
            <h1 id="rubrik">Astro-Lloyd Scrum Board</h1>
            <div id="formElement">
                <form onSubmit={handleSubmit}>
                    <input onChange={handleChange} type="text" placeholder="Write task here..." required />
                    <select onChange={handleSelectChange}>
                        <option value="">Choose what to do</option>
                        <option value="writing">Writing</option>
                        <option value="recording">Recording</option>
                        <option value="adminWork">Admin work</option>
                    </select>
                    <button >submit</button>
                </form>
              </div>  
        </div>
     );
}

export default Header;