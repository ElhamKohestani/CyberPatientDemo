function generateUUID() {
    const crypto = window.crypto || window.msCrypto; // Check for browser support
  
    if (crypto) {
      const buffer = new Uint8Array(16);
      crypto.getRandomValues(buffer);
  
      // Set the version (4) and variant bits (2) for a valid UUID
      buffer[6] = (buffer[6] & 0x0f) | 0x40;
      buffer[8] = (buffer[8] & 0x3f) | 0x80;
  
      // Convert the buffer to a hexadecimal string
      const parts = Array.from(buffer, (byte) => byte.toString(16).padStart(2, '0'));
  
      return `${parts.slice(0, 4).join('')}-${parts.slice(4, 6).join('')}-${parts.slice(6, 8).join('')}-${parts.slice(8, 10).join('')}-${parts.slice(10).join('')}`;
    } else {
      console.error('Your browser does not support crypto.getRandomValues().');
      return null;
    }
  }

  export default generateUUID;