import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ backendUrl, setToken, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${backendUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.msg || "Login failed.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setToken(data.token);
      setUser(data.user);

      switch (data.user.role) {
        case "system_administrator":
          navigate("/admin/dashboard");
          break;
        case "store_owner":
          navigate("/store/dashboard");
          break;
        case "normal_user":
          navigate("/user/dashboard");
          break;
        default:
          navigate("/login");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-gray-50">
      <div className="card w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8 flex flex-col md:flex-row">
        
      
        <div className="hidden md:flex md:w-1/2 justify-center items-center">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            alt="Login Illustration"
            className="w-3/4"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
      
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>

      
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="checkbox checkbox-sm" />
                Remember me
              </label>
              <a href="#!" className="text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className={`btn w-full ${
                loading ? "bg-gray-400 cursor-not-allowed" : "btn-primary"
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign In"}
            </button>

            {error && (
              <p className="text-red-500 text-center mt-2">{error}</p>
            )}

            <div className="divider">OR</div>

            <button
              type="button"
              className="btn btn-outline w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Continue with Facebook
            </button>
            <button
              type="button"
              className="btn btn-outline w-full bg-sky-500 text-white hover:bg-sky-600"
            >
              Continue with Twitter
            </button>
          </form>

     
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

