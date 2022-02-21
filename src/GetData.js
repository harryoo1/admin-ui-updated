import React, {useState, useEffect} from "react";
import './GetData.css';
import { Fragment} from "react/cjs/react.production.min";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Ui from './Ui';
import { useDispatch, useSelector } from "react-redux";
import Pagination from './Pagination';
import Edit from "./Edit";
import ErrorFallback from "./ErrorFallback";
import {ErrorBoundary} from 'react-error-boundary';

export default function GetData(){

  const usersList = useSelector(state => state.users);

  const [checkedList, setCheckedList] = useState([]);

  const [hasError, setHasError] = useState(false);

  //const [state, dispatch] = useReducer(TotalSubscribersReducer, {count:0});

  const dispatch = useDispatch();

  async function loadData(){
    setHasError(false);
      try{
        const rawResponse = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
        if (!rawResponse.ok) {
          throw new Error(`HTTP error! status: ${rawResponse.status}`);
        }
        else{
          const data = await rawResponse.json();
          dispatch({"type": "SET_USERS", payload: data});
        }
      }
      catch(error){
        console.log(error);
        setHasError(true);
        return <ErrorFallback error={error}/>;
      }
  
  }

  useEffect(() => {
      loadData();
  }, []);

  // const deleteSubscriberHandler = useCallback(async(subscriberId) => {
  //     const rawResponse = await fetch("http://localhost:7081/api/contacts/"+subscriberId, {method: "DELETE"});
  //     const data = await rawResponse.json();
  //     loadData();
  // }, []);

  function selectSubscriberHandler(userIds) {
    checkedList.push(userIds);
    setCheckedList(checkedList);
}

function selectAllSubscriberHandler() {
    usersList.forEach(item => {
        checkedList.push(item.id);
    });
    setCheckedList(checkedList);
}

  function deleteSubscriberHandler(userId) {
    const newUserList = usersList.filter((user) => user.id !== userId);
    dispatch({"type": "SET_USERS", payload: newUserList});
    //setUsersList(newUserList);
    window.scrollTo(0, 0)
  }

  function deleteSelectedHandler() {
    const newUserList = usersList.filter((user) => !checkedList.includes(user.id));
    dispatch({"type": "SET_USERS", payload: newUserList});
    //setUsersList(newUserList);
    window.scrollTo(0, 0)
}
function sortHandlerDescending(arg) {
  const sorted = [...usersList].sort((a, b) => a[arg] > b[arg] ? -1 : 1);
  dispatch({"type": "SET_USERS", payload: sorted});
}
function sortHandlerAscending(arg) {
  const sorted = [...usersList].sort((a, b) => a[arg] > b[arg] ? 1 : -1);
  dispatch({"type": "SET_USERS", payload: sorted});
}

function editSubscriberHandler(editSubscriber) {
  usersList.filter((user) => user.id === editSubscriber.id).map(item => {
    item.name = editSubscriber.name;
    item.email = editSubscriber.email;
    item.role = editSubscriber.role;
  });
}

//   const countOfSubscribers = useMemo(() => {
//       return subscribersList.length;
//   }, [subscribersList]);
try{}
catch(error){
  console.log("err---" + error);
}
  return(
      <Fragment>
        {hasError && <h3 style={{color: "#ff0033"}}>HTTP error! status: 403</h3>}
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Router>
            <Routes>
                <Route exact path="/" element={<Ui selectSubscriberHandler = {(userId) => selectSubscriberHandler(userId)} sortHandlerDescending = {sortHandlerDescending} sortHandlerAscending = {sortHandlerAscending} deleteSubscriberHandler = {(userId) => deleteSubscriberHandler(userId)} deleteSelectedHandler = {() => deleteSelectedHandler()} selectAllSubscriberHandler = {() => selectAllSubscriberHandler()}/>}/>
                <Route exact path="/add" element={<Edit editSubscriberHandler = {(editSubscriber) => editSubscriberHandler(editSubscriber)}/>}/>
            </Routes>
          </Router>
        </ErrorBoundary>
      </Fragment>
  )
}
