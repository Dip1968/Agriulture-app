// WhatsApp link generation for Buy Now feature
export function generateWhatsAppLink(productName, price, location) {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER || '917990485206';
  const cleanNumber = number.replace(/\D/g, '');

  const message = `Hu aa product order karva mangu chhu:
Product Name: ${productName}
Price: ${price}
Maru Location: ${location}
Delivery time confirm kari janavjo.`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}
