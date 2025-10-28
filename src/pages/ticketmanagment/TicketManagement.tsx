import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userAuthService } from '../../utils/auth';
import Footer from '../../components/Footer';
import AdditionIcon from '../../assets/AdditionIcon';
import GrayPaperIcon from '../../assets/GrayPaperIcon';

interface TicketDTO {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'closed';
  createdAt: string;
}

const TicketManagement = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<TicketDTO[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editTicket, setEditTicket] = useState<TicketDTO | null>(null);
  const [ticketForm, setTicketForm] = useState({
    title: '',
    description: '',
    status: 'open' as 'open' | 'in-progress' | 'closed',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isDeleted, setIsDeleted] = useState<string | null>(null);

  useEffect(() => {
    fetchUserTickets();
  }, []);

  const fetchUserTickets = () => {
    const ticketsInString = localStorage.getItem('ticketapp_tickets');
    const fetchedTickets = ticketsInString ? JSON.parse(ticketsInString) : [];
    setTickets(fetchedTickets);
  };

  const handleSavedTickets = (updatedTickets: TicketDTO[]) => {
    localStorage.setItem('ticketapp_tickets', JSON.stringify(updatedTickets));
    setTickets(updatedTickets);
  };

  const handleFormValidation = () => {
    const newErrors: Record<string, string> = {};

    if (!ticketForm.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!ticketForm.status) {
      newErrors.status = 'Status is required';
    }

    if (!['open', 'in-progress', 'closed'].includes(ticketForm.status)) {
      newErrors.status = 'Ticket status must be open, in-progress, or closed';
    }
    if (ticketForm.description && ticketForm.description.length > 500) {
      newErrors.description =
        'Ticket description should not be more than 500 words';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleFormValidation()) return;

    if (editTicket) {
      const updatedTickets = tickets.map((ticket) =>
        ticket.id === editTicket.id ? { ...ticket, ...ticketForm } : ticket
      );
      handleSavedTickets(updatedTickets);
      showSuccess('Ticket updated successfully');
    } else {
      const newTicket: TicketDTO = {
        id: Date.now().toString(),
        ...ticketForm,
        createdAt: new Date().toISOString(),
      };
      handleSavedTickets([...tickets, newTicket]);
      showSuccess('Ticket created successfully');
    }
    closeModal();
  };

  const EditFormHandler = (ticket: TicketDTO) => {
    setEditTicket(ticket);
    setTicketForm({
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
    });
    setIsModalOpen(true);
  };

  const handleDeleteTicket = (id: string) => {
    const updatedTickets = tickets.filter((ticket: any) => ticket.id !== id);
    handleSavedTickets(updatedTickets);
    setIsDeleted(null);
    showSuccess('Ticket deleted successfully');
  };

  const openModal = () => {
    setEditTicket(null);
    setTicketForm({
      title: '',
      description: '',
      status: 'open',
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditTicket(null);
    setTicketForm({
      title: '',
      description: '',
      status: 'open',
    });
    setErrors({});
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleUserLogout = () => {
    userAuthService.logoutUser();
    navigate('/');
  };

  const getTicketStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="min-h-screen bg-gray-200">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <section className="flex justify-between items-center">
            <section className="flex items-center gap-6">
              <h1 className="text-2xl font-bold text-gray-900">TrackDesk</h1>
              <nav className="flex flex-col md:flex md:flex-row gap-4">
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  Dashboard
                </Link>
                <Link to="/tickets" className="text-indigo-600 font-semibold">
                  Tickets
                </Link>
              </nav>

              {successMessage && (
                <section className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in">
                  {successMessage}
                </section>
              )}
            </section>
            <button
              onClick={handleUserLogout}
              className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Logout
            </button>
          </section>
        </section>
      </header>

      {successMessage && (
        <section className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in">
          {successMessage}
        </section>
      )}

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <section>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Ticket Management
            </h2>
            <p className="text-gray-600">
              Create, view, edit, and manage all your tickets
            </p>
          </section>
          <button
            onClick={openModal}
            className="mt-4 md:mt-0 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg flex items-center gap-2"
          >
            <AdditionIcon />
            Create New Ticket
          </button>
        </section>

        {tickets.length === 0 ? (
          <section className="bg-white rounded-lg shadow-lg p-12 text-center">
            <GrayPaperIcon />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No tickets yet
            </h3>
            <p className="text-gray-600 mb-6">
              Get started by creating your first ticket
            </p>
            <button
              onClick={openModal}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Create Ticket
            </button>
          </section>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <section
                key={ticket.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-6"
              >
                <section className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex-1 mr-2">
                    {ticket.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getTicketStatusColor(
                      ticket.status
                    )}`}
                  >
                    {ticket.status.replace('_', ' ')}
                  </span>
                </section>

                {ticket.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {ticket.description}
                  </p>
                )}

                <section className="flex gap-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => EditFormHandler(ticket)}
                    className="flex-1 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium hover:bg-indigo-100 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setIsDeleted(ticket.id)}
                    className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </section>

                {/* Delete Confirmation */}
                {isDeleted === ticket.id && (
                  <section className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800 mb-3">
                      Are you sure you want to delete this ticket?
                    </p>
                    <section className="flex gap-2">
                      <button
                        onClick={() => handleDeleteTicket(ticket.id)}
                        className="flex-1 px-3 py-2 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700 transition"
                      >
                        Yes, Delete
                      </button>
                      <button
                        onClick={() => setIsDeleted(null)}
                        className="flex-1 px-3 py-2 bg-gray-200 text-gray-800 rounded text-sm font-medium hover:bg-gray-300 transition"
                      >
                        Cancel
                      </button>
                    </section>
                  </section>
                )}
              </section>
            ))}
          </section>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editTicket ? 'Edit Ticket' : 'Create New Ticket'}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmitForm} className="space-y-5">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="title"
                      type="text"
                      value={ticketForm.title}
                      onChange={(e) => {
                        setTicketForm({ ...ticketForm, title: e.target.value });
                        setErrors({ ...errors, title: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.title ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-indigo-500 focus:outline-none transition`}
                      placeholder="Enter ticket title"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      value={ticketForm.description}
                      onChange={(e) => {
                        setTicketForm({
                          ...ticketForm,
                          description: e.target.value,
                        });
                        setErrors({ ...errors, description: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.description
                          ? 'border-red-500'
                          : 'border-gray-300'
                      } focus:ring-2 focus:ring-indigo-500 focus:outline-none transition`}
                      placeholder="Enter ticket description (optional)"
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="status"
                      value={ticketForm.status}
                      onChange={(e) => {
                        setTicketForm({
                          ...ticketForm,
                          status: e.target.value as any,
                        });
                        setErrors({ ...errors, status: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.status ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-indigo-500 focus:outline-none transition`}
                    >
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="closed">Closed</option>
                    </select>
                    {errors.status && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.status}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                    >
                      {editTicket ? 'Update Ticket' : 'Create Ticket'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </main>
    </section>
  );
};

export default TicketManagement;
