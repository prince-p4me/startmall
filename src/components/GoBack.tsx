import React from 'react';
import { withRouter, useHistory } from 'react-router-dom';

const GoBack = ({ history = useHistory() }) => {
    return <img src="./images/back.png" onClick={() => history.goBack()} alt="Go back" />;
};

export default withRouter(GoBack);