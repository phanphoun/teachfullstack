import { deleteUser } from '../api'
import { useNavigate } from 'react-router-dom'

function Users({ users, onUserUpdated }) {
    const navigate = useNavigate();

    const handleEdit = (user) => {
        navigate(`/edit-user/${user.id}`);
    };

    const handleDelete = (user) => {
        if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
            deleteUser(user.id)
                .then(() => {
                    console.log('User deleted successfully');
                    onUserUpdated(); // Refresh users list
                })
                .catch(error => {
                    console.error('Error deleting user:', error);
                    alert('Failed to delete user');
                });
        }
    };
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {user.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                    <button 
                                        onClick={() => handleEdit(user)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition duration-200"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(user)}
                                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition duration-200"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {users.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No users found. Create your first user above!
                </div>
            )}
        </div>
    )
}

export default Users