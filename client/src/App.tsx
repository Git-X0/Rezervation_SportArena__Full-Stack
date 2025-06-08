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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("http://localhost:3000/api/reservations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                date: form.date,
                userEmail: form.email,
                placeId: Number(form.placeId),
            }),
        });
        fetchReservations();
    };

    return `(
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
                <button type="submit">Rezervovat</button>
            </form>

            <ul>
                {reservations.map((r: any) => (
                    <li key={r.id}>
                        {r.date} - {r.userEmail}
                    </li>
                ))}
            </ul>
        </div>`
    );
}

export default App;
// Note: Ensure that the server is running on http://localhost:3000
// and that CORS is configured if needed for cross-origin requests.
