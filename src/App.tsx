import "./App.css";
import { useAddContactMutation, useDeleteContactMutation, useGetContactQuery, useGetContactsQuery, useUpdateContactMutation } from "./services/contactsApi";
import { GrUpdate } from "react-icons/gr";
import { RiDeleteBin2Line } from "react-icons/ri";

const columns = [{  
  Header: 'Name',  
  accessor: 'name'  
 },{  
 Header: 'Email',  
 accessor: 'email'  
 }] 
 
function App() {
  const { data, error, isLoading, isFetching, isSuccess } =
    useGetContactsQuery();
    const [updateContact] = useUpdateContactMutation();
    const [deleteContact] = useDeleteContactMutation();

    const updateContactHandle = async () => {
      await updateContact(contactUpdated);
    }
    const deleteContactHandler = async (value: string) => {
      await deleteContact(value);
    }
  return (
    <>
      <div>
        <h1>React Redux RTK Query</h1>
        {isLoading && <h2>Loading.....</h2>}
        {isFetching && <h2>....Fetching</h2>}
        {error && <h2>Something went wrong</h2>}
        {isSuccess && (
          <div>
            {data?.map((contact) => {
              return (
                <div className="name-container" key={contact.id}>
                  <div>{contact.id}</div>
                  <div>{contact.name}</div>
                  <div>{contact.email}</div>
                  {/* <span><ContactDetail id={contact.id}/></span> */}
                  <div>
                  <button style={{backgroundColor: '#fff', marginRight: '10px'}} ><GrUpdate/></button>
                  <button style={{backgroundColor: 'red'}} onClick={() => deleteContactHandler(contact.id)} ><RiDeleteBin2Line/></button>
                  </div>
                </div>
              );
            })}
            <AddContact/>
          </div>
        )}
      </div>
    </>
  );
}

export const ContactDetail = ({id}: {id: string}) => {
  const {data} = useGetContactQuery(id);
  return(
    <pre>{JSON.stringify(data, undefined, 2)}</pre>
  )
}

export const AddContact = () => {
  const [addContact] = useAddContactMutation();
  const [updateContact] = useUpdateContactMutation();
  const [deleteContact] = useDeleteContactMutation();
  const contact = {
    "id": "4",
    "name": "Praneeth",
    "email": "praneeth@gmail.com"
  }
  const contactUpdated = {
    "id": "3",
    "name": "Praneeth updated",
    "email": "praneeth@gmail.com"
  }

  const addHandler = async () => {
    await addContact(contact);
  }
  const updateHandler = async () => {
    await updateContact(contactUpdated);
  }
  const deleteHandler = async () => {
    await deleteContact(contact.id);
  }
  return (
    <>
    <button onClick={addHandler}>Add Contact</button>
    <button style={{backgroundColor: '#fff'}} onClick={updateHandler}><GrUpdate/></button>
    <button style={{backgroundColor: 'red'}} onClick={deleteHandler}><RiDeleteBin2Line/></button>
    </>
  )
}
export default App;
