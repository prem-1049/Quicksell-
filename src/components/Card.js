import React from 'react';
import '../styles/style.css'; 
import { ReactComponent as DisplayIcon } from './dots.svg'; // Adjust the path to your SVG file


const Card = ({ ticket, userMap }) => {
    const user = userMap[ticket.userId] || {};

    // Function to get initials from the user's name
    const getUserInitials = (name) => {
        if (!name) return 'U'; // Default to 'U' if name is not available
        const initials = name.split(' ').map(part => part.charAt(0)).join('');
        return initials.toUpperCase();
    };
    const getRandomColor = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const color = `#${((hash >> 24) & 0xFF).toString(16)}${((hash >> 16) & 0xFF).toString(16)}${((hash >> 8) & 0xFF).toString(16)}`.slice(0, 7);
        return color.length === 7 ? color : '#f56a00'; // Fallback if color calculation fails
    };
    const avatarColor = getRandomColor(user.name || ticket.userId); // Generate color based on name or userId
    const userInitials = getUserInitials(user.name);
    const availabilityColor = user.available ? 'green' : 'red'; // Green for available, red for unavailable

    

    return (
        
        <div className="card">
            <div className="cardline" >
            <p>{ticket.id}</p>
            <div className="user-info">
                <div className="avatar" style={{ backgroundColor: avatarColor }}>
                    {userInitials}
                    <span className="availability" style={{ backgroundColor: availabilityColor }}></span>
                </div>
            </div>
            </div>
            <h6>{ticket.title}</h6>
            <p>Priority: {ticket.priority}</p>
            <p>User: {userMap[ticket.userId]?.name || 'Unknown'}</p>
            <div className="tag-box">
                {ticket.tag} {/* Assuming tags is an array */}
            </div>
            
            
            
            
            </div>
            
    );
};


export default Card;
