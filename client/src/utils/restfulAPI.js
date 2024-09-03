// restfulAPI.js

const getAPIBaseURL = () => {
    const hostname = window.location.hostname;

    console.log(`Hostname: ${hostname}`);

    if (hostname.includes('github.dev')) {

        // For GitHub Codespaces
        const apiHostname = hostname.replace('3000', '4567');
        return `https://${apiHostname}/`;
    } else if (hostname === 'localhost' || hostname === '127.0.0.1') {
        // For local
        return 'http://localhost:4567';
    } else {
        // For other environments maybe???
        return `https://${hostname}:4567`;
    }
};

const API_BASE_URL = getAPIBaseURL();
console.log(`API Base URL: ${API_BASE_URL}`);

export const createAccount = async (username, email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
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
        const response = await fetch(`${API_BASE_URL}/login`, {
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

export async function updateRecord(username, result) {
    try {
        const response = await fetch(`${API_BASE_URL}/updateRecord`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, result })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server responded with status ${response.status}: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to update record:', error);
        throw error;
    }
}
