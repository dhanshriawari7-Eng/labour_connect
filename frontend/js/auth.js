async function login(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Reset state
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) errorDiv.classList.add('hidden');
    
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = 'Logging in...';
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-75');

    try {
        const res = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        if (res.success) {
            window.location.href = 'pages/dashboard.html';
        } else {
            if (errorDiv) {
                errorDiv.innerText = res.message;
                errorDiv.classList.remove('hidden');
            } else {
                alert(res.message);
            }
        }
    } catch (error) {
        if (errorDiv) {
            errorDiv.innerText = error.message;
            errorDiv.classList.remove('hidden');
        } else {
            alert(error.message);
        }
    } finally {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-75');
    }
}

async function register(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = 'Creating account...';
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-75');

    const data = {
        name: form.name.value,
        email: form.email.value,
        password: form.password.value,
        role: form.role ? form.role.value : 'CLIENT'
    };

    try {
        const res = await apiRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        if (res.success) {
            alert('Registration successful! Please sign in.');
            toggleAuthForm('login');
        } else {
            alert(res.message);
        }
    } catch (error) {
        alert(error.message);
    } finally {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-75');
    }
}

async function logout() {
    try {
        await apiRequest('/auth/logout', { method: 'POST' });
        window.location.href = '../index.html';
    } catch (error) {
        console.error(error);
    }
}

function toggleAuthForm(type) {
    // Relying on the inline toggleAuthForm defined in login.html for the new UI
    if (typeof window.toggleAuthFormUI === 'function') {
        window.toggleAuthFormUI(type);
    }
}
