import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div className="error-outlay">
      <div className="error-page">
        <h3>404</h3>
        <p>Oops! Page not found</p>
        <small>It look like you may have taken wrong turn. Don't worry...it happens to most of us.</small>
        <div className="m-3">
          <Link to='/'><button className="btn btn-primary btn-sm">GO HOMEPAGE</button></Link>
        </div>
      </div>
    </div>
  )
}
