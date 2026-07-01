import React, { useState } from 'react';
import { ChevronDown, Plus, Search, Filter, Clock, CheckCircle, AlertCircle, MessageSquare, User, Calendar, Tag } from 'lucide-react';

export default function SupportTicketSystem() {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [tickets, setTickets] = useState([
    {
      id: 'TKT-001',
      title: 'Login page not loading',
      description: 'Users are experiencing timeout errors when trying to access the login page on mobile devices',
      status: 'open',
      priority: 'high',
      customer: 'Raju Sharma',
      email: 'raju.sharma@acme.com',
      created: '2026-07-01',
      updated: '2026-07-01',
      assignee: 'Sarah Chen',
      category: 'Bug',
      replies: 5
    },
    {
      id: 'TKT-002',
      title: 'Feature request: Dark mode',
      description: 'Users have requested a dark mode theme for the application',
      status: 'in-progress',
      priority: 'medium',
      customer: 'Priya Deshmukh',
      email: 'priya.deshmukh2233@techcorp.com',
      created: '2026-06-27',
      updated: '2026-06-29',
      assignee: 'Mike Johnson',
      category: 'Feature',
      replies: 3
    },
    {
      id: 'TKT-003',
      title: 'Database connection issue',
      description: 'Intermittent connection drops to production database causing service interruptions',
      status: 'open',
      priority: 'critical',
      customer: 'Sneha Kulkarni',
      email: 'sneha.kulkarni3344@enterprise.io',
      created: '2026-06-29',
      updated: '2026-06-29',
      assignee: 'David Lee',
      category: 'Infrastructure',
      replies: 8
    },
    {
      id: 'TKT-004',
      title: 'Payment processing delayed',
      description: 'Payments are taking longer than usual to process',
      status: 'resolved',
      priority: 'high',
      customer: 'Neha Gupta',
      email: 'neha.gupta@retail.com',
      created: '2026-06-25',
      updated: '2026-06-28',
      assignee: 'Sarah Chen',
      category: 'Payment',
      replies: 4
    },
    {
      id: 'TKT-005',
      title: 'Export to CSV not working',
      description: 'The export feature is generating corrupted CSV files',
      status: 'in-progress',
      priority: 'medium',
      customer: 'Ananya Nair',
      email: 'ananya.nair@analytics.co',
      created: '2026-06-26',
      updated: '2026-06-29',
      assignee: 'Mike Johnson',
      category: 'Bug',
      replies: 2
    },
    {
      id: 'TKT-006',
      title: 'API documentation update needed',
      description: 'Documentation for v2.0 API endpoints is incomplete',
      status: 'open',
      priority: 'low',
      customer: 'Pooja Mehta',
      email: 'pooja.mehta212@devteam.io',
      created: '2026-06-24',
      updated: '2026-06-27',
      assignee: 'Sarah Chen',
      category: 'Documentation',
      replies: 1
    }
  ]);

  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'Bug'
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'open': return 'bg-red-100 text-red-800 border-red-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'open': return <AlertCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length
  };

  const handleCreateTicket = () => {
    if (newTicket.title.trim()) {
      const ticket = {
        id: `TKT-${String(tickets.length + 1).padStart(3, '0')}`,
        title: newTicket.title,
        description: newTicket.description,
        status: 'open',
        priority: newTicket.priority,
        category: newTicket.category,
        customer: 'New Customer',
        email: 'customer@example.com',
        created: new Date().toISOString().split('T')[0],
        updated: new Date().toISOString().split('T')[0],
        assignee: 'Unassigned',
        replies: 0
      };
      setTickets([ticket, ...tickets]);
      setNewTicket({ title: '', description: '', priority: 'medium', category: 'Bug' });
      setActiveView('list');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 shadow-xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            TicketHub
          </h1>
          <p className="text-xs text-gray-400 mt-1">Support Management System</p>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${
              activeView === 'dashboard' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-gray-300 hover:bg-slate-700'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveView('list')}
            className={`w-full text-left px-4 py-2.5 rounded-lg transition-all ${
              activeView === 'list' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-gray-300 hover:bg-slate-700'
            }`}
          >
            All Tickets
          </button>
          <button
            onClick={() => setActiveView('create')}
            className={`w-full text-left px-4 py-2.5 rounded-lg transition-all flex items-center gap-2 ${
              activeView === 'create' 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-gray-300 hover:bg-slate-700'
            }`}
          >
            <Plus className="w-4 h-4" /> New Ticket
          </button>
        </nav>

        <div className="mt-8 pt-6 border-t border-slate-700">
          <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">Team Members</h3>
          <div className="space-y-2">
            {['Sarah Chen', 'Mike Johnson', 'David Lee'].map((name) => (
              <div key={name} className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6 shadow-sm">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-1">
              {activeView === 'dashboard' && 'Dashboard'}
              {activeView === 'list' && 'All Tickets'}
              {activeView === 'create' && 'Create New Ticket'}
              {activeView === 'detail' && selectedTicket?.id}
            </h2>
            <p className="text-gray-600">Manage and track customer support requests</p>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 max-w-7xl mx-auto">
          
          {/* Dashboard View */}
          {activeView === 'dashboard' && (
            <div>
              {/* Stats Cards */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Tickets</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <Tag className="w-10 h-10 text-gray-300" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Open</p>
                      <p className="text-3xl font-bold text-red-600">{stats.open}</p>
                    </div>
                    <AlertCircle className="w-10 h-10 text-red-300" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">In Progress</p>
                      <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
                    </div>
                    <Clock className="w-10 h-10 text-blue-300" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Resolved</p>
                      <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
                    </div>
                    <CheckCircle className="w-10 h-10 text-green-300" />
                  </div>
                </div>
              </div>

              {/* Recent Tickets */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {tickets.slice(0, 3).map((ticket) => (
                    <div
                      key={ticket.id}
                      onClick={() => {
                        setSelectedTicket(ticket);
                        setActiveView('detail');
                      }}
                      className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-sm font-semibold text-blue-600">{ticket.id}</span>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getStatusColor(ticket.status)}`}>
                              {ticket.status}
                            </span>
                          </div>
                          <p className="text-gray-900 font-medium mt-2">{ticket.title}</p>
                          <p className="text-gray-600 text-sm mt-1">{ticket.description.substring(0, 60)}...</p>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs font-semibold px-2 py-1 rounded ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* List View */}
          {activeView === 'list' && (
            <div>
              {/* Filters and Search */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search tickets by ID or title..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-600" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Tickets Table */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Priority</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Assignee</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Updated</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredTickets.map((ticket) => (
                        <tr
                          key={ticket.id}
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setActiveView('detail');
                          }}
                          className="hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <td className="px-6 py-4 text-sm font-mono font-semibold text-blue-600">{ticket.id}</td>
                          <td className="px-6 py-4 text-sm text-gray-900 font-medium">{ticket.title}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{ticket.customer}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusColor(ticket.status)}`}>
                              {getStatusIcon(ticket.status)}
                              {ticket.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-xs font-semibold px-2 py-1 rounded ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{ticket.assignee}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{ticket.updated}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Create Ticket View */}
          {activeView === 'create' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-2xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Create New Support Ticket</h3>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={newTicket.title}
                    onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                    placeholder="Brief description of the issue"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                    placeholder="Provide detailed information about the issue"
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      value={newTicket.priority}
                      onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={newTicket.category}
                      onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Bug">Bug</option>
                      <option value="Feature">Feature Request</option>
                      <option value="Documentation">Documentation</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Payment">Payment</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleCreateTicket}
                    className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Ticket
                  </button>
                  <button
                    onClick={() => setActiveView('list')}
                    className="px-6 py-2.5 bg-gray-200 text-gray-900 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Detail View */}
          {activeView === 'detail' && selectedTicket && (
            <div className="grid grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="col-span-2">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-sm font-mono text-blue-600">{selectedTicket.id}</span>
                      <h1 className="text-2xl font-bold text-gray-900 mt-2">{selectedTicket.title}</h1>
                    </div>
                    <button
                      onClick={() => setActiveView('list')}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex gap-3 mb-6">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border ${getStatusColor(selectedTicket.status)}`}>
                      {getStatusIcon(selectedTicket.status)}
                      {selectedTicket.status}
                    </span>
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded ${getPriorityColor(selectedTicket.priority)}`}>
                      {selectedTicket.priority}
                    </span>
                    <span className="text-xs font-semibold px-3 py-1.5 rounded bg-purple-50 text-purple-700">
                      {selectedTicket.category}
                    </span>
                  </div>

                  <div className="prose prose-sm max-w-none mb-8">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
                    <p className="text-gray-600">{selectedTicket.description}</p>
                  </div>

                  {/* Comments Section */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Comments ({selectedTicket.replies})</h3>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <textarea
                        placeholder="Add a comment..."
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xs font-semibold text-gray-700 uppercase mb-4">Customer</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-600">Name</p>
                      <p className="font-semibold text-gray-900">{selectedTicket.customer}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900 break-all text-sm">{selectedTicket.email}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xs font-semibold text-gray-700 uppercase mb-4">Assignment</h3>
                  <div>
                    <p className="text-xs text-gray-600 mb-2">Assigned To</p>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>{selectedTicket.assignee}</option>
                      <option>Sarah Chen</option>
                      <option>Mike Johnson</option>
                      <option>David Lee</option>
                    </select>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-xs font-semibold text-gray-700 uppercase mb-4">Timeline</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-xs text-gray-600">Created</p>
                      <p className="font-semibold text-gray-900">{selectedTicket.created}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Last Updated</p>
                      <p className="font-semibold text-gray-900">{selectedTicket.updated}</p>
                    </div>
                  </div>
                </div>

                <select className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                  <option value="">Update Status</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}