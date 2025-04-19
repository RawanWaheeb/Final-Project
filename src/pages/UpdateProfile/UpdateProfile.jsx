// import { useState, useEffect } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import Loading from "../../components/Loading/Loading";
// import { motion } from "framer-motion";

// const UpdateProfile = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [profileImage, setProfileImage] = useState("/default-profile.png");

//   const token = localStorage.getItem("accessToken");
//   const authHeader = `Bearer ${token}`;

  
//   const fetchProfile = async () => {
//     try {
//       const response = await fetch("https://mohamednowar.pythonanywhere.com/api/profile/", {
//         method: "GET",
//         headers: { Authorization: authHeader },
//       });

//       if (!response.ok) throw new Error("Failed to fetch profile");

//       const data = await response.json();
//       setProfileImage(data.image ? `${data.image}?timestamp=${Date.now()}` : "/default-profile.png");

//       formik.setValues({
//         ...formik.values,
//         first_name: data.first_name || "",
//         last_name: data.last_name || "",
//         username: data.username || "",
//         date_of_birth: data.date_of_birth || "",
//         gender: data.gender || "",
//         phone_number: data.phone_number || "",
//         email: data.email || "",
//       });
//     } catch (error) {
//       setErrorMessage("Error fetching profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       navigate("/login");
//       return;
//     }
//     fetchProfile();
//   }, [navigate, token]);

//   const formik = useFormik({
//     initialValues: {
//       first_name: "",
//       last_name: "",
//       username: "",
//       date_of_birth: "",
//       gender: "",
//       phone_number: "",
//       email: "",
//       current_password: "",
//     },
//     validationSchema: Yup.object({
//       first_name: Yup.string().required("Required"),
//       last_name: Yup.string().required("Required"),
//       username: Yup.string().required("Required"),
//       date_of_birth: Yup.string().required("Required"),
//       gender: Yup.string().required("Required"),
//       phone_number: Yup.string().required("Required"),
//       email: Yup.string().email("Invalid email").required("Required"),
//       current_password: Yup.string().required("current password Required"),
//     }),
//     onSubmit: async (values) => {
//       try {
//         setErrorMessage("");
    
//         const formData = new FormData();
//         Object.entries(values).forEach(([key, value]) => formData.append(key, value));
//         if (selectedImage) {
//           formData.append("image", selectedImage);
//         }

//         let response = await fetch("https://mohamednowar.pythonanywhere.com/api/update/", {
//           method: "PATCH",
//           headers: { Authorization: authHeader },
//           body: formData,
//         });

//         const newProfileResponse = await fetch("https://mohamednowar.pythonanywhere.com/api/profile/", {
//           method: "GET",
//           headers: { Authorization: authHeader },
//         });

//         const newProfileData = await newProfileResponse.json();
//         setProfileImage(newProfileData.image ? `${newProfileData.image}?timestamp=${Date.now()}` : "/default-profile.png");

//         localStorage.setItem("userProfile", JSON.stringify(newProfileData));
//         window.dispatchEvent(new Event("storage"));

//         const responseData = await response.json();
//         if (!response.ok) throw new Error(responseData.message || "Update failed");

//         if (responseData.user) {
//           localStorage.setItem("userProfile", JSON.stringify(responseData.user));
//         }

//         await fetchProfile();

//         navigate("/profile", { replace: true });
//         window.location.reload();
//       } catch (error) {
//         setErrorMessage(error.message);
//       }
//     }
//   });

//   if (loading) return <Loading />;

