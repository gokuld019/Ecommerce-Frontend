import React, { createContext, useState, useEffect } from 'react';

// Create a Context for the user ID
const Useridcontext = createContext();

const UserIDProvider = ({ children }) => {
    const [userID, setUserID] = useState(null);

    // Function to set user ID
    const setUserId = (id) => {
        const userIdString = String(id);
        setUserID(userIdString);
        localStorage.setItem('userID', userIdString);
    };

    // Load user ID from localStorage on initial render
    useEffect(() => {
        const storedUserID = localStorage.getItem('userID');
        if (storedUserID) {
            setUserID(storedUserID);
        }
    }, []);

    return (
        <Useridcontext.Provider value={{ userID, setUserId }}>
            {children}
        </Useridcontext.Provider>
    );
};

export { UserIDProvider, Useridcontext };
