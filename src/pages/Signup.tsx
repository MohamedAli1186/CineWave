import { createToken } from "../services/tmdb";
import { createSessionAuth } from "../utils/auth";
const Signup = () => {
  const fetchSession = async () => {
    const res = await createToken();
    window.location.href = `https://www.themoviedb.org/authenticate/${res.request_token}?redirect_to=http://localhost:5173/signup`;
  };
  const requestToken = localStorage.getItem("request_token");

  return (
    <div className="p-container flex flex-col items-center justify-center gap-6 w-full py-40">
      <button
        className="btn"
        type="button"
        onClick={() => {
          fetchSession();
        }}
      >
        Create Request Token
      </button>
      <button
        type="button"
        className="btn"
        onClick={async () => {
          await createSessionAuth(requestToken!);
        }}
      >
        Create Session
      </button>
    </div>
  );
};

export default Signup;
