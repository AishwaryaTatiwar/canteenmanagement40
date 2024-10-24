import React, { useEffect, useState } from "react";
import "./UsersPage.css";

function UsersPage() {
  const [users, setUsers] = useState([]);

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8283/api/user2"); // Your backend route
        const data = await response.json();

        // If the response is an object, convert it to an array
        if (!Array.isArray(data)) {
          setUsers([data]);
        } else {
          setUsers(data); // If it's already an array, set it directly
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <div className="main-content">
        {/* Table for User list */}
        <div className="User-list">
          <table>
            <thead>
              <tr>
                <th>Sr.no</th>
                <th>User name</th>
                <th>Email-Id</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;