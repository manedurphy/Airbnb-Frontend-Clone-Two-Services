import React, { useState } from 'react';
import DirectionFlex from './styled-components/DirectionFlex';
import DirectionButtonContainer from './styled-components/DirectionButtonContainer';
import Wrapper from './styled-components/Wrapper';
import CircleRight from './styled-components/CircleRight';
import CircleLeft from './styled-components/CircleLeft';
import IconSpan from './styled-components/IconSpan';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { handleTransition } from '../../../redux/slices/modal/modalSlice';

const DirectionButtons = (props) => {
    const dispatch = useDispatch();
    const [mouseDown, setMouseDown] = useState(false);

    const handleClick = (index) => {
        const photo = props.photos[index];
        if (photo != null) {
            dispatch(handleTransition(photo, index));
        }
    };

    return (
        <DirectionButtonContainer>
            <DirectionFlex>
                <Wrapper
                    style={{
                        visibility: props.index === 0 && 'hidden',
                    }}
                    onClick={() => handleClick(props.index - 1)}
                    onMouseDown={() => setMouseDown(true)}
                    onMouseUp={() => setMouseDown(false)}
                    onMouseLeave={() => setMouseDown(false)}
                >
                    <CircleLeft
                        data-testid={'left'}
                        style={{
                            width: mouseDown && '43px',
                            height: mouseDown && '43px',
                        }}
                    >
                        <IconSpan>
                            <FaChevronLeft style={{ fontSize: '0.75rem' }} />
                        </IconSpan>
                    </CircleLeft>
                </Wrapper>
                <Wrapper
                    style={{
                        visibility:
                            props.index === props.photos.length - 1 && 'hidden',
                    }}
                    onClick={() => handleClick(props.index + 1)}
                    onMouseDown={() => setMouseDown(true)}
                    onMouseUp={() => setMouseDown(false)}
                    onMouseLeave={() => setMouseDown(false)}
                >
                    <CircleRight
                        data-testid={'right'}
                        style={{
                            width: mouseDown && '43px',
                            height: mouseDown && '43px',
                        }}
                    >
                        <IconSpan>
                            <FaChevronRight style={{ fontSize: '0.75rem' }} />
                        </IconSpan>
                    </CircleRight>
                </Wrapper>
            </DirectionFlex>
        </DirectionButtonContainer>
    );
};

export default DirectionButtons;
