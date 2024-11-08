import { useState, useEffect, useRef } from 'react';
import app from "../firebaseConfig";
import { getDatabase, ref, get, set } from 'firebase/database';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const Write = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        education: "",
        dateOfBirth: "",
        gender: "",
        bloodGroup: "",
        photo: null,
        address: "",
        fatherName: "",
        mailId: "",
    });

    const { id } = useParams();
    console.log("param id", id);
    const navigate = useNavigate();
    const toastCalledRef = useRef(false);

    const handleViewData = () => {
        navigate('/');
    };

    // Fetch data from Firebase if ID exists
    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching data...");
            try {
                const db = getDatabase(app);
                const dbRef = ref(db, `person/details/${id}`);
                const snapshot = await get(dbRef);

                if (snapshot.exists()) {
                    console.log("Fetched data", snapshot.val());
                    setFormData(
                        snapshot.val(),
                    );
                    //   if (!toastCalledRef.current) {
                    //     toast.success('Data fetched successfully!', { position: 'top-right' });
                    //     toastCalledRef.current = true;
                    //   }
                } else {
                    setFormData({
                        firstName: "",
                        lastName: "",
                        education: "",
                        dateOfBirth: "",
                        gender: "",
                        bloodGroup: "",
                        photo: null,
                        address: "",
                        fatherName: "",
                        mailId: "",
                    });
                    if (!toastCalledRef.current) {
                        toast.error('No data available', { position: 'top-right' });
                        toastCalledRef.current = true;
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                if (!toastCalledRef.current) {
                    toast.error('Data fetching failed', { position: 'top-right' });
                    toastCalledRef.current = true;
                }
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files[0] || null,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { firstName, lastName, education, dateOfBirth, gender, bloodGroup, photo, address, fatherName, mailId } = formData;

        // Validate required fields
        if (!firstName || !lastName || !education || !dateOfBirth || !gender || !bloodGroup || !address || !fatherName || !mailId) {
            toast.error('Please fill in all fields', { position: "top-right" });
            return;
        }

        // Check if date of birth is in the future
        const today = new Date().toISOString().split('T')[0];
        if (dateOfBirth > today) {
            toast.error('Date of birth cannot be in the future', { position: "top-right" });
            return;
        }

        const db = getDatabase(app);
        const newDocRef = ref(db, `person/details/${id}`);

        // Mock photo URL for demonstration (if using Firebase Storage, replace this with the actual upload logic)
        const photoURL = photo ? URL.createObjectURL(photo) : "";

        // Save data to Firebase
        await set(newDocRef, {
            firstName,
            lastName,
            education,
            dateOfBirth,
            gender,
            bloodGroup,
            photoURL,
            address,
            fatherName,
            mailId,
        }).then(() => {
            // Reset form after successful submission
            setFormData({
                firstName: "",
                lastName: "",
                education: "",
                dateOfBirth: "",
                gender: "",
                bloodGroup: "",
                photo: null,
                address: "",
                fatherName: "",
                mailId: "",
            });
            toast.success('Data Updated successfully!', { position: "top-right" });
            navigate('/read');
        }).catch((error) => {
            console.error('Error writing data:', error);
            toast.error('Failed to save data', { position: "top-right" });
        });
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card p-3" style={{ width: '100%', maxWidth: '500px' }}>
                <div className="d-flex justify-content align-items-center mb-4">

                    <h2 className="mb-1 mx-5">Enter Details</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Education"
                            name="education"
                            value={formData.education}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="date"
                            className="form-control"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            max={new Date().toISOString().split('T')[0]}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <select
                            className="form-control"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group mb-3">
                        <select
                            className="form-control"
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                        >
                            <option value="">Select Blood Group</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="bombay+">bombay</option>
                        </select>
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="file"
                            className="form-control"
                            name="photo"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Father's Name"
                            name="fatherName"
                            value={formData.fatherName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email ID"
                            name="mailId"
                            value={formData.mailId}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Write;
