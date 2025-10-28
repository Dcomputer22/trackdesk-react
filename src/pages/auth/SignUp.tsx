import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { userAuthService } from '../../utils/auth';

const Signup = () => {
  const navigate = useNavigate();
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!ticketForm.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!ticketForm.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(ticketForm.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!ticketForm.password) {
      newErrors.password = 'Password is required';
    } else if (ticketForm.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!ticketForm.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (ticketForm.password !== ticketForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitForm = (e: any) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      const result = userAuthService.signupNewUser(
        ticketForm.name,
        ticketForm.email,
        ticketForm.password
      );

      if (result.success) {
        console.log('Signup successful!');
        navigate('/dashboard');
      } else {
        setErrors({ general: result.error || 'Signup failed' });
      }

      setIsLoading(false);
    }, 500);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 px-4 py-12">
      <section className="max-w-md w-full">
        <section className="bg-white rounded-2xl shadow-2xl p-8">
          <section className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">Become a member of trackDesk today</p>
          </section>

          {errors.general && (
            <section className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errors.general}</p>
            </section>
          )}

          <form onSubmit={handleSubmitForm} className="space-y-5">
            <section>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={ticketForm.name}
                onChange={(e) => {
                  setTicketForm({ ...ticketForm, name: e.target.value });
                  setErrors({ ...errors, name: '' });
                }}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </section>

            <section>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={ticketForm.email}
                onChange={(e) => {
                  setTicketForm({ ...ticketForm, email: e.target.value });
                  setErrors({ ...errors, email: '' });
                }}
                className={`w-full px-4 py-3 rounded-lg border transition`}
                placeholder="joe@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </section>

            <section>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={ticketForm.password}
                onChange={(e) => {
                  setTicketForm({ ...ticketForm, password: e.target.value });
                  setErrors({ ...errors, password: '' });
                }}
                className={`w-full px-4 py-3 rounded-lg border transition`}
                placeholder="******"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </section>

            <section>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={ticketForm.confirmPassword}
                onChange={(e) => {
                  setTicketForm({
                    ...ticketForm,
                    confirmPassword: e.target.value,
                  });
                  setErrors({ ...errors, confirmPassword: '' });
                }}
                className={`w-full px-4 py-3 rounded-lg border transition`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </section>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?
            <Link
              to="/auth/login"
              className="text-purple-600 font-semibold hover:text-purple-700"
            >
              Sign in
            </Link>
          </p>
        </section>

        <section className="text-center mt-6">
          <Link
            to="/"
            className="text-white hover:text-purple-100 transition text-sm"
          >
            Back to Home
          </Link>
        </section>
      </section>
    </section>
  );
};

export default Signup;
