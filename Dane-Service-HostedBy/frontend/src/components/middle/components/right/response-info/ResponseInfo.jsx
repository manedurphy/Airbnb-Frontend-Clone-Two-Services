import React from 'react';
import ResponseInfoItem from './styled-components/ResponseInfoItem';
import ResponseInfoContainer from './styled-components/ResponseInfoContainer';

const ResponseInfo = ({ time, rate, languages }) => (
    <ResponseInfoContainer>
        <ResponseInfoItem className={'font'}>
            {languages.length > 1
                ? `Languages: ${languages
                      .map((language) => language.Language.name)
                      .join(', ')}`
                : languages.length === 1
                ? `Language: ${languages[0].Language.name}`
                : null}
        </ResponseInfoItem>
        <ResponseInfoItem className={'font'}>
            Response rate: {rate}%
        </ResponseInfoItem>
        <ResponseInfoItem className={'font'}>
            Response time: {time < 24 ? 'within a day' : 'within a week'}
        </ResponseInfoItem>
    </ResponseInfoContainer>
);

export default ResponseInfo;
