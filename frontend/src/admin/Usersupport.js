import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Usersupport = () => {
    const [messages, setMessages] = useState([]); // Initialize messages with an empty array

    useEffect(() => {
        // Function to fetch contact form details from the backend
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:8283/api/contactadmin/contacts'); // Adjust endpoint as needed
                setMessages(response.data); // Update the messages state with fetched data
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            }
        };

        fetchMessages(); // Fetch messages on component mount
    }, []);

    return (
        <div>
            {messages.length === 0 ? (
                <p>No contacts available.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((contact, index) => (
                            <tr key={index}>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Usersupport;
