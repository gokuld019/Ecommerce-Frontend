import React, { useContext } from 'react';
import { Useridcontext } from './Useridcontext';

const UserProfile = () => {
    const { userID, setUserId } = useContext(Useridcontext);

    if (!userID) {
        return <div>Please set a user ID</div>;
    }

    return (
        <div>
            <h1>Welcome, User {userID}</h1>
            <button onClick={() => setUserId(null)}>Clear User ID</button>
        </div>
    );
};

export default UserProfile;
