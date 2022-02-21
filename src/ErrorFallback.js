import * as React from 'react'

export default function ErrorFallback({error}) {
    console.log(error);
        return (
            <div role="alert" style={{textAlign: 'center', color: '#ff0033'}}>
            <h3>An error occurred:</h3>
            <pre><h5>{error.message}</h5></pre><br/>
            </div>
        )
}
