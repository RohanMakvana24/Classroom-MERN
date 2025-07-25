import React, { useState } from 'react'
import Stream from './Stream';
import ClassWork from './ClassWork';
import People from './People';

const ClasssNavbar = () => {
    const [ActiveTab, setActiveTab] = useState("stream");

    switch (ActiveTab) {
        case "stream":
            return <Stream />
        case "classwork":
            return <ClassWork />
        case "people":
            return <People />
    }


    return (
        <>
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a onClick={setActiveTab('stream')} class={`nav-link ${ActiveTab === 'stream' ? 'active' : ''}`} aria-current="page" href="#">
                        Stream
                    </a>
                </li>
                <li class="nav-item">
                    <a onClick={setActiveTab('classwork')} class={`nav-link ${ActiveTab === 'classwork' ? 'active' : ''}`} href="#">
                        Classwork
                    </a>
                </li>
                <li class="nav-item">
                    <a onClick={setActiveTab('people')} class={`nav-link ${ActiveTab === 'people' ? 'active' : ''}`} href="#">
                        People
                    </a>
                </li>
            </ul>
        </>
    )
}

export default ClasssNavbar
