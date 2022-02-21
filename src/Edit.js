import React, {useState} from "react";
import './Edit.css';
import {Link, useNavigate, useLocation  } from 'react-router-dom';
import {ValidatorForm} from 'react-material-ui-form-validator';
import TextValidator from "react-material-ui-form-validator/lib/TextValidator";

export default function Edit({editSubscriberHandler}){
    
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state.userId;
    const userName = location.state.userName;
    const userEmail = location.state.userEmail;
    const userRole = location.state.userRole;

    const [editUser, setEditUser] = useState({
        id: userId,
        name: userName,
        email: userEmail,
        role: userRole
    });
    const{name, email, role} = editUser;

    function inputChangedHandler(e) {
        const state = editUser;
        state[e.target.name] = e.target.value;
        setEditUser({...state});
    }
    const onFormSubmitted = (e) => {
        e.preventDefault();
        editSubscriberHandler(editUser);
        setEditUser({id: 0, name: '', email: '', role: ''});
        navigate('/');
    }
    return(
        <div>
            <div className="component-body-container">
            <Link to="/">
                <button className="custom-btn-form back-btn">Back</button>
            </Link>
            <ValidatorForm className="subscriber-form" onSubmit={onFormSubmitted}>
                <TextValidator
                    fullWidth 
                    id="name"
                    label="Name"
                    type="text"
                    name="name"
                    onChange={inputChangedHandler}
                    value ={name}
                    validators = {['required']}
                    errorMessages = {['Name is required!']}
                    variant="standard"
                />
                <br/><br/>
                <TextValidator
                    fullWidth
                    id="email"
                    label="Email"
                    type="email"
                    name="email"
                    onChange={inputChangedHandler}
                    value ={email}
                    validators = {['required']}
                    errorMessages = {['Email is required!']}
                    variant="standard"
                />
                <br/><br/>
                <TextValidator
                    fullWidth
                    id="role"
                    label="Role"
                    type="text"
                    name="role"
                    onChange={inputChangedHandler}
                    value ={role}
                    validators = {['required']}
                    errorMessages = {['Role is required!']}
                    variant="standard"
                />
                <br/>
                <div className="subscriber-info-container">
                    <span className="subscriber-to-add-heading">Details to be updated : </span><br/>
                    <span className="subscriber-info">Name : {name}</span><br/>
                    <span className="subscriber-info">Email : {email}</span><br/>
                    <span className="subscriber-info">Role : {role}</span>
                </div>
                <button type="submit" className="custom-btn-form add-btn custom-add-btn">Update</button>
            </ValidatorForm>
            </div>
        </div>
    )
}