//   return (
//     <div className="flex justify-center items-center min-h-screen p-12 pt-24">
//       <motion.div
//         className="bg-primary-light p-8 rounded-2xl shadow-lg w-full max-w-md"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.9, ease: "easeOut" }}
//       >
//         <h2 className="text-2xl font-bold text-center mb-4">Update Your Information</h2>
//         {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
//         <div className="flex justify-center mb-4">
//           <label className="relative w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden cursor-pointer">
//             <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
//             <input type="file" className="hidden" accept="image/*" onChange={(event) => {
//               const file = event.target.files[0];
//               if (file) {
//                 setSelectedImage(file);
//                 const reader = new FileReader();
//                 reader.onloadend = () => {
//                   setProfileImage(reader.result);
//                 };
//                 reader.readAsDataURL(file);
//               }
//             }} />
//           </label>
//         </div>
//         <form onSubmit={formik.handleSubmit} className="space-y-4 ">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
//             <div className="w-full">
//               <input
//                 {...formik.getFieldProps("first_name")}
//                 type="text"
//                 placeholder="First Name"
//                 className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
//                 required
//               />
//               {formik.touched.first_name && formik.errors.first_name && (
//                 <p className="text-red-500 text-sm mt-1">*{formik.errors.first_name}</p>
//               )}
//             </div>
//             <div className="w-full">
//               <input
//                 {...formik.getFieldProps("last_name")}
//                 type="text"
//                 placeholder="Last Name"
//                 className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
//                 required
//               />
//               {formik.touched.last_name && formik.errors.last_name && (
//                 <p className="text-red-500 text-sm mt-1">*{formik.errors.last_name}</p>
//               )}
//             </div>
//           </div>
//           <div className="w-full">
//             <input
//               {...formik.getFieldProps("username")}
//               type="text"
//               placeholder="Username"
//               className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             />
//             {formik.touched.username && formik.errors.username && (
//               <p className="text-red-500 text-sm mt-1">*{formik.errors.username}</p>
//             )}
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="w-full">
//               <input
//                 {...formik.getFieldProps("date_of_birth")}
//                 type="date"
//                 className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
//                 required
//               />
//             </div>
//             <div className="w-full">
//               <select
//                 {...formik.getFieldProps("gender")}
//                 className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-primary"
//               >
//                 <option value="">Select Gender</option>
//                 <option value="M">Male</option>
//                 <option value="F">Female</option>
//               </select>
//               {formik.touched.gender && formik.errors.gender && (
//                 <p className="text-red-500 text-sm mt-1">*{formik.errors.gender}</p>
//               )}
//             </div>
//           </div>
//           <div className="w-full">
//             <input
//               {...formik.getFieldProps("phone_number")}
//               type="text"
//               placeholder="Phone Number"
//               className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             />
//             {formik.touched.phone_number && formik.errors.phone_number && (
//               <p className="text-red-500 text-sm mt-1">*{formik.errors.phone_number}</p>
//             )}
//           </div>
//           <div className="w-full">
//             <input
//               {...formik.getFieldProps("email")}
//               type="email"
//               placeholder="Email"
//               className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             />
//             {formik.touched.email && formik.errors.email && (
//               <p className="text-red-500 text-sm mt-1">*{formik.errors.email}</p>
//             )}
//           </div>
//           <div className="w-full">
//             <input
//               {...formik.getFieldProps("current_password")}
//               type="password"
//               placeholder="Current Password"
//               className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
//               required
//             />
//             {formik.touched.current_password && formik.errors.current_password && (
//               <p className="text-red-500 text-sm mt-1">*{formik.errors.current_password}</p>
//             )}
//           </div>
//           <button type="submit" className="w-full bg-primary-buttons hover:bg-primary hover:text-black p-2 rounded-full text-white font-medium transition duration-1000">
//             Update Your Data
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default UpdateProfile;







