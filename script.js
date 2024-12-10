const userId = 1; // Replace with the logged-in user's ID

// Fetch user information
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(`http://localhost:3000/profile/${userId}`);
        const user = await response.json();

        document.getElementById('username').textContent = user.username;
        document.getElementById('email').textContent = user.email;
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
});

// Handle password update
document.getElementById('password-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword !== confirmPassword) {
        document.getElementById('message').textContent = 'Passwords do not match';
        document.getElementById('message').style.color = 'red';
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/profile/update-password/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newPassword }),
        });

        const result = await response.json();
        document.getElementById('message').textContent = result.message;
        document.getElementById('message').style.color = 'green';
    } catch (error) {
        console.error('Error updating password:', error);
        document.getElementById('message').textContent = 'Failed to update password';
        document.getElementById('message').style.color = 'red';
    }
});
