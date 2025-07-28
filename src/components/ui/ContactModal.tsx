"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { X, Phone, Mail, MapPin, Send } from "lucide-react";
import GlassSurface from "./GlassSurface";

interface ContactModalProps {
  onClose: () => void;
}

export function ContactModal({ onClose }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 sm:flex sm:items-center sm:justify-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal - Full screen on mobile, centered on desktop */}
      <motion.div
        className="relative w-full h-full sm:w-full sm:max-w-md sm:h-auto sm:my-0 overflow-y-auto sm:overflow-visible"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300
        }}
      >
        <GlassSurface
          width="100%"
          height="100%"
          borderRadius={0}
          brightness={90}
          opacity={0.95}
          blur={25}
          backgroundOpacity={0.2}
          saturation={1.2}
          className="h-full sm:h-auto sm:rounded-[20px] p-4 sm:p-6 flex flex-col"
        >
          {/* Header - Close button only */}
          <div className="flex justify-start mb-4 flex-shrink-0">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-green-500 hover:bg-green-600 transition-colors shadow-lg"
            >
              <X size={20} className="text-white" />
            </button>
          </div>

          {isSubmitted ? (
            /* Success Message */
            <div className="flex-1 flex items-center justify-center">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <motion.div
                  className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Send size={28} className="text-green-400" />
                </motion.div>
                <h3 className="text-2xl font-semibold text-white mb-3">Message Sent!</h3>
                <p className="text-white/80 text-lg">We'll contact you soon with your free estimate.</p>
              </motion.div>
            </div>
          ) : (
            /* Contact Form */
            <div className="flex-1 flex flex-col">
              <div className="border border-white/30 rounded-lg p-4 mb-4 bg-white/5 backdrop-blur-sm">
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="flex flex-col space-y-3"
                >
              {/* Netlify form detection */}
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="bot-field" />

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                  placeholder="John Smith"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                  placeholder="(555) 123-4567"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                  placeholder="john@example.com"
                />
              </div>

              {/* Address Field */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-white/90 mb-1">
                  Property Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                  placeholder="123 Main St, City, State"
                />
              </div>

              {/* Service Type */}
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-white/90 mb-1">
                  Service Needed
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all"
                >
                  <option value="attic-insulation" className="bg-gray-800">Attic Insulation</option>
                  <option value="spray-foam" className="bg-gray-800">Spray Foam Insulation</option>
                  <option value="air-sealing" className="bg-gray-800">Air Sealing</option>
                  <option value="home-performance" className="bg-gray-800">Home Performance Audit</option>
                  <option value="other" className="bg-gray-800">Other</option>
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-1">
                  Additional Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-500/50 text-white font-semibold py-3 px-4 text-base rounded-lg transition-colors flex items-center justify-center gap-2 mt-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Get Free Estimate
                  </>
                )}
              </motion.button>
                </form>
              </div>
              
              {/* Contact Info */}
              <div className="mt-2 pt-4 border-t border-white/20 flex-shrink-0">
                <div className="flex items-center justify-center gap-4 text-xs text-white/80">
                  <div className="flex items-center gap-1">
                    <Phone size={12} className="text-green-400" />
                    <span>Call</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail size={12} className="text-green-400" />
                    <span>24hr</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={12} className="text-green-400" />
                    <span>Local</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </GlassSurface>
      </motion.div>
    </motion.div>
  );
}

export default ContactModal;