import React, { useState } from 'react';
import { Megaphone, Pin, Trash2, Clock, Plus, AlertTriangle } from 'lucide-react';

export default function NoticeBoard() {
  const [notices, setNotices] = useState([
    { id: 1, title: "Water Tank Cleaning", content: "Water supply will be suspended on Sunday from 10 AM to 2 PM.", date: "Jan 07, 2026", category: "Urgent" },
    { id: 2, title: "Republic Day Celebration", content: "Flag hoisting at 8:30 AM followed by breakfast in the clubhouse.", date: "Jan 20, 2026", category: "Event" }
  ]);

  const [newNotice, setNewNotice] = useState({ title: '', content: '', category: 'General' });

  const handlePost = (e) => {
    e.preventDefault();
    const entry = {
      id: Date.now(),
      ...newNotice,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setNotices([entry, ...notices]);
    setNewNotice({ title: '', content: '', category: 'General' });
  };

  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Notice Board</h4>
          <p className="text-secondary small">Broadcast announcements to all residents</p>
        </div>
      </div>

      <div className="row g-4">
        {/* Post New Notice Form */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 rounded-4 sticky-top" style={{ top: '100px' }}>
            <h5 className="fw-bold mb-3">Create Announcement</h5>
            <form onSubmit={handlePost}>
              <div className="mb-3">
                <label className="small fw-bold text-secondary">Title</label>
                <input type="text" className="form-control border-0 bg-light py-2" placeholder="e.g. Lift Maintenance" 
                  value={newNotice.title} onChange={e => setNewNotice({...newNotice, title: e.target.value})} required />
              </div>
              <div className="mb-3">
                <label className="small fw-bold text-secondary">Category</label>
                <select className="form-select border-0 bg-light" value={newNotice.category} onChange={e => setNewNotice({...newNotice, category: e.target.value})}>
                  <option>General</option>
                  <option>Urgent</option>
                  <option>Event</option>
                  <option>Maintenance</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="small fw-bold text-secondary">Message</label>
                <textarea className="form-control border-0 bg-light" rows="4" placeholder="Write details here..."
                  value={newNotice.content} onChange={e => setNewNotice({...newNotice, content: e.target.value})} required></textarea>
              </div>
              <button className="btn text-white w-100 py-2 fw-bold" style={{ backgroundColor: '#2a9d8f', borderRadius: '10px' }}>
                <Plus size={18} /> Post Notice
              </button>
            </form>
          </div>
        </div>

        {/* Active Notices List */}
        <div className="col-lg-8">
          <div className="d-flex flex-column gap-3">
            {notices.map(notice => (
              <div key={notice.id} className="card border-0 shadow-sm p-4 rounded-4 position-relative overflow-hidden">
                {notice.category === 'Urgent' && <div className="position-absolute top-0 start-0 h-100 bg-danger" style={{ width: '4px' }}></div>}
                
                <div className="d-flex justify-content-between align-items-start">
                  <div className="d-flex gap-3">
                    <div className={`p-2 rounded-3 ${notice.category === 'Urgent' ? 'bg-danger bg-opacity-10 text-danger' : 'bg-light text-teal'}`} style={{ height: 'fit-content' }}>
                      {notice.category === 'Urgent' ? <AlertTriangle size={20} /> : <Megaphone size={20} style={{ color: '#2a9d8f' }} />}
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <h6 className="fw-bold mb-0">{notice.title}</h6>
                        <span className="badge rounded-pill bg-light text-secondary border fw-normal" style={{ fontSize: '10px' }}>{notice.category}</span>
                      </div>
                      <p className="text-secondary small mb-3">{notice.content}</p>
                      <div className="d-flex align-items-center gap-2 text-muted small">
                        <Clock size={14} /> <span>Posted on {notice.date}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setNotices(notices.filter(n => n.id !== notice.id))} className="btn btn-link text-danger p-0 border-0 shadow-none">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}