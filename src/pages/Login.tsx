const Login = () => {
  return (
    <div className="p-container flex flex-col items-center justify-center gap-6 w-full my-20">
      <h1 className="text-4xl font-bold">Welcome Back</h1>
      <input type="text" placeholder="Email" className="input w-1/2" />
      <input type="password" className="input w-1/2" placeholder="Password" />
      <button type="submit" className="pink-btn w-1/2">
        Log In
      </button>
    </div>
  );
};

export default Login;
