// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useFormik } from "formik";
// import toast from "react-hot-toast";
// import { object, string, ref } from "yup";
// import { motion } from "framer-motion";


// export default function ChangePassword() {
//   const [showPass, setShowPass] = useState(false);
//   const navigate = useNavigate();


//   const togglePasswordVisibility = () => {
//     setShowPass((prev) => !prev);
//   };

  
//   const validationSchema = object({
//     current_password: string()
//       .required("Current password is required")
//       .min(8, "Password must contain at least 8 characters"),
//     new_password: string()
//       .required("New password is required")
//       .min(8, "Password must contain at least 8 characters"),
//     confirm_password: string()
//       .required("Confirm password is required")
//       .oneOf([ref("new_password")], "Passwords must match"), 
//   });

  
//   const handleSubmit = async (values) => {
//     let toastLoadingId = toast.loading("Changing your password...");

//     try {
//       const response = await axios.put(
//         "https://mohamednowar.pythonanywhere.com/api/change_password/",
//         {
//           current_password: values.current_password,
//           new_password: values.new_password,
//           confirm_password: values.confirm_password,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${localStorage.getItem('accessToken')}`, 
//           },
//         }
//       );
      
//       if (response.data.status === 200) {
//         toast.success(response.data.message || "Password updated successfully.");
//         setTimeout(() => {
//           navigate("/profile"); 
//         }, 1200);
//       } else {
//         toast.error(response.data.message || "Something went wrong. Please try again.");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     } finally {
//       toast.dismiss(toastLoadingId);
//     }
//   };

  
//   const formik = useFormik({
//     initialValues: {
//       current_password: "",
//       new_password: "",
//       confirm_password: "",
//     },
//     validationSchema,
//     onSubmit: handleSubmit,
//   });

//   return (
//     <div className="flex justify-center items-center min-h-screen pt-24">
//       <motion.div
              
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.9, ease: "easeOut" }}
//             >
//       <section className="w-full max-w-lg p-12 mb-12 bg-primary-light shadow-md rounded-xl">
//         <div className="text-center mb-6">
//           <h2 className="text-3xl text-center font-semibold mb-12">Change Your Password</h2>
//         </div>
//         <form onSubmit={formik.handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="current_password" className="block text-lg font-medium mb-2">Current Password:</label>
//             <input
//               type={showPass ? "text" : "password"}
//               id="current_password"
//               name="current_password"
//               placeholder="Enter your current password"
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
//                 formik.errors.current_password && formik.touched.current_password ? "border-red-500" : "border-gray-300"
//               }`}
//               {...formik.getFieldProps("current_password")}
//             />
//             {formik.errors.current_password && formik.touched.current_password && (
//               <p className="text-sm text-red-600 mt-1">{formik.errors.current_password}</p>
//             )}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="new_password" className="block text-lg font-medium mb-2">New Password:</label>
//             <input
//               type={showPass ? "text" : "password"}
//               id="new_password"
//               name="new_password"
//               placeholder="Enter new password"
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
//                 formik.errors.new_password && formik.touched.new_password ? "border-red-500" : "border-gray-300"
//               }`}
//               {...formik.getFieldProps("new_password")}
//             />
//             {formik.errors.new_password && formik.touched.new_password && (
//               <p className="text-sm text-red-600 mt-1">{formik.errors.new_password}</p>
//             )}
//           </div>

//           <div className="mb-6">
//             <label htmlFor="confirm_password" className="block text-lg font-medium mb-2">Confirm New Password:</label>
//             <input
//               type={showPass ? "text" : "password"}
//               id="confirm_password"
//               name="confirm_password"
//               placeholder="Confirm your new password"
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
//                 formik.errors.confirm_password && formik.touched.confirm_password ? "border-red-500" : "border-gray-300"
//               }`}
//               {...formik.getFieldProps("confirm_password")}
//             />
//             {formik.errors.confirm_password && formik.touched.confirm_password && (
//               <p className="text-sm text-red-600 mt-1">{formik.errors.confirm_password}</p>
//             )}
//           </div>
//           <div className="space-y-4">
//           <Link to="/forgetPassword" className="text-primary-buttons text-sm font-semibold block text-right">
//                   Forgot Password?
//                 </Link>
//           <button
//             type="submit"
//             className="w-full bg-primary-buttons text-white py-3 rounded-2xl font-medium hover:bg-primary hover:text-black transition duration-1000"
//           >
//             Change Your Password
//           </button>
//           </div>
//         </form>
//       </section>
//       </motion.div>
//     </div>
//   );
// }


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { object, string, ref } from "yup";
import { motion } from "framer-motion";

export default function ChangePassword() {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPass((prev) => !prev);
  };

  const validationSchema = object({
    current_password: string()
      .required("Current password is required")
      .min(8, "Password must contain at least 8 characters"),
    new_password: string()
      .required("New password is required")
      .min(8, "Password must contain at least 8 characters"),
    confirm_password: string()
      .required("Confirm password is required")
      .oneOf([ref("new_password")], "Passwords must match"),
  });

  const handleSubmit = async (values) => {
    let toastLoadingId = toast.loading("Changing your password...");

    try {
      const response = await axios.put(
        "https://mohamednowar.pythonanywhere.com/api/change_password/",
        {
          current_password: values.current_password,
          new_password: values.new_password,
          confirm_password: values.confirm_password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('accessToken')}`, 
          },
        }
      );
      
      if (response.data.status === 200) {
        toast.success(response.data.message || "Password updated successfully.");
      

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userProfile");
      
        setTimeout(() => {
          navigate("/login");
          window.location.reload(); 
        }, 1200);
      }
       else {
        toast.error(response.data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      toast.dismiss(toastLoadingId);
    }
  };

  const formik = useFormik({
    initialValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex justify-center items-center min-h-screen pt-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <section className="w-full max-w-lg p-12 mb-12 bg-primary-light shadow-md rounded-xl">
          <div className="text-center mb-6">
            <h2 className="text-3xl text-center font-semibold mb-12">Change Your Password</h2>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="current_password" className="block text-lg font-medium mb-2">Current Password:</label>
              <input
                type={showPass ? "text" : "password"}
                id="current_password"
                name="current_password"
                placeholder="Enter your current password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                  formik.errors.current_password && formik.touched.current_password ? "border-red-500" : "border-gray-300"
                }`}
                {...formik.getFieldProps("current_password")}
              />
              {formik.errors.current_password && formik.touched.current_password && (
                <p className="text-sm text-red-600 mt-1">{formik.errors.current_password}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="new_password" className="block text-lg font-medium mb-2">New Password:</label>
              <input
                type={showPass ? "text" : "password"}
                id="new_password"
                name="new_password"
                placeholder="Enter new password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                  formik.errors.new_password && formik.touched.new_password ? "border-red-500" : "border-gray-300"
                }`}
                {...formik.getFieldProps("new_password")}
              />
              {formik.errors.new_password && formik.touched.new_password && (
                <p className="text-sm text-red-600 mt-1">{formik.errors.new_password}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="confirm_password" className="block text-lg font-medium mb-2">Confirm New Password:</label>
              <input
                type={showPass ? "text" : "password"}
                id="confirm_password"
                name="confirm_password"
                placeholder="Confirm your new password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                  formik.errors.confirm_password && formik.touched.confirm_password ? "border-red-500" : "border-gray-300"
                }`}
                {...formik.getFieldProps("confirm_password")}
              />
              {formik.errors.confirm_password && formik.touched.confirm_password && (
                <p className="text-sm text-red-600 mt-1">{formik.errors.confirm_password}</p>
              )}
            </div>
            <div className="space-y-4">
              <Link to="/forgetPassword" className="text-primary-buttons text-sm font-semibold block text-right">
                Forgot Password?
              </Link>
              <button
                type="submit"
                className="w-full bg-primary-buttons text-white py-3 rounded-2xl font-medium hover:bg-primary hover:text-black transition duration-1000"
              >
                Change Your Password
              </button>
            </div>
          </form>
        </section>
      </motion.div>
    </div>
  );
}
