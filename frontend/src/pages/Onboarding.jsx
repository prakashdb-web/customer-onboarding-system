import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Stepper from '../Components/Stepper'
import FormInput from '../Components/FormInput'
import { apiService } from '../services/api'

const steps = [
  { id: 1, label: 'Personal' },
  { id: 2, label: 'Contact' },
  { id: 3, label: 'Identity' },
]

const initialFormData = {
  name: '',
  dob: '',
  gender: '',
  mobile: '',
  email: '',
  city: '',
  pan: '',
  address: '',
  state: '',
  country: '',
}

export default function Onboarding({ setCurrentPage }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState(initialFormData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const validateStep = () => {
    if (currentStep === 0) {
      if (!formData.name.trim()) { setError('Name is required'); return false }
      return true
    }
    if (currentStep === 1) {
      if (!formData.mobile.trim()) { setError('Mobile is required'); return false }
      if (!/^\d{10}$/.test(formData.mobile)) { setError('Mobile must be 10 digits'); return false }
      return true
    }
    if (currentStep === 2) {
      if (formData.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pan.toUpperCase())) {
        setError('Invalid PAN format (e.g., ABCDE1234F)'); return false
      }
      return true
    }
    return true
  }

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1)
      else handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) { setCurrentStep(currentStep - 1); setError('') }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await apiService.createCustomer(formData)
      if (response.success) {
        setSuccess(true)
        setFormData(initialFormData)
        setCurrentStep(0)
        setTimeout(() => { setSuccess(false); setCurrentPage('dashboard') }, 2000)
      } else { setError(response.message || 'Failed to create customer') }
    } catch (err) {
      setError(err.message || 'An error occurred')
    } finally { setLoading(false) }
  }

  const stepContent = {
    0: (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
        <FormInput label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
        <FormInput label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} />
        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    ),
    1: (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
        <FormInput label="Mobile Number" name="mobile" type="tel" value={formData.mobile} onChange={handleChange} placeholder="9876543210" required maxLength="10" />
        <FormInput label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
        <FormInput label="City" name="city" value={formData.city} onChange={handleChange} placeholder="Mumbai" />
      </div>
    ),
    2: (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Identity & Address</h2>
        <FormInput label="PAN" name="pan" value={formData.pan} onChange={handleChange} placeholder="ABCDE1234F" />
        <FormInput label="Address" name="address" value={formData.address} onChange={handleChange} placeholder="Street address" />
        <FormInput label="State" name="state" value={formData.state} onChange={handleChange} placeholder="Maharashtra" />
        <FormInput label="Country" name="country" value={formData.country} onChange={handleChange} placeholder="India" />
      </div>
    ),
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-16"><Stepper currentStep={currentStep} steps={steps} /></div>

        <AnimatePresence>
          {success && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="mb-6 p-4 bg-green-100 border-2 border-green-500 rounded-lg text-green-700 text-center font-medium">
              ✓ Customer registered successfully!
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div key={currentStep} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="bg-white rounded-xl shadow-lg p-8">
          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-6 p-4 bg-red-100 border-2 border-red-500 rounded-lg text-red-700 text-sm">
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {stepContent[currentStep]}

          <div className="mt-8 flex gap-4">
            <button onClick={handleBack} disabled={currentStep === 0} className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
              ← Back
            </button>
            <button onClick={handleNext} disabled={loading} className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Submitting...
                </>
              ) : currentStep === steps.length - 1 ? 'Submit ✓' : 'Next →'}
            </button>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">Step {currentStep + 1} of {steps.length}</p>
        </motion.div>
      </div>
    </div>
  )
}