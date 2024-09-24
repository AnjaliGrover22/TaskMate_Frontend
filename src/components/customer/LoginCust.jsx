import { Link } from "react-router-dom";
import { useState } from "react";
import coverImage from "../../assets/images/cust_signup_cover.png";

const LoginCust = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("I am inside Login page", setUser);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "https://backend-taskmate.onrender.com/customer/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      setIsLoading(false);
      setError(data.error);
    }
    if (response.ok) {
      data.user = "customer";
      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
      setUser(data);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen relative">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Cover Image */}
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[rgba(14,14,14,0.6)]" />

        {/* Form Section */}
        <div
          className="absolute right-40 top-1/2 w-[582px] h-[508px] rounded-[30px] p-8 z-10 translate-y-[-50%] flex flex-col justify-center items-center"
          style={{ backgroundColor: "rgba(183, 186, 191, 0.6)" }}
        >
          {/* Form Container */}
          <div className="w-full max-w-md space-y-6">
            <div className="flex justify-center">
              <h2 className="text-3xl font-bold text-primary font-primary mt-6">
                TasK<span className="text-secondary">Mate</span>
              </h2>
            </div>
            <h2 className="text-3xl font-semibold text-white font-primary p-1">
              Login
            </h2>

            {/* Login Form */}
            <div className="flex justify-center max-w-full">
              <form onSubmit={submitHandler} className="space-y-4 w-full">
                <div>
                  <label className="font-primary text-primary block">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    style={{ backgroundColor: "rgba(39, 51, 67, 0.6)" }}
                    className="w-full px-4 py-2 border text-white font-secondary border-secondary rounded-3xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-primary font-primary">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ backgroundColor: "rgba(39, 51, 67, 0.6)" }}
                    className="w-full px-4 py-2 border text-white font-secondary border-secondary rounded-3xl focus:outline-none"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-30 text-white font-primary py-2 px-4 rounded-3xl bg-primary hover:bg-secondary"
                  >
                    Login
                  </button>
                </div>
                {/* Error Message */}
                {error && (
                  <div className="text-red-500 bg-secondary border border-red-500 font-primary rounded-3xl px-4 py-2 mt-2 text-center">
                    {error}
                  </div>
                )}
              </form>
            </div>

            <p className="text-sm text-white font-primary text-center">
              Don’t have an account?{" "}
              <Link to="/signupCust" className="text-white">
                <span className="text-secondary">Signup</span> here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCust;
