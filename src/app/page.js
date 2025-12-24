"use client"

import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  // State variables
  const [copied, setCopied] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [uploadedImage, setUploadedImage] = useState(null)
  
  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    plan: '',
    amount: '',
    screenshot: null,
    screenshotFile: null
  })

  // Copy UPI ID to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText('creative.electronix-1@okhdfcbank')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Download QR Code
  const downloadQR = () => {
    const link = document.createElement('a')
    link.href = '/qr.png'
    link.download = 'creative-electronix-payment-qr.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Handle file upload for screenshot
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result)
        setFormData(prev => ({
          ...prev,
          screenshot: reader.result,
          screenshotFile: file
        }))
      }
      reader.readAsDataURL(file)
    } else if (file) {
      alert('File size should be less than 5MB')
    }
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Auto-fill amount based on plan selection
    if (name === 'plan') {
      const amountMap = {
        '01 Month Plan': '250',
        '03 Months Plan': '600', 
        '06 Months Plan': '1080',
        '12 Months Plan': '1800'
      }
      if (amountMap[value]) {
        setFormData(prev => ({ 
          ...prev, 
          amount: amountMap[value] 
        }))
      }
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      // Prepare data for API
      const emailData = {
        name: formData.name,
        mobile: formData.mobile,
        address: formData.address,
        plan: formData.plan,
        amount: formData.amount,
        screenshot: formData.screenshot,
        toEmail: 'office.waterrelief@gmail.com' 
      }
      
      console.log('Sending email data:', emailData)
      
      // Call backend API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      })
      
      const result = await response.json()
      console.log('API Response:', result)
      
      if (!response.ok) {
        throw new Error(result.error || result.details || 'Failed to send email')
      }
      
      setSuccess(true)
      
      // Reset form after success
      setTimeout(() => {
        setSuccess(false)
        setShowForm(false)
        setFormData({
          name: '',
          mobile: '',
          address: '',
          plan: '',
          amount: '',
          screenshot: null,
          screenshotFile: null
        })
        setUploadedImage(null)
      }, 3000)
      
    } catch (err) {
      console.error('Error:', err)
      setError(err.message || 'Something went wrong. Please try WhatsApp option.')
    } finally {
      setLoading(false)
    }
  }

  // Open WhatsApp with pre-filled message
  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `🚰 *Water Relief Payment Confirmation*\n\n` +
      `I have made payment for Water Relief service.\n\n` +
      `*My Details:*\n` +
      `Name: ${formData.name || '[Your Name]'}\n` +
      `Mobile: ${formData.mobile || '[Your Mobile]'}\n` +
      `Plan: ${formData.plan || '[Selected Plan]'}\n` +
      `Amount: ₹${formData.amount || '[Amount]'}\n` +
      `Address: ${formData.address || '[Your Address]'}\n\n` +
      `Please activate my service. Thank you!`
    )
    window.open(`https://wa.me/919354922385?text=${message}`, '_blank')
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      mobile: '',
      address: '',
      plan: '',
      amount: '',
      screenshot: null,
      screenshotFile: null
    })
    setUploadedImage(null)
    setError('')
    setSuccess(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 pb-8 border-b-2 border-blue-100">
          <div className="flex items-center justify-center gap-4 mb-6">
            <i className="fas fa-tint text-5xl text-blue-600"></i>
            <h1 className="text-4xl md:text-5xl font-bold text-blue-800">Water Relief</h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            We hope Water Relief has kept you free from the hassle of filling tanks. 💦
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Column - Plans Section */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-blue-100">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6 pb-4 border-b-2 border-blue-100">
                Renew Your Subscription
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                To continue uninterrupted service, please renew your plan:
              </p>

              {/* Plans Container */}
              <div className="space-y-6">
                {/* 1 Month Plan */}
                <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-blue-700">01 Month Plan</h3>
                    <div className="text-2xl md:text-3xl font-black text-gray-800">₹250</div>
                  </div>
                  <p className="text-gray-600">
                    Flexible monthly plan. Perfect for short-term or trial usage with full service benefits.
                  </p>
                </div>

                {/* 3 Months Plan */}
                <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-blue-700">03 Months Plan</h3>
                    <div className="text-2xl md:text-3xl font-black text-gray-800">₹600</div>
                  </div>
                  <p className="text-gray-600">
                    Perfect for short-term usage. Continue enjoying hassle-free water supply for the next 3 months.
                  </p>
                </div>

                {/* 6 Months Plan - Most Popular */}
                <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-lg relative overflow-hidden">
                  <div className="absolute top-4 -right-10 bg-green-500 text-white text-sm font-semibold px-10 py-1 transform rotate-45">
                    Most Popular
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-blue-700">06 Months Plan</h3>
                    <div className="text-2xl md:text-3xl font-black text-gray-800">
                      ₹1080 <span className="text-lg font-medium text-gray-500">(Save ₹120)</span>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Most popular choice. Get 6 months of uninterrupted water supply at a discounted price.
                  </p>
                </div>

                {/* 12 Months Plan */}
                <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-blue-700">12 Months Plan</h3>
                    <div className="text-2xl md:text-3xl font-black text-gray-800">
                      ₹1800 <span className="text-lg font-medium text-gray-500">(Save ₹600)</span>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Best value for money. Enjoy a full year of water relief without any worries.
                  </p>
                </div>
              </div>

              {/* Plan List Summary */}
              <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-100 mt-8">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Available Plans:</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">01 Month Plan</span>
                    <span className="text-blue-700 font-bold">₹250</span>
                  </li>
                  <li className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">03 Months Plan</span>
                    <span className="text-blue-700 font-bold">₹600</span>
                  </li>
                  <li className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">06 Months Plan</span>
                    <span className="text-blue-700 font-bold">₹1080 <span className="text-green-600 text-sm">(Save ₹120)</span></span>
                  </li>
                  <li className="flex justify-between items-center py-3">
                    <span className="text-gray-700 font-medium">12 Months Plan</span>
                    <span className="text-blue-700 font-bold">₹1800 <span className="text-green-600 text-sm">(Save ₹600)</span></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Section */}
          <div className="flex-1 min-w-0">
            <div className="sticky top-6">
              {/* QR Code Container */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6 border-2 border-blue-100">
                <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6 pb-4 border-b-2 border-blue-100">
                  Complete Payment
                </h2>

                <div className="space-y-6">
                  {/* Dear Customer Message */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-gray-700 font-medium">
                      <strong className="text-blue-700">Dear Customer,</strong> To make a payment to <strong className="text-blue-700">Creative Electronix</strong>, scan the QR code or use the UPI ID below:
                    </p>
                  </div>

                  {/* Payment Methods */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* QR Code Section */}
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-blue-700 mb-4">Scan QR Code</h3>
                      <div className="w-56 h-56 mx-auto mb-4 bg-gray-50 rounded-xl border border-gray-200 p-4 flex items-center justify-center relative">
                        {/* QR Code Image */}
                        <Image 
                          src="/qr.PNG"
                          alt="Payment QR Code for Creative Electronix"
                          width={200}
                          height={200}
                          className="object-contain rounded-lg"
                          priority
                        />
                        
                        {/* Download Button Overlay */}
                        <button
                          onClick={downloadQR}
                          className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                          title="Download QR Code"
                          disabled={loading}
                        >
                          <i className="fas fa-download text-sm"></i>
                        </button>
                      </div>
                      <button
                        onClick={downloadQR}
                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                        disabled={loading}
                      >
                        <i className="fas fa-download"></i>
                        Download QR Code
                      </button>
                    </div>

                    {/* UPI ID Section */}
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-blue-700 mb-4">Pay via UPI ID</h3>
                      <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 mb-4">
                        <div className="flex items-center justify-between bg-white p-3 rounded-lg border">
                          <div className="text-left">
                            <div className="text-sm text-gray-500">UPI ID</div>
                            <div className="text-lg font-mono font-bold text-gray-800 break-all">
                              creative.electronix-1@okhdfcbank
                            </div>
                          </div>
                          <button
                            onClick={copyToClipboard}
                            className={`flex-shrink-0 ml-2 p-2 rounded-lg ${copied ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                            title="Copy UPI ID"
                            disabled={loading}
                          >
                            <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={copyToClipboard}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${copied ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                        disabled={loading}
                      >
                        <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                        {copied ? 'Copied!' : 'Copy UPI ID'}
                      </button>
                    </div>
                  </div>

                  {/* Step-by-Step Instructions */}
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <h3 className="text-lg font-bold text-blue-700 mb-4">Follow these simple steps:</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Scan QR code or copy UPI ID</p>
                          <p className="text-gray-600 text-sm">Use any UPI app like PhonePe, Google Pay, Paytm, etc.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                          2
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Make the payment</p>
                          <p className="text-gray-600 text-sm">Pay the exact amount according to your selected plan</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="bg-white px-3 py-1 rounded border text-sm">₹250</span>
                            <span className="bg-white px-3 py-1 rounded border text-sm">₹600</span>
                            <span className="bg-white px-3 py-1 rounded border text-sm">₹1080</span>
                            <span className="bg-white px-3 py-1 rounded border text-sm">₹1800</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                          3
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Send payment confirmation</p>
                          <p className="text-gray-600 text-sm">Choose one of these methods:</p>
                          <div className="flex flex-wrap gap-3 mt-2">
                            <button
                              onClick={() => setShowForm(true)}
                              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                            >
                              <i className="fas fa-envelope"></i>
                             Upload Screenshot
                            </button>
                            <button
                              onClick={openWhatsApp}
                              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                            >
                              <i className="fab fa-whatsapp"></i>
                              WhatsApp
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  
                </div>
              </div>

           
              
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 pt-8 border-t-2 border-blue-100">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-4">
            <div className="flex items-center gap-2">
              <i className="fas fa-phone text-blue-600"></i>
              <a href="tel:+919354922385" className="text-blue-600 font-medium hover:text-blue-800 hover:underline">
                +91-9354922385
              </a>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-envelope text-blue-600"></i>
              <a href="mailto:office.waterrelief@gmail.com" className="text-blue-600 font-medium hover:text-blue-800 hover:underline">
                office.waterrelief@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-building text-blue-600"></i>
              <span className="text-blue-600 font-medium">Creative Electronix</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm">© 2023 Creative Electronix - Water Relief Service. All rights reserved.</p>
        </footer>
      </div>

      {/* Email Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-blue-800">Send Payment Confirmation</h3>
                <button
                  onClick={() => !loading && (setShowForm(false), resetForm())}
                  className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  disabled={loading}
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              
              {success ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-check text-3xl text-green-600"></i>
                  </div>
                  <h4 className="text-lg font-bold text-green-700 mb-2">Email Sent Successfully!</h4>
                  <p className="text-gray-600 mb-4">
                    Confirmation sent to <strong>office.waterrelief@gmail.com</strong>
                  </p>
                  <p className="text-sm text-gray-500">
                    Your service will be activated shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      <div className="flex items-start">
                        <i className="fas fa-exclamation-circle mr-2 mt-0.5"></i>
                        <div>
                          <p className="font-medium">Failed to send email</p>
                          <p className="text-sm mt-1">{error}</p>
                          <p className="text-sm mt-2">
                            Please use WhatsApp option instead, or check if backend is running.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your full name"
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{10}"
                      maxLength="10"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="9876543210"
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Plan *
                    </label>
                    <select
                      name="plan"
                      value={formData.plan}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={loading}
                    >
                      <option value="">Choose a plan</option>
                      <option value="01 Month Plan">01 Month Plan - ₹250</option>
                      <option value="03 Months Plan">03 Months Plan - ₹600</option>
                      <option value="06 Months Plan">06 Months Plan - ₹1080</option>
                      <option value="12 Months Plan">12 Months Plan - ₹1800</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount Paid (₹) *
                    </label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter amount"
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Complete Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="House no, Street, Area, City, Pincode"
                      disabled={loading}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Screenshot 
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        id="screenshot"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={loading}
                      />
                      <label htmlFor="screenshot" className={`cursor-pointer ${loading ? 'opacity-50' : ''}`}>
                        {uploadedImage ? (
                          <div className="space-y-2">
                            <img
                              src={uploadedImage}
                              alt="Screenshot preview"
                              className="w-32 h-32 mx-auto object-cover rounded-lg"
                            />
                            <p className="text-green-600 text-sm">
                              <i className="fas fa-check-circle mr-1"></i>
                              Screenshot uploaded
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                setUploadedImage(null)
                                setFormData(prev => ({ ...prev, screenshot: null, screenshotFile: null }))
                              }}
                              className="text-red-600 text-sm hover:text-red-800"
                              disabled={loading}
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div>
                            <div className="w-16 h-16 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                              <i className="fas fa-camera text-2xl text-gray-400"></i>
                            </div>
                            <p className="text-gray-500 text-sm">
                              {loading ? 'Upload disabled...' : 'Click to upload payment screenshot'}
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                        loading 
                          ? 'bg-blue-400 cursor-not-allowed' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white`}
                    >
                      {loading ? (
                        <>
                          <i className="fas fa-spinner fa-spin"></i>
                          Sending Email...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane"></i>
                          Send Payment Confirmation
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
              
             
              
             
            </div>
          </div>
        </div>
      )}
    </main>
  )
}