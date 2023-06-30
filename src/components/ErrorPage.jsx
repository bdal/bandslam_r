import { useRouteError } from "react-router-dom"

import React from 'react'

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
        <h1>Whoomp! There it is</h1>
        <p>Looks like something broke.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    )
}

export default ErrorPage