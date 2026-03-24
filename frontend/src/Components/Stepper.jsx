import { motion } from 'framer-motion'

export default function Stepper({ currentStep, steps }) {
  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto">
      {steps.map((step, index) => (
        <motion.div key={step.id} className="flex flex-col items-center flex-1">
          <div className="flex items-center w-full">
            <motion.div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                index <= currentStep ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200 text-gray-600'
              }`}
              animate={{ scale: index === currentStep ? 1.2 : 1 }}
            >
              {index + 1}
            </motion.div>
            {index < steps.length - 1 && (
              <motion.div
                className={`flex-1 h-1 mx-2 rounded ${index < currentStep ? 'bg-blue-500' : 'bg-gray-200'}`}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
              />
            )}
          </div>
          <p className={`mt-3 text-sm font-medium ${index <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}>
            {step.label}
          </p>
        </motion.div>
      ))}
    </div>
  )
}