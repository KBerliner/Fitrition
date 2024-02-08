import React from 'react';

export default function Home({ type }) {
    return (
        <>
            {
            type === 'fitness' ? <h1>FITNESS</h1> : <h1>NUTRITION</h1>
            }
        </>
    )
}