import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { motion } from "framer-motion";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [profileImage, setProfileImage] = useState("/default-profile.png");

  const token = localStorage.getItem("accessToken");
  const authHeader = `Bearer ${token}`;

  const fetchProfile = async () => {
    try {
      const response = await fetch("https://mohamednowar.pythonanywhere.com/api/profile/", {
        method: "GET",
        headers: { Authorization: authHeader },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();

      const contentType = response.headers.get("Content-Type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Expected JSON response, but got something else");
      }

      setProfileImage(data.image ? `${data.image}?timestamp=${Date.now()}` : "/default-profile.png");

      formik.setValues({
        ...formik.values,
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        username: data.username || "",
        date_of_birth: data.date_of_birth || "",
        gender: data.gender || "",
        phone_number: data.phone_number || "",
        email: data.email || "",
      });
    } catch (error) {
      setErrorMessage("Error fetching profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/profile");
      return;
    }
    fetchProfile();
  }, [navigate, token]);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      date_of_birth: "",
      gender: "",
      phone_number: "",
      email: "",
      current_password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Required"),
      last_name: Yup.string().required("Required"),
      username: Yup.string().required("Required"),
      date_of_birth: Yup.string().required("Required"),
      gender: Yup.string().required("Required"),
      phone_number: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      current_password: Yup.string().required("current password Required"),
    }),
    onSubmit: async (values) => {
      try {
        setErrorMessage("");

        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => formData.append(key, value));

        if (selectedImage) {
          formData.append("image", selectedImage);
        }

        
        let response = await fetch("https://mohamednowar.pythonanywhere.com/api/update/", {
          method: "PATCH",
          headers: { Authorization: authHeader },
          body: formData,
        });

        const newProfileResponse = await fetch("https://mohamednowar.pythonanywhere.com/api/profile/", {
          method: "GET",
          headers: { Authorization: authHeader },
        });

        
        const newProfileData = await newProfileResponse.json();
        setProfileImage(newProfileData.image ? `${newProfileData.image}?timestamp=${Date.now()}` : "/default-profile.png");

        localStorage.setItem("userProfile", JSON.stringify(newProfileData));
        window.dispatchEvent(new Event("storage"));

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message || "Update failed");
        }

        if (responseData.user) {
          localStorage.setItem("userProfile", JSON.stringify(responseData.user));
        }

        await fetchProfile();

        navigate("/profile", { replace: true });
        window.location.reload();
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  });

  if (loading) return <Loading />;

  return (
    <div className="flex justify-center items-center min-h-screen p-12 pt-24">
      <motion.div
        className="bg-primary-light p-8 rounded-2xl shadow-lg w-full max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Update Your Information</h2>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        <div className="flex justify-center mb-4">
          <label className="relative w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden cursor-pointer">
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files[0];
                if (file) {
                  setSelectedImage(file);
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setProfileImage(reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div className="w-full">
              <input
                {...formik.getFieldProps("first_name")}
                type="text"
                placeholder="First Name"
                className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              {formik.touched.first_name && formik.errors.first_name && (
                <p className="text-red-500 text-sm mt-1">*{formik.errors.first_name}</p>
              )}
            </div>
            <div className="w-full">
              <input
                {...formik.getFieldProps("last_name")}
                type="text"
                placeholder="Last Name"
                className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              {formik.touched.last_name && formik.errors.last_name && (
                <p className="text-red-500 text-sm mt-1">*{formik.errors.last_name}</p>
              )}
            </div>
          </div>
          <div className="w-full">
            <input
              {...formik.getFieldProps("username")}
              type="text"
              placeholder="Username"
              className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-sm mt-1">*{formik.errors.username}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <input
                {...formik.getFieldProps("date_of_birth")}
                type="date"
                className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="w-full">
              <select
                {...formik.getFieldProps("gender")}
                className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-primary"
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <p className="text-red-500 text-sm mt-1">*{formik.errors.gender}</p>
              )}
            </div>
          </div>
          <div className="w-full">
            <input
              {...formik.getFieldProps("phone_number")}
              type="text"
              placeholder="Phone Number"
              className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            {formik.touched.phone_number && formik.errors.phone_number && (
              <p className="text-red-500 text-sm mt-1">*{formik.errors.phone_number}</p>
            )}
          </div>
          <div className="w-full">
            <input
              {...formik.getFieldProps("email")}
              type="email"
              placeholder="Email"
              className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">*{formik.errors.email}</p>
            )}
          </div>
          <div className="w-full">
            <input
              {...formik.getFieldProps("current_password")}
              type="password"
              placeholder="Current Password"
              className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            {formik.touched.current_password && formik.errors.current_password && (
              <p className="text-red-500 text-sm mt-1">*{formik.errors.current_password}</p>
            )}
          </div>
          <button type="submit" className="w-full bg-primary-buttons hover:bg-primary hover:text-black p-2 rounded-full text-white font-medium transition duration-1000">
            Update Your Data
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateProfile;
