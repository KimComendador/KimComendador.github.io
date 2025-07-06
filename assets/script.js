<html>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const showLoginBtn = document.getElementById('showLoginBtn');
    const showSignupBtn = document.getElementById('showSignupBtn');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginMessage = document.getElementById('loginMessage');
    const signupMessage = document.getElementById('signupMessage');

    // Get input fields for login
    const loginUsernameInput = document.getElementById('loginUsername');
    const loginPasswordInput = document.getElementById('loginPassword');

    // Get input fields for signup
    const signupUsernameInput = document.getElementById('signupUsername');
    const signupPasswordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    // --- User Management (Simplified for Demo) ---
    // In a real app, this would interact with a backend database.
    // For this demo, we'll use localStorage to persist users across sessions.
    let users = JSON.parse(localStorage.getItem('novelNexusUsers')) || [];

    function saveUsers() {
        localStorage.setItem('novelNexusUsers', JSON.stringify(users));
    }

    // --- Form Toggling ---
    showLoginBtn.addEventListener('click', () => {
        loginForm.classList.add('active');
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        signupForm.classList.remove('active');

        showLoginBtn.classList.add('active');
        showSignupBtn.classList.remove('active');

        // Clear messages when switching forms
        loginMessage.textContent = '';
        signupMessage.textContent = '';
    });

    showSignupBtn.addEventListener('click', () => {
        signupForm.classList.add('active');
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        loginForm.classList.remove('active');

        showSignupBtn.classList.add('active');
        showLoginBtn.classList.remove('active');

        // Clear messages when switching forms
        loginMessage.textContent = '';
        signupMessage.textContent = '';
    });

    // --- Login Logic ---
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = loginUsernameInput.value;
        const password = loginPasswordInput.value;

        // Find user in our "database"
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            loginMessage.textContent = 'Login successful! Redirecting...';
            loginMessage.style.color = 'green';
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect to homepage
            }, 1500);
        } else {
            loginMessage.textContent = 'Invalid username or password.';
            loginMessage.style.color = 'red';
        }
        loginPasswordInput.value = ''; // Clear password field for security
    });

    // --- Sign Up Logic ---
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = signupUsernameInput.value;
        const password = signupPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Basic validation
        if (username.length < 3) {
            signupMessage.textContent = 'Username must be at least 3 characters long.';
            signupMessage.style.color = 'red';
            return;
        }
        if (password.length < 6) {
            signupMessage.textContent = 'Password must be at least 6 characters long.';
            signupMessage.style.color = 'red';
            return;
        }
        if (password !== confirmPassword) {
            signupMessage.textContent = 'Passwords do not match.';
            signupMessage.style.color = 'red';
            return;
        }

        // Check if username already exists
        if (users.some(u => u.username === username)) {
            signupMessage.textContent = 'Username already taken. Please choose another.';
            signupMessage.style.color = 'red';
            return;
        }

        // Add new user
        users.push({ username: username, password: password });
        saveUsers(); // Save to localStorage
        signupMessage.textContent = 'Account created successfully! You can now log in.';
        signupMessage.style.color = 'green';

        // Optionally, switch to login form after successful signup
        setTimeout(() => {
            showLoginBtn.click(); // Programmatically click login button
            signupUsernameInput.value = '';
            signupPasswordInput.value = '';
            confirmPasswordInput.value = '';
            loginUsernameInput.value = username; // Pre-fill username for convenience
        }, 1000);
    });
});

</script>
</html>