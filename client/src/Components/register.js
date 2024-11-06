import {useNavigate} from "react-router-dom";
import {useState} from "react";
import AuthUser from "./AuthUser";

export default function Register(){

    const navigate = useNavigate();
    const {http} = AuthUser();
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password, setPassword] = useState();

    const submitForm = () => {
        http.post('/register',{name:name,email:email,password:password}).then((res) => {
            navigate('/');
        })
    }

    return(
        <div>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" className="form-control" onChange={e=>setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name="email" className="form-control" onChange={e=>setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" password="password" className="form-control" onChange={e=>setPassword(e.target.value)} />
                </div>
                <button type="button" onClick={submitForm} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}