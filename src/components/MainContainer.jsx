import ColumnContainer from "./ColumnContainer.jsx";

function MainContainer() {
//början till att hämta in användare dynamiskt från databasen, hanns inte med pga tidsbrist
/* 
    const [users, setUsers] = useState([]);

    function fetchUsers(){
        onValue(usersRef, snapshot =>{
            const data = snapshot.val();
            const userArray = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }))
            setUsers(userArray)
        })    
    }
    
    useEffect( ()=>{ 
        fetchUsers()
    }, []) */

    return ( 
        <ColumnContainer /* users={users} *//>
    )

}

export default MainContainer;