import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userAuthService } from '../../utils/auth';
import Paper from '../../assets/PaperIcon';
import GreenCheckIcon from '../../assets/GreenCheckIcon';
import TimerIcon from '../../assets/TimerIcon';
import Footer from '../../components/Footer';

interface DashboardStats {
  totalTickets: number;
  openTickets: number;
  inProgress: number;
  closedTickets: number;
}
const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(userAuthService.getCurrentUser());
  const [ticketStats, setTicketStats] = useState<DashboardStats>({
    totalTickets: 0,
    openTickets: 0,
    inProgress: 0,
    closedTickets: 0,
  });

  useEffect(() => {
    const ticketsInStr = localStorage.getItem('ticketapp_tickets');
    const tickets = ticketsInStr ? JSON.parse(ticketsInStr) : [];

    const calculatedStats = {
      totalTickets: tickets.length,
      openTickets: tickets.filter((ticket: any) => ticket.status === 'open')
        .length,
      inProgress: tickets.filter(
        (ticket: any) => ticket.status === 'in-progress'
      ).length,
      closedTickets: tickets.filter((ticket: any) => ticket.status === 'closed')
        .length,
    };

    setTicketStats(calculatedStats);
  }, []);

  const handleUserLogout = () => {
    userAuthService.logoutUser();
    navigate('/');
  };

  return (
    <section className="min-h-screen bg-gray-200">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <section className="flex justify-between items-center">
            <section>
              <h1 className="text-2xl font-bold text-gray-900">TrackDesk</h1>
              <p className="text-sm text-gray-600">
                Welcome back, {user?.name}
              </p>
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

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Dashboard
          </h2>
          <p className="text-gray-600">Tickets Overview</p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Tickets */}
          <section className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-indigo-500">
            <section className="flex items-center justify-between">
              <section>
                <p className="text-sm font-medium text-gray-600 uppercase">
                  Total Tickets
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {ticketStats.totalTickets}
                </p>
              </section>
              <section className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <Paper />
              </section>
            </section>
          </section>

          {/* Tickets In Open  */}
          <section className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <section className="flex items-center justify-between">
              <section>
                <p className="text-sm font-medium text-gray-600 uppercase">
                  Open Tickets
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {ticketStats.openTickets}
                </p>
              </section>
              <section className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <GreenCheckIcon />
              </section>
            </section>
          </section>

          {/* Tickets In Progress  */}
          <section className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-amber-500">
            <section className="flex items-center justify-between">
              <section>
                <p className="text-sm font-medium text-gray-600 uppercase">
                  Tickets In Progress
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {ticketStats.inProgress}
                </p>
              </section>
              <section className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <TimerIcon />
              </section>
            </section>
          </section>

          {/*  Tickets in Closed */}
          <section className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-gray-500">
            <section className="flex items-center justify-between">
              <section>
                <p className="text-sm font-medium text-gray-600 uppercase">
                  Closed Tickets
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {ticketStats.closedTickets}
                </p>
              </section>
              <section className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <GreenCheckIcon />
              </section>
            </section>
          </section>
        </section>

        {/* Quick Actions */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white mb-12">
          <section className="flex flex-col md:flex-row items-center justify-between">
            <section className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Keep Track of Tickets</h3>
              <p className="text-indigo-100">
                Create, view, edit, and organize all your tickets in one place
              </p>
            </section>
            <Link
              to="/tickets"
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition shadow-lg"
            >
              Go to Tickets
            </Link>
          </section>
        </section>
      </main>
      <Footer />
    </section>
  );
};

export default Dashboard;
