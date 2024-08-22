// restfulAPI.js

export const createAccount = async (username, email, password) => {
    try {
        const response = await fetch('http://localhost:4567/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
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
