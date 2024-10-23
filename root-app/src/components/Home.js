import { Link } from 'react-router-dom';
import './Home.css'; // Assuming you have a CSS file named Home.css

export default function Home() {
  return (
    <div className="home-container"> {/* Added wrapper div with class */}
      <h1>Home Page</h1>
      <h5>An SQL query validator is a tool or functionality within a software application that checks SQL queries for correctness before they are executed against a database.</h5>
      <div className="links-container"> {/* Adjusted for better styling */}
        <Link to="/signup" className="home-link">Sign Up</Link> {/* Use className for styling */}
        <Link to="/Login" className="home-link">Login</Link>
      </div>
    </div>
  );
}