import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Mail, Phone, Clock, MapPin, Send } from 'lucide-react'
import api from '../../services/api'

const ContactUs: React.FC = () => {
  useEffect(() => {
    document.title = "VivahStore | Contact Us";
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await api.post('/contact', formData)
      if (response.data.success) {
        toast.success(response.data.message || "Thank you! Your message has been sent successfully.")
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        })
      } else {
        toast.error(response.data.message || "Failed to send message.")
      }
    } catch (error: any) {
      console.error("Error submitting contact form:", error)
      const errorMsg = error.response?.data?.message || "An error occurred while sending your message. Please try again."
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-stone-50/50 min-h-screen py-12 pb-20 w-full font-sans tracking-wide">
      {/* Header Banner */}
      <div className="max-w-4xl mx-auto text-center px-6 mb-12">
        <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-[#E41F66] bg-[#E41F66]/5 px-4 py-1.5 rounded-full uppercase inline-block mb-3 border border-[#E41F66]/10">
          Get In Touch
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-stone-900 leading-tight">
          We'd Love to Hear From You
        </h1>
        <p className="text-stone-500 text-sm md:text-base mt-3 max-w-xl mx-auto leading-relaxed">
          Have a question about custom wedding invite elements or orders? Drop us a line, and our luxury concierge will respond shortly.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Contact Cards & Map */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details List */}
            <div className="grid grid-cols-1 gap-4">
              
              {/* Email Card */}
              <div className="flex items-center gap-4 bg-white border border-stone-200/60 rounded-2xl p-4 shadow-xs">
                <div className="rounded-xl bg-[#E41F66]/10 p-3 text-[#E41F66] shrink-0">
                  <Mail className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider">Email Address</p>
                  <a href="mailto:bishrish@gmail.com" className="text-sm font-semibold text-stone-800 hover:text-[#E41F66] transition-colors mt-0.5 block">
                    bishrish@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="flex items-center gap-4 bg-white border border-stone-200/60 rounded-2xl p-4 shadow-xs">
                <div className="rounded-xl bg-[#E41F66]/10 p-3 text-[#E41F66] shrink-0">
                  <Phone className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider">Call Concierge</p>
                  <a href="tel:+917766888626" className="text-sm font-semibold text-stone-800 hover:text-[#E41F66] transition-colors mt-0.5 block">
                    +91 77668 88626
                  </a>
                </div>
              </div>

              {/* Opening Hours Card */}
              <div className="flex items-center gap-4 bg-white border border-stone-200/60 rounded-2xl p-4 shadow-xs">
                <div className="rounded-xl bg-[#E41F66]/10 p-3 text-[#E41F66] shrink-0">
                  <Clock className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider">Studio Hours</p>
                  <p className="text-sm font-semibold text-stone-800 mt-0.5">
                    Mon - Sat: 10:30 am - 6:30 pm
                  </p>
                </div>
              </div>

              {/* Location Card */}
              <div className="flex items-center gap-4 bg-white border border-stone-200/60 rounded-2xl p-4 shadow-xs">
                <div className="rounded-xl bg-[#E41F66]/10 p-3 text-[#E41F66] shrink-0">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider">Studio Location</p>
                  <p className="text-sm font-semibold text-stone-800 mt-0.5">
                    Surat, Gujarat, India
                  </p>
                </div>
              </div>

            </div>

            {/* Embedded Google Map */}
            <div className="bg-white border border-stone-200/60 rounded-3xl overflow-hidden shadow-xs p-2">
              <div className="rounded-2xl overflow-hidden h-64 border border-stone-100">
                <iframe
                  title="Srishbish Location Map"
                  src="https://www.google.com/maps?q=Surat%2C%20Gujarat%2C%20India&z=12&output=embed"
                  className="w-full h-full border-none"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white border border-stone-200/60 rounded-3xl p-6 md:p-8 shadow-xs">
            <h2 className="text-xl md:text-2xl font-bold text-stone-900 mb-2">Drop Us A Line</h2>
            <p className="text-stone-500 text-xs md:text-sm leading-relaxed mb-6">
              We’re happy to answer any questions you have or provide you with a customized design estimate. Simply submit the form below.
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                    Your Name <span className="text-[#E41F66]">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-[#E41F66]/80 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-[#E41F66]">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-[#E41F66]/80 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-[#E41F66]/80 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                  Your Message <span className="text-[#E41F66]">*</span>
                </label>
                <textarea
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you? Please share details about your event, stationery, or custom order needs..."
                  rows={5}
                  className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-4 py-2.5 text-sm text-stone-700 outline-none focus:border-[#E41F66]/80 focus:bg-white transition-all resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#E41F66] hover:bg-[#c60b4d] text-white text-xs md:text-sm font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending Message...' : 'Send Message'}
                  <Send className="size-4" />
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ContactUs