import { useEffect, useState } from "react";
import { createSession, createToken } from "../services/tmdb";

const Signup = () => {
  const [requestToken, setRequestToken] = useState<string>("");
  useEffect(() => {
    const fetchSession = async () => {
      const res = await createToken();
      setRequestToken(res.request_token);
    };
    fetchSession();
  }, []);

  return (
    <div className="p-container flex flex-col items-center justify-center gap-6 w-full my-20">
      <a
        className="btn"
        href={`https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:5173/signup`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Create Request Token
      </a>
      <button
        type="button"
        className="btn"
        onClick={async () => {
          const res = await createSession(requestToken);
          console.log(res);
        }}
      >
        Create Session
      </button>
    </div>
  );
};

export default Signup;
