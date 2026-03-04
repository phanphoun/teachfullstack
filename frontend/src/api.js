
export const api = 'http://localhost:3000';


export const getUsers = async () => {
    const response = await fetch(`${api}/users`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
}

export const getUserById = async (id) => {
    const response = await fetch(`${api}/users/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    return response.json();
}

export const createUser = async (userData) => {
    try {
        const response = await fetch(`${api}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Failed to create user: ${response.status} ${errorData.error || response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

export const updateUser = async (id, userData) => {
    const response = await fetch(`${api}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error('Failed to update user');
    }
    return response.json();
}

export const deleteUser = async (id) => {
    const response = await fetch(`${api}/users/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete user');
    }
    return response.json();
}


export const getProducts = async () => {
    const response = await fetch(`${api}/products`);
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
}
