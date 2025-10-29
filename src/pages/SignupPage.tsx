import { authApi } from '@/services/Apis';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface FormData {
 name: string;
 email: string;
 password: string;
 confirmPassword: string;
}

interface FormErrors {
 name?: string;
 email?: string;
 password?: string;
 confirmPassword?: string;
}

export default function SignUp() {
 const [showPassword, setShowPassword] = useState<boolean>(false);
 const [formData, setFormData] = useState<FormData>({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
 });
 const [errors, setErrors] = useState<FormErrors>({});

 const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
  const { name, value } = e.target;
  setFormData({
   ...formData,
   [name]: value
  });
  if (errors[name as keyof FormErrors]) {
   setErrors({
    ...errors,
    [name]: ''
   });
  }
 };

 const navigate = useNavigate();

 const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
 };

 const validateForm = (): boolean => {
  const newErrors: FormErrors = {};

  if (!formData.name.trim()) {
   newErrors.name = 'Name is required';
  }

  if (!formData.email.trim()) {
   newErrors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
   newErrors.email = 'Invalid email format';
  }

  if (!formData.password) {
   newErrors.password = 'Password is required';
  } else if (formData.password.length < 6) {
   newErrors.password = 'Password must be at least 6 characters';
  }

  if (formData.password !== formData.confirmPassword) {
   newErrors.confirmPassword = 'Passwords do not match';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
 };

 const handleSubmit = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
   const response = await authApi.register({
    username: formData.name,
    email: formData.email,
    password: formData.password,
   });
   alert("Account created successfully! 🎉");
   setFormData({ name: '', email: '', password: '', confirmPassword: '' });

   navigate("/login"); // redirect to login
  } catch (error) {
   console.error("❌ Signup error:", error);
   setErrors({
    submit: error instanceof Error ? error.message : "Signup failed. Please try again.",
   });
  }
 };

 return (
  <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
   <div className="w-full max-w-md">
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
     <div className="p-8 sm:p-10">
      <div className="text-center mb-8">
       <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
        <User className="w-8 h-8 text-white" />
       </div>
       <h2 className="text-3xl font-bold text-gray-800 mb-2">
        Create Account
       </h2>
       <p className="text-gray-600">
        Sign up to get started
       </p>
      </div>

      <div className="space-y-5">
       <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
         Full Name
        </label>
        <div className="relative">
         <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
         <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full pl-11 pr-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'
           } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition`}
          placeholder="John Doe"
         />
        </div>
        {errors.name && (
         <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
       </div>

       <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
         Email Address
        </label>
        <div className="relative">
         <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
         <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full pl-11 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'
           } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition`}
          placeholder="you@example.com"
         />
        </div>
        {errors.email && (
         <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
       </div>

       <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
         Password
        </label>
        <div className="relative">
         <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
         <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full pl-11 pr-12 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'
           } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition`}
          placeholder="••••••••"
         />
         <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
         >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
         </button>
        </div>
        {errors.password && (
         <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
       </div>

       <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
         Confirm Password
        </label>
        <div className="relative">
         <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
         <input
          type={showPassword ? 'text' : 'password'}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`w-full pl-11 pr-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
           } rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition`}
          placeholder="••••••••"
         />
        </div>
        {errors.confirmPassword && (
         <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
       </div>

       <button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
       >
        Create Account
       </button>
      </div>

      <div className="mt-6 text-center">
       <p className="text-gray-600">
        Already have an account?{' '}
        <Link
         to="/login"
         className="text-purple-600 hover:text-purple-700 font-semibold"
        >
         Sign In
        </Link>
       </p>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
       <p className="text-center text-gray-500 text-sm mb-4">Or continue with</p>
       <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
         <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
          <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
          <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
          <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
         </svg>
         <span className="text-sm font-medium text-gray-700">Google</span>
        </button>
        <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
         <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
         </svg>
         <span className="text-sm font-medium text-gray-700">Facebook</span>
        </button>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}