// restfulAPI.js

export const createAccount = async (username, email, password) => {
    try {
        const response = await fetch('http://localhost:4567/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
            body: JSON.stringify({ // Convert data to JSON
                username: username,
                email: email,
                password: password
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const loginUser = async (username, password) => {
    try {
        const response = await fetch('http://localhost:4567/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                username,
                password
            })
        });

        if (!response.ok) {
            // Check response text if it's an error message
            const errorText = await response.text();
            console.error('Server responded with an error:', errorText);
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


export const updateRecord = async (username, result) => {
    try {
        const response = await fetch('http://localhost:4567/updateRecord', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                result: result
            })
        });

        if (!response.ok) {
            // Check response text if it's an error message
            const errorText = await response.text();
            console.error('Server responded with an error:', errorText);
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
