import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NewBountyForm from './components/NewBountyForm'
import Bounty from './components/Bounty'
import EditForm from './components/EditForm'
import './styles.css'


function App(props) {
    const blankInputs = {
        firstName: '',
        lastName: '',
        living: true,
        bountyAmount: 0,
        type: ''
    }
    const [bounties, setBounties] = useState([])
    const [inputs, setInputs] = useState(blankInputs)
    const [editInputs, setEditInputs] = useState(blankInputs)
    const [displayEdit, setDisplay] = useState(false)

    function handleChange(event){
        const {name, value} = event.target
        setInputs(prevInputs => ({...prevInputs, [name]: value}))
    }
    function handleSubmit(event) {
        event.preventDefault()
        axios.post('/bounty', inputs)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        setBounties(prevBounties => [...prevBounties, inputs])
        setInputs(blankInputs)
        const newBountyForm = document.newBounty
        const {firstName, lastName, living, bountyAmount, type} = newBountyForm
        firstName.value = ''
        lastName.value = ''
        living.value = ''
        bountyAmount.value = ''
        type.value = ''
    }
    function handleEdit(event) {
        if (displayEdit) {
            setDisplay(false)
            setEditInputs(blankInputs)

        } else {
            setDisplay(true)
            const currentBounty = bounties.find(bounty => bounty.id === event.target.parentElement.id)
            setEditInputs(currentBounty)
        }
    }
    function updateBounties() {
        axios.get('/bounty')
            .then(res => setBounties(res.data))
            .catch(error => console.log(error))
    }
    function onDelete(event) {
        axios.delete(`/bounty/${props.id}`)
            .then(res => {
                console.log(res.data)
                updateBounties()
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        updateBounties()
        // axios.get('/bounty')
        //     .then(res => setBounties(res.data))
        //     .catch(error => console.log(error))
    }, [])

    return (
        <>
            <NewBountyForm 
                onChange={handleChange} 
                onSubmit={handleSubmit} 
                bounties={bounties} 
                state={inputs, setInputs, bounties, setBounties}
            />
            {bounties.map(bounty => 
                <Bounty {...bounty} 
                    onDelete={onDelete}
                    onEdit={handleEdit} 
                    key={bounty.id} 
                />
            )}
            <EditForm 
                updateBounties={updateBounties} 
                state={displayEdit} editState={setDisplay} 
                inputs={editInputs} 
            />
        </>
    )
}

export default App