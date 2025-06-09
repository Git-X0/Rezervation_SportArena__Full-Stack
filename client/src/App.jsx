import React, { useState, useEffect } from "react";

function App() {
    const [reservations, setReservations] = useState([]);
    const [form, setForm] = useState({ date: "", email: "", placeId: 1 });

    const fetchReservations = async () => {
        const response = await fetch("http://localhost:3000/api/reservations");
        setReservations(await response.json());
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.date || !form.email) {
            alert("Vyplňte prosím všechna pole.");
            return;
        }

        const response = await fetch("http://localhost:3000/api/reservations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        if (response.ok) {
            setForm({ date: "", email: "", placeId: 1 });
            fetchReservations();
        } else {
            alert("Rezervace se nezdařila.");
        }
    };

    return (
        <div>
            <h1>Rezervace Sportovišť</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="datetime-local"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />
                <select
                    value={form.placeId}
                    onChange={(e) =>
                        setForm({ ...form, placeId: parseInt(e.target.value) })
                    }
                >
                    <option value="1">Tenisový kurt 1</option>
                    <option value="2">Fotbalové hřiště</option>
                </select>
                <button type="submit" onClick={handleSubmit}>
                    Rezervovat
                </button>
            </form>

            <ul>
                {reservations.map((r) => (
                    <li key={r.id}>
                        {r.date} - {r.userEmail}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
