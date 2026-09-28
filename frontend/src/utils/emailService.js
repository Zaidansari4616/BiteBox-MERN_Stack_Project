// src/utils/emailService.js
import emailjs from "@emailjs/browser";

const SERVICE_ID = "BiteBox-Gmail";
const TEMPLATE_ID = "template_iwji67h";
const PUBLIC_KEY = "yfe39M6KUdpvQ45Xv";

// Initialize EmailJS
emailjs.init(PUBLIC_KEY);

/**
 * Send order confirmation email to customer
 * @param {Object} orderData - Order information
 * @returns {Promise} EmailJS response
 */
export const sendOrderConfirmation = async (orderData) => {
  const templateParams = {
    to_email: orderData.email,
    to_name: orderData.firstName + " " + orderData.lastName,
    from_name: "BiteBox",
    order_id: orderData.order_id,
    order_total: "Rs." + orderData.total,
    order_items: orderData.items,
    delivery_address: `${orderData.street}, ${orderData.city}, ${orderData.state} - ${orderData.pincode}, ${orderData.country}`,
    phone: orderData.phone,
    order_date: new Date().toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  console.log("Email being sent to:", orderData.email);
  console.log("Email template params:", templateParams);

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
    );

    console.log("✅ Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("❌ Email send failed:", error);
    throw error;
  }
};

/**
 * Validate email configuration
 * @returns {boolean} True if configured
 */
export const isEmailConfigured = () => {
  return (
    SERVICE_ID !== "YOUR_SERVICE_ID" &&
    TEMPLATE_ID !== "YOUR_TEMPLATE_ID" &&
    PUBLIC_KEY !== "YOUR_PUBLIC_KEY"
  );
};
