

import { useState } from 'react'
import { createUser } from '../api'

function CreateUserForm({ onUserCreated }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting user:', { name, email });
        try {
            const newUser = await createUser({ name, email });
            console.log('User created successfully:', newUser);
            setName('');
            setEmail('');
            onUserCreated(); // Refresh users list
        } catch (error) {
            console.error('Error creating user:', error);
            alert(`Failed to create user: ${error.message}`);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
            </div>
            <div>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
            </div>
            <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
            >
                Create User
            </button>
        </form>
    )
}

export default CreateUserForm;
