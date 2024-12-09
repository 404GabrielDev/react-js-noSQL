import { useState } from "react";

const Auth = () => {

    let mybackendUrl = 'http://localhost:8002'


    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleOnSubmit = async (e) => {

        e.preventDefault();
        let result = await fetch(`${mybackendUrl}/register`, {
            method: "post",
            body: JSON.stringify({password, email}),
            headers: {
                'content-Type': 'application/json'
            }
        })
        
        result = await result.json();
        console.warn(result);
        if (result) {
            alert("Data saved succesfully");
            setEmail("");
            setPassword("");
        }

        
    }   
    

return (
    <>
    <h1>This is react Webapp</h1>
    <form action="">

    <input type="email" placeholder="email"
    value={email} onChange={(e) => setEmail(e.target.value)} />

<input type="password" placeholder="senha"
    value={password} onChange={(e) => setPassword(e.target.value)} />

    <button type="submit" onClick={handleOnSubmit}>Enviar</button>
    </form>
    </>
)

}

export default Auth;