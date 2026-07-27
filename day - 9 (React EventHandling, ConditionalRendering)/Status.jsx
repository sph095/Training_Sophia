import { useState } from 'react';

const statusConfig = {
  online: {
 color: 'green',
 message: 'Available',
 showMessageButton: true,
 statusText: null
 },
  offline: {
 color: 'gray',
 message: null,
 showMessageButton: false,
 statusText: 'Last seen 2 hours ago'
 },
 away: {
 color: 'orange',
 message: null,
 showMessageButton: true,
 statusText: 'Away since 1:30 PM'
 },
 busy: {
 color: 'red',
 message: 'Do not disturb',
 showMessageButton: false,
 statusText: null
 }
};

function UserStatusCard() {
  const [status, setStatus] = useState('online');
  const statuses = ['online', 'offline', 'away', 'busy'];

  const config = statusConfig[status];

  const cycleStatus = () => {
    const currentIndex = statuses.indexOf(status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    setStatus(statuses[nextIndex]);
  };

 return (
 <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1.5rem', maxWidth: '300px', marginLeft:'35%'}}>
 <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
 <div
 style={{
 width: '12px',
 height: '12px',
 borderRadius: '50%',
 backgroundColor: config.color,
 }}
 />
 <span style={{ fontWeight: 'bold' }}>{status}</span>
 </div>

 {config.message && <p style={{ marginTop: '8px' }}>{config.message}</p>}
 {config.statusText && <p style={{ color: '#666' }}>{config.statusText}</p>}
 {config.showMessageButton && (
 <button style={{ marginTop: '8px', padding: '6px 12px' }}>
 Send Message
 </button>
 )}

 <button
 onClick={cycleStatus}
 style={{ marginTop: '16px', display: 'block', fontSize: '12px' }}
 >
 Cycle status
 </button>
 </div>
 );
}

export default UserStatusCard;