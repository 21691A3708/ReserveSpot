import React from "react";
import { Link } from "react-router-dom";
export default function PageNotFound() {
  return (
    <div>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <p>Please check the URL or return to the homepage.</p>
      <Link to="/mhome">Return to home</Link>
    </div>
  );
}
