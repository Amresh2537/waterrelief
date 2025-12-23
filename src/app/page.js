import Image from 'next/image'

export default function Home() {
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

                <div className="text-center">
                  <h3 className="text-xl font-bold text-blue-700 mb-6">Scan QR Code to Pay</h3>
                  
                  <div className="w-56 h-56 mx-auto mb-6 bg-gray-50 rounded-xl border border-gray-200 p-4 flex items-center justify-center">
                    {/* ✅ अपनी QR code image का path यहाँ डालें */}
                    {/* Option A: अगर image public/ में है */}
                    <Image 
                      src="/qr.png"  // public/qr.png के लिए
                      alt="Payment QR Code"
                      width={200}
                      height={200}
                      className="object-contain rounded-lg"
                      priority
                    />
                    
                    {/* Option B: Placeholder अगर image नहीं है */}
                    {/* <div className="text-center text-gray-400">
                      <i className="fas fa-qrcode text-6xl mb-3"></i>
                      <p className="text-sm font-medium">QR Code Image</p>
                      <p className="text-xs mt-1">public/qr.png में डालें</p>
                    </div> */}
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <p className="text-gray-700">
                      <strong className="text-blue-700">Instructions:</strong> Scan this QR code with any UPI app (Google Pay, PhonePe, Paytm, etc.) to complete your payment. After payment, share the receipt with us.
                    </p>
                  </div>

                  {/* Payment Amount Note */}
                  <div className="mt-6 bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                    <p className="text-gray-700">
                      <strong className="text-yellow-700">Note:</strong> Please pay the exact amount according to your selected plan:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                      <div className="text-center bg-white p-2 rounded border">
                        <div className="text-sm text-gray-500">01 Month</div>
                        <div className="font-bold text-gray-800">₹250</div>
                      </div>
                      <div className="text-center bg-white p-2 rounded border">
                        <div className="text-sm text-gray-500">03 Months</div>
                        <div className="font-bold text-gray-800">₹600</div>
                      </div>
                      <div className="text-center bg-white p-2 rounded border">
                        <div className="text-sm text-gray-500">06 Months</div>
                        <div className="font-bold text-gray-800">₹1080</div>
                      </div>
                      <div className="text-center bg-white p-2 rounded border">
                        <div className="text-sm text-gray-500">12 Months</div>
                        <div className="font-bold text-gray-800">₹1800</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-2 border-blue-100">
                <h3 className="text-xl font-bold text-blue-800 mb-6">Payment Information</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-green-500 text-lg mt-1"></i>
                    <span className="text-gray-700">Secure payment via UPI QR Code</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-shield-alt text-blue-500 text-lg mt-1"></i>
                    <span className="text-gray-700">100% safe and encrypted transaction</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-bolt text-yellow-500 text-lg mt-1"></i>
                    <span className="text-gray-700">Instant activation after payment confirmation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-headset text-purple-500 text-lg mt-1"></i>
                    <span className="text-gray-700">24/7 customer support for any issues</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-file-invoice text-red-500 text-lg mt-1"></i>
                    <span className="text-gray-700">Receipt will be sent to your registered email</span>
                  </li>
                </ul>

                {/* Price Comparison Table */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h4 className="text-lg font-bold text-blue-700 mb-3">Monthly Price Comparison:</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">01 Month Plan</span>
                      <span className="font-bold text-gray-800">₹250/month</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">03 Months Plan</span>
                      <span className="font-bold text-green-600">₹200/month <span className="text-xs text-gray-500">(Save ₹50/month)</span></span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">06 Months Plan</span>
                      <span className="font-bold text-green-600">₹180/month <span className="text-xs text-gray-500">(Save ₹70/month)</span></span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">12 Months Plan</span>
                      <span className="font-bold text-green-600">₹150/month <span className="text-xs text-gray-500">(Save ₹100/month)</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 pt-8 border-t-2 border-blue-100">
          <p className="text-gray-600 mb-2">
            Need help? Contact us at{' '}
            <a href="mailto:support@waterrelief.com" className="text-blue-600 font-medium hover:text-blue-800 hover:underline">
              office.waterrelief@gmail.com
            </a>{' '}
            or call{' '}
            <a href="tel:+919354922385" className="text-blue-600 font-medium hover:text-blue-800 hover:underline">
              +91 9354922385
            </a>
          </p>
          <p className="text-gray-500 text-sm">© 2023 Water Relief. All rights reserved.</p>
        </footer>
      </div>
    </main>
  )
}