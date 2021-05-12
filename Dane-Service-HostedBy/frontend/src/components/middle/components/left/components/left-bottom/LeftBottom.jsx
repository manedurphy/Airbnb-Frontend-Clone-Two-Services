import React from 'react';
import DuringYourStay from './components/during-your-stay/DuringYourStay';
import Superhost from './components/superhost/Superhost';
import About from './components/about/About';
import Cohosts from './components/cohost/Cohosts';

const LeftMiddle = (props) => (
    <React.Fragment>
        <About about={props.about} />
        {props.cohosts.length > 0 && <Cohosts cohosts={props.cohosts} />}
        <DuringYourStay duringYourStay={props.duringYourStay} />
        {props.isSuperhost && <Superhost name={props.name} />}
    </React.Fragment>
);

export default LeftMiddle;
