document.getElementById('submitButton').addEventListener('click', function() {
  const emailInput = document.getElementById('emailInput').value;

  // Regular expression to validate email format
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  // Check if the email is valid
  if (emailRegex.test(emailInput)) {
      const notification = document.getElementById('notification');
      notification.style.display = 'block';

      setTimeout(() => {
          notification.style.display = 'none';
      }, 3000); // Hide notification after 3 seconds
  } else {
      alert('Please enter a valid email address.');
  }
});