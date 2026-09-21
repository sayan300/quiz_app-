document.getElementById('createAccountBtn').addEventListener('click', async (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMsg = document.getElementById('error-msg');

    errorMsg.classList.add('hidden');

    if (!fullName || !email || !password || !confirmPassword) {
        errorMsg.textContent = 'Please fill in all fields';
        errorMsg.classList.remove('hidden');
        return;
    }

    if (password !== confirmPassword) {
        errorMsg.textContent = 'Passwords do not match';
        errorMsg.classList.remove('hidden');
        return;
    }

    try {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, email, password })
        });
        const data = await res.json();

        if (!res.ok) {
            errorMsg.textContent = data.error || 'Something went wrong';
            errorMsg.classList.remove('hidden');
            return;
        }

        window.location.href = '/registration.html';
    } catch (err) {
        errorMsg.textContent = 'Could not connect to server';
        errorMsg.classList.remove('hidden');
    }
});
