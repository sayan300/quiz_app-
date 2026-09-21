document.getElementById('signInBtn').addEventListener('click', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    errorMsg.classList.add('hidden');

    if (!email || !password) {
        errorMsg.textContent = 'Please enter email and password';
        errorMsg.classList.remove('hidden');
        return;
    }

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (!res.ok) {
            errorMsg.textContent = data.error || 'Something went wrong';
            errorMsg.classList.remove('hidden');
            return;
        }

        window.location.href = '/index.html';
    } catch (err) {
        errorMsg.textContent = 'Could not connect to server';
        errorMsg.classList.remove('hidden');
    }
});
