import React from 'react';
import AvatarContainer from './styled-components/AvatarContainter';
import AvatarImg from './styled-components/AvatarImg';
import AvatarMedal from './styled-components/AvatarMedal';
import medal from './medal.svg';

const Avatar = ({ avatar, superHost }) => (
    <AvatarContainer>
        <AvatarImg src={avatar} alt={'host'} />
        {superHost && <AvatarMedal src={`https://fec-corgis.s3.amazonaws.com/static${medal}`} />}
    </AvatarContainer>
);

export default Avatar;
