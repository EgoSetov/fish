import { useState } from 'react';

const Form = ({title, handleClick}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return (
        <div>
            <p><input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
            /></p>
            <p><input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="password"
            /></p>
            <p><button
                onClick={() => handleClick(email, pass)}
            >
                {title}
            </button></p>
        </div>
    )
}

export {Form}