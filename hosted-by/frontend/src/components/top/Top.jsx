import React from 'react';
import Avatar from './components/avatar/Avatar';
import JoinDate from './styled-components/JoinDate';
import HostedBy from './styled-components/HostedBy';
import TopContainer from './styled-components/TopContainer';
import { convertDate } from '../../constants/functions/convertDate';

const Top = ({ host }) => (
    <TopContainer>
        <Avatar avatar={host.avatar} superHost={host.isSuperhost} />
        <div>
            <HostedBy>Hosted by {host.name}</HostedBy>
            <JoinDate>Joined in {convertDate(host.joinedOn)}</JoinDate>
        </div>
    </TopContainer>
);

export default Top;
