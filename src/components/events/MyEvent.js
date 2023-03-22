import React, { useEffect, useState } from "react"
import { deleteEvent, leaveEvent, joinEvent, getEvent} from "../../managers/EventManager.js"
import {getCreatedEvents,getJoinedEvents} from "../../managers/EventManager.js"


export const MyEvent = () => {
    const [events, setCreatedEvents] = useState([])
    const navigate = useNavigate()
    const [events, setJoinedEvents] = useState([])

    useEffect(() => {
        getCreatedEvents().then(data => setEventsCreated(data))
    }, [])

    useEffect(() => {
        getJoinedEvents().then(data => setJoinedEvents(data))
    }, [])

    const resetCreatedEvents= () => {
        getCreatedEvents().then(data => setCreatedEvents(data))
    }

    const resetJoinedEvents = () => {
        getJoinedEvents().then(data => setJoinedEvents(data))
    }


    const handleDelete = (id) => {
      deleteEvent(id).then(() => {
          {resetCreatedEvents()}
           }) 
    }

    const handleLeave = (id) => {
        leaveEvent(id).then(() => {
            {resetJoinedEvents()}
            }) 
    }


    return (<>
    <div  className="row">
                <div  className="row">
                    {classesInstructing.map(thisClass => {return  (<div className="card col-3 text-center" key={thisClass.id}>
                            <div className="classDetails">
                            <p className="card-header">{thisClass.title}</p>
                            <p className="card-body">{thisClass.description}</p>
                            <p className="card-body">{thisClass.date}{thisClass.time}</p>
                            <p className="card-body">{thisClass?.skill?.skill_level}</p>
                            <div className="vertical-center">
                            <button class="btn btn-dark"
                            onClick={() => {
                                handleDelete(thisClass.id)
                            }}
                            >Delete Class</button></div>
                            <div className="vertical-center">
                            <button class="btn btn-dark" onClick={ () => { navigate(`${ thisClass.id }/edit`)}}>Edit this Class</button></div>
                            </div>
                        </div>)})}
                </div>
                <div  className="row">
                    {classesAttending.map(thisClass => {return  (<div className="card col-3 text-center" key={thisClass.id}>
                            <div className="classDetails">
                            <p className="card-header">{thisClass.title}</p>
                            <p className="card-body">{thisClass.description}</p>
                            <p className="card-body">{thisClass.date}{thisClass.time}</p>
                            <p className="card-body">{thisClass?.skill?.skill_level}</p>
                            <div className="vertical-center">
                            <button class="btn btn-dark"
                                onClick={() => {
                                    handleLeave(thisClass.id)
                                }}
                            >Leave Class</button>
                            </div>
                            </div>
                        </div>)})}
                                    </div>
            </div>
            </>)
}
