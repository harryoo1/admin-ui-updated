import React, {useEffect} from "react";
import './Ui.css';
import {Link} from 'react-router-dom';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import { useSelector } from "react-redux";
import Search from './Search';
import Pagination from './Pagination';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

let PageSize = 10;

export default function Ui({selectSubscriberHandler, sortHandlerDescending, sortHandlerAscending, deleteSubscriberHandler, deleteSelectedHandler, selectAllSubscriberHandler}){

    const usersList = useSelector(state => state.users);

    const filteredList = useSelector(state => state.filtered);
    
    const checkAll = (e) => {
        var value  = false
        if(e.target.checked){
          value = true;
        }
        Array.from(document.querySelectorAll("input[name= selectUser]"))
        .forEach((checkbox) => {
            document.getElementById(checkbox.id).checked = value;
        });
    }

    // const [currentPage, setCurrentPage] = useState(1);

    // const currentTableData = useMemo(() => {
    //     const firstPageIndex = (currentPage - 1) * PageSize;
    //     const lastPageIndex = firstPageIndex + PageSize;
    //     return usersList.slice(firstPageIndex, lastPageIndex);
    // }, [currentPage]);

    useEffect(() => {
        if(usersList && usersList.length){
        document.title = "Number of Users : " + usersList.length;
        }
    }, [usersList]);

    return (
        <div>
            <div className="component-body-container">
                <Search />
            <div className="grid-container heading-container">
            <span className="grid-item checkBox-heading">
                <button className="custom-btn" onChange={checkAll} onClick={() => selectAllSubscriberHandler()}>
                <input type="checkbox" id="selectAll" name="selectAll" className="selectAll-check"/>
                </button>
            </span>
            <span className="grid-item name-heading">Name <ArrowDropUpIcon onClick={() => sortHandlerDescending("name")}/><ArrowDropDownIcon onClick={() => sortHandlerAscending("name")}/></span>
            <span className="grid-item email-heading">Email <ArrowDropUpIcon onClick={() => sortHandlerDescending("email")}/><ArrowDropDownIcon onClick={() => sortHandlerAscending("name")}/></span>
            <span className="grid-item role-heading">Role <ArrowDropUpIcon onClick={() => sortHandlerDescending("role")}/><ArrowDropDownIcon onClick={() => sortHandlerAscending("name")}/></span>
            <span className="grid-item actions-heading">Actions</span>
            </div>
            {
                filteredList.map(user => {
                    return <div key={user.id} className="grid-container">
                        <span className="grid-item">
                            <button className="custom-btn" onClick={() => selectSubscriberHandler(user.id)}>
                            <input type="checkbox" id={user.name} name="selectUser" className="select-check" value={user.id}/>
                            </button>
                        </span>
                        <span className="grid-item">{user.name}</span>
                        <span className="grid-item">{user.email}</span>
                        <span className="grid-item">{user.role}</span>
                        <span className="grid-item action-btn-container">
                            <Link to='/add' state={{userId : user.id, userName : user.name, userEmail : user.email, userRole : user.role}}>
                                <button className="custom-btn edit-btn"><NoteAltOutlinedIcon /></button>
                            </Link>
                            <button className="custom-btn delete-btn" onClick={() => deleteSubscriberHandler(user.id)}><DeleteOutlinedIcon /></button>
                        </span>
                    </div>
                })
            }
            {/* <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={usersList.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            /> */}
            <button className="custom-btn delete-selected-btn" onClick={() => deleteSelectedHandler()}>Delete Selected</button>
            </div>
        </div>
    );
}