// import React, { useState, useEffect } from 'react';
// import axios from 'axios';  // Make sure to install axios if not already done
// import './StaffPage.css';

// function StaffPage() {
//   const [staffList, setStaffList] = useState([]); // State to hold staff data
//   const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
//   const [newStaff, setNewStaff] = useState({
//     name: '',
//     phone: '',
//     work: ''
//   }); // State to manage new staff details

//   // Function to fetch staff data from the database
//   useEffect(() => {
//     axios.get('/api/staff') // Replace with your actual API endpoint
//       .then(response => setStaffList(response.data))
//       .catch(error => console.log(error));
//   }, []);

//   // Function to handle opening/closing the popup
//   const togglePopup = () => {
//     setShowPopup(!showPopup);
//   };

//   // Function to handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewStaff(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   // Function to handle form submission
//   const handleSubmit =async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:8283/api/staff",
//         {
//           name: newStaff.name,
//           phone: newStaff.phone,
//           work: newStaff.work,
//         }
//       );
//       console.log("name", newStaff.name);
//       console.log("phone", newStaff.phone);
//       console.log("work", newStaff.work);
//       alert(response.data.message);

//     } catch (error) {
//       alert(error.response?.data.message || "An error occurred");
//     }
//   };

//   return (
//     <div className="main-content">
//       <div className="headerStaff">
//         <button className="add-staff-button" onClick={togglePopup}>
//           +Add staff
//         </button>
//       </div>

//       {/* Table for staff list */}
//       <div className="staff-list">
//         <table>
//           <thead>
//             <tr>
//               <th>Sr.no</th>
//               <th>Staff name</th>
//               <th>Phone no.</th>
//               <th>Work</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {staffList.map((staff, index) => (
//               <tr key={staff._id}>
//                 <td>{index + 1}.</td>
//                 <td>{staff.name}</td>
//                 <td>{staff.phone}</td>
//                 <td>{staff.work}</td>
//                 <td><button className="update-button">Update</button></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//        {/* Popup for adding new staff */}
//       {showPopup && (
//         <div className="popup">
//           <div className="popup-content">
//             <h2>Add New Staff</h2>
//             <form onSubmit={handleSubmit}>
//               <label>
//                 Staff Name:
//                 <input type="text" name="name" value={newStaff.name} onChange={handleChange} required />
//               </label>
//               <label>
//                 Phone No.:
//                 <input type="text" name="phone" value={newStaff.phone} onChange={handleChange} required />
//               </label>
//               <label>
//                 Work:
//                 <input type="text" name="work" value={newStaff.work} onChange={handleChange} required />
//               </label>
//               <button type="submit">Add Staff</button>{" "}
//               <button type="button" onClick={togglePopup}>Cancel</button>
//             </form>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

// export default StaffPage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./StaffPage.css";

function StaffPage() {
  const [staffList, setStaffList] = useState([]); // State to hold staff data
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const [newStaff, setNewStaff] = useState({
    name: "",
    phone: "",
    work: "",
  }); // State to manage new staff details

  // Function to fetch staff data from the backend
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get("http://localhost:8283/api/staff"); // Your backend route
        setStaffList(response.data);
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };

    fetchStaff();
  }, []);

  // Function to handle opening/closing the popup
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStaff((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8283/api/staff", {
        name: newStaff.name,
        phone: newStaff.phone,
        work: newStaff.work,
      });

      alert(response.data.message);
      // Refetch staff list to update table
      const updatedStaff = await axios.get("http://localhost:8283/api/staff");
      setStaffList(updatedStaff.data);
      // Close the popup after submission
      togglePopup();
    } catch (error) {
      alert(error.response?.data.message || "An error occurred");
    }
  };

  return (
    <div className="main-content">
      <div className="headerStaff">
        <button className="add-staff-button" onClick={togglePopup}>
          +Add staff
        </button>
      </div>

      {/* Table for staff list */}
      <div className="staff-list">
        <table>
          <thead>
            <tr>
              <th>Sr.no</th>
              <th>Staff name</th>
              <th>Phone no.</th>
              <th>Work</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {staffList.length > 0 ? (
              staffList.map((staff, index) => (
                <tr key={staff._id}>
                  <td>{index + 1}</td>
                  <td>{staff.name}</td>
                  <td>{staff.phone}</td>
                  <td>{staff.work}</td>
                  <td>
                    <button className="update-button">Update</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No staff found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Popup for adding new staff */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Add New Staff</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Staff Name:
                <input
                  type="text"
                  name="name"
                  value={newStaff.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Phone No.:
                <input
                  type="text"
                  name="phone"
                  value={newStaff.phone}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Work:
                <input
                  type="text"
                  name="work"
                  value={newStaff.work}
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="submit">Add Staff</button>{" "}
              <button type="button" onClick={togglePopup}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffPage;