import { Link } from "react-router-dom";
import "./Page404.css";
export const Page404 = () => {
  return (
    <div className="body-Page404">
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>404</h1>
            <h2>Page not found</h2>
          </div>
          <Link to="/">Home</Link>
          <Link to="/signIn">SignIn</Link>
        </div>
      </div>
    </div>
  );
};
