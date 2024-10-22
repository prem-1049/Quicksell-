import React, { useState } from 'react';
import Card from './Card';
import Filters from './Filters';
import '../styles/App.css'; 
import { ReactComponent as DisplayIcon } from './dots.svg'; // Fallback icon
import { ReactComponent as DisplayIcon1 } from './add.svg'; // Adjust the path to your SVG file
import { ReactComponent as TodoIcon } from './To-do.svg';
import { ReactComponent as BacklogIcon } from './Backlog.svg';
import { ReactComponent as InProgressIcon } from './in-progress.svg';
import { ReactComponent as DoneIcon } from './Done.svg';
import { ReactComponent as Priority4Icon } from './SVG - Urgent Priority colour.svg';
import { ReactComponent as Priority3Icon } from './Img - High Priority.svg';
import { ReactComponent as Priority2Icon } from './Img - Medium Priority.svg';
import { ReactComponent as Priority1Icon } from './Img - Low Priority.svg';
import { ReactComponent as NoPriorityIcon } from './SVG - Urgent Priority grey.svg';

const KanbanBoard = ({ data }) => {
    const [groupBy, setGroupBy] = useState('status');
    const [sortBy, setSortBy] = useState('title');

    const users = data.users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
    }, {});

    const groupTickets = (tickets) => {
        const grouped = {};

        tickets.forEach(ticket => {
            let groupKey;
            if (groupBy === 'user') {
                groupKey = ticket.userId;
            } else if (groupBy === 'status') {
                groupKey = ticket.status;
            } else if (groupBy === 'priority') {
                groupKey = ticket.priority === 0 ? 'No Priority' : `Priority - ${ticket.priority}`;
            }

            grouped[groupKey] = grouped[groupKey] || [];
            grouped[groupKey].push(ticket);
        });

        return grouped;
    };

    const sortedTickets = (tickets) => {
        return [...tickets].sort((a, b) => {
            if (sortBy === 'title') {
                return a.title.localeCompare(b.title);
            } else {
                return b.priority - a.priority;
            }
        });
    };

    const getIconForStatus = (status) => {
        switch (status) {
            case 'Todo':
                return <TodoIcon width="15" height="15" />;
            case 'Backlog':
                return <BacklogIcon width="15" height="15" />;
            case 'In progress':
                return <InProgressIcon width="15" height="15" />;
            case 'Done':
                return <DoneIcon width="15" height="15" />;
            case 'Canceled':
                return <TodoIcon width="15" height="15" />; // Same as To-do.svg
            default:
                return null; // Return null if no matching status
        }
    };

    const getIconForPriority = (priority) => {
        switch (priority) {
            case 'Priority - 4':
                return <Priority4Icon width="15" height="15" />;
            case 'Priority - 3':
                return <Priority3Icon width="15" height="15" />;
            case 'Priority - 2':
                return <Priority2Icon width="15" height="15" />;
            case 'Priority - 1':
                return <Priority1Icon width="15" height="15" />;
            default:
                return <NoPriorityIcon width="15" height="15" />;
        }
    };

    const groupedData = groupTickets(sortedTickets(data.tickets));

    return (
        <div>
            <Filters setGroupBy={setGroupBy} setSortBy={setSortBy} />
            <div className="kanban-board">
                {Object.entries(groupedData).map(([group, tickets]) => (
                    <div key={group} className="column">
                        <div className='hedding'>
                    <div>
                    {groupBy === 'status'? getIconForStatus(group) :groupBy === 'priority' ? getIconForPriority(group):null}
                    <b>{groupBy === 'user' ? users[group]?.name : group}</b>
                    </div>
                    <div >
                    <DisplayIcon width="15" height="15" />
                    <DisplayIcon1 width="15" height="15" />

                    </div>
                    </div>
                        {tickets.map(ticket => (
                            <Card key={ticket.id} ticket={ticket} userMap={users} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KanbanBoard;
