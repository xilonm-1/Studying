import React, { useState } from "react";

function InfoForm({ type }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        nationality: "Thai",
        disability: "No",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (type === "special") {
            alert(`Hello, ${formData.firstName} ${formData.lastName}
Nationality: ${formData.nationality}`);
        } else {
            alert(`Hello, ${formData.firstName} ${formData.lastName}
Age: ${formData.age}`);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                margin: "20px",
                padding: "10px",
            }}
        >
            <div>
                <label>First Name: </label>
                <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Last Name: </label>
                <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label>Age: </label>
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                />
            </div>

            {type === "special" && (
                <>
                    <div>
                        <label>Pick your nationality: </label>
                        <select
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleChange}
                        >
                            <option value="Thai">Thai</option>
                            <option value="Japanese">Japanese</option>
                            <option value="American">American</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label>Disability: </label>
                        <select
                            name="disability"
                            value={formData.disability}
                            onChange={handleChange}
                        >
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>
                </>
            )}

            <button type="submit">Submit</button>
        </form>
    );
}

export default InfoForm;
