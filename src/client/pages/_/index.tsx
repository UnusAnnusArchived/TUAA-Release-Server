import { useRecoilState } from "recoil";
import { userAtom } from "../../src/atoms";

const Home = () => {
  const [currentUser, setCurrentUser] = useRecoilState(userAtom);

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <>
      {currentUser ? (
        <>
          <p>Email: {currentUser.model.email}</p>
          <a href="#" onClick={handleLogout}>
            logout
          </a>
        </>
      ) : (
        <>
          <a href="http://localhost:3000/external-login?redirectUrl=http://localhost:8876/_/login&imageUrl=/ua.png&appName=TUAA%20App%20Releases">
            login
          </a>
        </>
      )}
    </>
  );
};

export default Home;
