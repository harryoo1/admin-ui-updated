import React, {useState} from 'react';
import './Search.css';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function Search() {

    const usersList = useSelector(state => state.users);

    const [searchQuery, setSearchQuery] = useState(usersList);
    const dispatch = useDispatch();

    const inputChangedHandler = (e) => {
        var dm = e.target.value;
        var str =dm.toString();
        var result = usersList.filter(user=> user["name"].toLowerCase().includes(str) || user["email"].toLowerCase().includes(str));
        dispatch({"type": "SET_FILTERED", payload: result}); 
        setSearchQuery(result);
    };

    return (
        <div className='container'>
        <form className="search-form">
            <input id="search" type="text" className="input-control" name="search" onChange={inputChangedHandler}/><br/>
            {/* {
                searchQuery.map((item)=>(
                    <div key={item.id} className="search-container">
                    <span className="search-item">{item.name}</span>
                    <span className="search-item">{item.email}</span>
                    <span className="search-item">{item.role}</span>
                    </div>
                ))
            } */}
        </form>
        </div>
    );
}