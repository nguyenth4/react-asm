const axios = require('axios');

const BE_URL = 'http://localhost:3000';

async function testAuth() {
    console.log('--- Testing Registration ---');
    const registerData = {
        first_name: 'Test',
        last_name: 'User',
        email: `test_${Date.now()}@example.com`,
        phone: '0987654321',
        password: 'Password123!',
        newsletter: true
    };

    try {
        const regRes = await axios.post(`${BE_URL}/users/register`, registerData);
        console.log('Registration Success:', regRes.data);

        console.log('\n--- Testing Login ---');
        const loginRes = await axios.post(`${BE_URL}/users/login`, {
            email: registerData.email,
            password: registerData.password
        });
        console.log('Login Success:', loginRes.data);

        if (loginRes.data.user && loginRes.data.token) {
            console.log('\nVerification PASSED: User info and token returned.');
        } else {
            console.log('\nVerification FAILED: Missing user info or token.');
        }

    } catch (error) {
        console.error('Test Failed:', error.response ? error.response.data : error.message);
    }
}

testAuth();
