/**
 * License Protection Utility
 * This module implements protection to prevent unauthorized use of the application
 * Copyright (c) 2025 Pry-Uchiha - All Rights Reserved
 */

// List of authorized domains/hosts where this application can run
const AUTHORIZED_HOSTS = [
  'localhost',
  '127.0.0.1',
  'uchiha-qr.vercel.app/',
  // Add your production domains here
];

// Verify if app is authorized to run in current environment
export const verifyAuthorization = () => {
  // Check if running in an authorized environment
  const currentHost = window.location.hostname;
  const isAuthorizedHost = AUTHORIZED_HOSTS.includes(currentHost);
  
  // Get browser fingerprint and other identifiers
  const screenDetails = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const language = navigator.language;
  const platformInfo = navigator.platform;
  
  // Simple fingerprinting (in a real implementation, use a more sophisticated approach)
  const fingerprint = btoa(`${screenDetails}-${timezone}-${language}-${platformInfo}`);
  
  // Check if authorization is valid
  const isAuthorized = isAuthorizedHost && validateFingerprint(fingerprint);
  
  if (!isAuthorized) {
    return {
      authorized: false,
      reason: "Unauthorized use detected. This application requires explicit permission from the copyright owner."
    };
  }
  
  return { authorized: true };
};

// Validate the fingerprint (this could be enhanced with server validation)
const validateFingerprint = (fingerprint) => {
  // For development purposes, allow any fingerprint on localhost
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return true;
  }
  
  // In a production environment, this would validate against a server
  // or use a more sophisticated approach like license keys
  
  // As per requirements, we'll disable this for now and assume unauthorized
  return false; // Change this when implementing actual authorization
};

// Function to handle unauthorized access
export const handleUnauthorizedAccess = () => {
  // Remove all content from the page
  document.body.innerHTML = `
    <div style="padding: 2rem; text-align: center; font-family: Arial, sans-serif;">
      <h1 style="color: #ff3333;">Unauthorized Access</h1>
      <p style="font-size: 1.2rem;">
        This application is protected by copyright and requires explicit permission for use.
      </p>
      <p style="font-size: 1.2rem;">
        Please contact the copyright owner (Pry-Uchiha) for authorization.
      </p>
      <p style="margin-top: 2rem; font-size: 0.9rem;">
        Protected under the Restricted Use License.
      </p>
    </div>
  `;
  
  // Log the unauthorized attempt (in a real app, this would send data to a server)
  console.error("Unauthorized access attempt detected and blocked");
  
  // Prevent further code execution
  throw new Error("Unauthorized access");
};
