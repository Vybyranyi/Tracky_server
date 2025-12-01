const BASE_URL = 'http://localhost:3000';
let adminToken = '';
let userToken = '';
let createdUserId = '';

const log = (msg, type = 'INFO') => console.log(`[${type}] ${msg}`);

const testSignin = async (email, password) => {
    log(`Testing Signin for ${email}...`);
    const res = await fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
        log('Signin Success', 'SUCCESS');
        return data.token;
    } else {
        log(`Signin Failed: ${data.message}`, 'ERROR');
        return null;
    }
};

const testCreateUser = async () => {
    log('Testing Create User (Admin)...');
    const res = await fetch(`${BASE_URL}/admin/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify({ email: `user_${Date.now()}@test.com` })
    });
    const data = await res.json();
    if (res.ok) {
        log('Create User Success', 'SUCCESS');
        createdUserId = data.user.id;
        return { email: data.user.email, password: data.generatedPassword };
    } else {
        log(`Create User Failed: ${data.message}`, 'ERROR');
        return null;
    }
};

const testGetProfile = async (token) => {
    log('Testing Get Profile...');
    const res = await fetch(`${BASE_URL}/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (res.ok) {
        log(`Get Profile Success: ${data.email}`, 'SUCCESS');
    } else {
        log(`Get Profile Failed: ${data.message}`, 'ERROR');
    }
};

const testAdminAccess = async (token, roleName) => {
    log(`Testing Admin Access for ${roleName}...`);
    const res = await fetch(`${BASE_URL}/admin/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
        log(`Access Allowed (Expected for Admin, Unexpected for User)`, roleName === 'Admin' ? 'SUCCESS' : 'ERROR');
    } else if (res.status === 403) {
        log(`Access Denied (Expected for User, Unexpected for Admin)`, roleName === 'User' ? 'SUCCESS' : 'ERROR');
    } else {
        log(`Unexpected Status: ${res.status}`, 'ERROR');
    }
};

const runTests = async () => {
    // 1. Signin as Admin
    adminToken = await testSignin('admin@tracky.com', 'admin123!@#');
    if (!adminToken) return;

    // 2. Create New User
    const newUserCreds = await testCreateUser();
    if (!newUserCreds) return;

    // 3. Signin as New User
    userToken = await testSignin(newUserCreds.email, newUserCreds.password);
    if (!userToken) return;

    // 4. Test Profiles
    await testGetProfile(adminToken);
    await testGetProfile(userToken);

    // 5. Test Access Control
    await testAdminAccess(adminToken, 'Admin');
    await testAdminAccess(userToken, 'User');
};

// Wait for server to start
setTimeout(runTests, 2000);
