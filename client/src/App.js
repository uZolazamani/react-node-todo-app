import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import ContentCard from "./components/ContentCard";
import Error from "./components/Error";
import Loading from "./components/Loading";
import Header from "./components/Header";
import { Button, Stack } from "react-bootstrap";
import {BsPencilSquare, BsFillTrashFill} from 'react-icons/bs';

export const ToDoContext = createContext();
export const useToDoContext = () => useContext(ToDoContext);

const App = () => {
  const [data, setData] = useState([]);
  const [todo, setTodo] = useState({title: ''});
  const [hasError, setHasError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const value = { data, setData, setTodo, todo, searchValue, setSearchValue };

  useEffect(() => {
    setIsLoading(true);
    let cancel;
    axios
      .get("/api")
      .then((response) => {
        setIsLoading(false);    
        setData(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setHasError(true)
      });
  }, []);

  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
    return () => {
    axios.delete(`/api/${id}`).then((response) => {
      //show toast
    }).catch(() => {
      //Show Toast 
    });
    setData(newData); 
    };
    
  };
  const handleEdit = (id) => {
    return () => {
      const editTodo = data.filter((item) => item.id === id);
      setTodo(editTodo[0]);
    };
  };
  const filteredResults = data.filter(({title}) => title.toLowerCase().includes(searchValue))
  return (
    <ToDoContext.Provider value={value}>
      {isLoading ? (
      <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}> <Loading /></div>
       
      ) : hasError ? <div className="d-flex justify-content-center align-items-center"><Error /></div> :(
        <>
          <Header />
          <ContentCard />
          <div>
            {searchValue.length > 0 && filteredResults.length === 0 ?
            <strong className="d-flex justify-content-center align-items-center">NO RESULTS</strong>
            :
            filteredResults.map(({ id, title }) => (
              <React.Fragment key={id}>
                <div className="d-flex justify-content-between w-50 m-auto card p-3 mb-3">
                  <Stack direction="horizontal" gap={3} className="d-flex justify-content-between ">
                  <div style={{width: '450px'}}>{title}</div>
                  <div style={{width: '100px'}}>
                    <Button onClick={handleDelete(id)} variant="danger" className="m-1" size="sm"><BsFillTrashFill /></Button>
                    <Button onClick={handleEdit(id)} size="sm"><BsPencilSquare /></Button>
                  </div>
                  </Stack>
                </div>
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </ToDoContext.Provider>
  );
};

export default App;
