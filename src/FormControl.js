import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function FormControl(props) {
    const [data, setData] = useState([]);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [option, setOption] = useState("");

    // getting data from JSONPLACEHOLDER API
    const getData = async () => {
        try {
            const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users`);
            setData(data);
        }
        catch (error) {
            console.log(error);
        }

    };




    console.log("data is", data);

    // Submit event with post request

    const handleSubmit = async (title, body, option) => {
        try {
            await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title: title,
                    body: body,
                    userId: option,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })

                .then((response) => response.json())
                .then((json) => console.log(json));



        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <div className='main'>
            <form onSubmit={handleSubmit(title, body, option)}>

                <label htmlFor="name">UserName</label>
                <select name="name" id="name" value={option} onChange={(e) => setOption(e.target.value)} required>

                    {data && data.map((item) => {
                        return (

                            <option value={item.id}>{item.name}</option>


                        );
                    })}
                </select>
                <label htmlFor="title">Title</label> <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <label htmlFor="body">Body</label> <input type="text" id="body" value={body} onChange={(e) => setBody(e.target.value)} required />
            </form>
            <button type="submit" className="btn">SUBMIT</button>

        </div>
    );
}

export default FormControl;
