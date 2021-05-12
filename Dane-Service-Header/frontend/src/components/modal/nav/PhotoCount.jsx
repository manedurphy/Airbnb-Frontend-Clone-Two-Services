import React from 'react';
import Font from './styled-components/Font';

const PhotoCount = (props) => <Font>{`${props.count} / ${props.total}`}</Font>;
export default PhotoCount;
