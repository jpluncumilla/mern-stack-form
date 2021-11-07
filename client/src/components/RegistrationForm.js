import React, {Fragment, useState} from 'react';
import axios from "axios";
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./RegistrationForm.css";


export const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        telephone: '',
        message: ''
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { name, email, telephone, message } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        const newRegistration ={
            name,
            email,
            telephone,
            message
        };

        try {
            const config = {
                headers:{
                    'Content-Type': 'application/json'
                }
            };

            const body = JSON.stringify(newRegistration);

            const res = axios.post('http://localhost:5001/api/registration', body, config);
            console.log(res.data);

        } catch (err) {
            console.error(err.response.data);
        }

         fieldClearance();
    }
    async function fieldClearance (){
        setFormData({ name: "", email: "", telephone:"", message: "" });
        await handleShow();
    };
 

  
    
    return (
        <div className="Form">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="dark" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>


            <Form className="mainForm" onSubmit={onSubmit}>
            <h1>Send a message to your future self!</h1>
            <Form.Floating className="mb-3">
                <Form.Control
                id="Name"
                type="text"
                placeholder="Name"
                name='name' 
                value={name} 
                onChange={onChange} 
                required
                />
                <label htmlFor="floatingInputCustom">Name</label>
            </Form.Floating>
            
            <Form.Floating className="mb-3">
                <Form.Control
                id="email"
                type="email"
                placeholder="Email"
                name='email' 
                value={email} 
                onChange={onChange} 
                required
                />
                <label htmlFor="floatingPasswordCustom">Email</label>
            </Form.Floating>  

            <Form.Floating className="mb-3">
                <Form.Control
                id="phone"
                type="phone"
                placeholder="Phone #"
                name='telephone' 
                value={telephone} 
                onChange={onChange}
                />
                <label htmlFor="floatingPasswordCustom">Phone</label>
            </Form.Floating>    

            <Form.Floating className="mb-3">
                <Form.Control
                rows={4}
                id="Message"
                type="text"
                placeholder="Message"
                name='message' 
                value={message} 
                onChange={onChange} 
                required
                style={{ height: '100px' }}
                />
                <label htmlFor="floatingPasswordCustom">Message To Future Self</label>
            </Form.Floating>

            <Button variant="dark" type="submit" value="Register"> Submit your message</Button>
        </Form>

        </div>
    )
}