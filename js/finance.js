
    function validateForm(){
      var firstname = document.getElementById("firstname").value;
      var lastname = document.getElementById("lastname").value;
      var address = document.getElementById("address").value;
      var phone = document.getElementById("phone").value;
      var email = document.getElementById("email").value;
      var carCondition = document.getElementById("car-condition").value;
      var message = document.getElementById("message").value;
      var deposit = document.getElementById("deposit").value;
      var loanTerm = document.getElementById("loan-term").value;
      var monthlyPayments = document.getElementById("monthly-payments").value;

      document.getElementById("firstname-error").textContent = "";
      document.getElementById("lastname-error").textContent = "";
      document.getElementById("email-error").textContent = "";
      document.getElementById("phone-error").textContent = "";
      document.getElementById("address-error").textContent = "";
      document.getElementById("car-condition-error").textContent = "";
      document.getElementById("message-error").textContent = "";
      document.getElementById("deposit-error").textContent = "";
      document.getElementById("loan-term-error").textContent = "";
      document.getElementById("monthly-payments-error").textContent = "";

      var isValid = true;

      if (firstname === "") {
        document.getElementById("firstname-error").textContent = "First Name is required.";
        isValid = false;}

      if (lastname === "") {
        document.getElementById("lastname-error").textContent = "Last Name is required.";
        isValid = false;}

      if (email === "") {
        document.getElementById("email-error").textContent = "Email is required.";
        isValid = false;}

      if (phone === "") {
        document.getElementById("phone-error").textContent = "Phone Number is required.";
        isValid = false;}

      if (address === "") {
        document.getElementById("address-error").textContent = "Address is required.";
        isValid = false;}

      if (carCondition === "") {
        document.getElementById("car-condition-error").textContent = "Car Condition is required.";
        isValid = false;}

      if (message === "") {
        document.getElementById("message-error").textContent = "Message is required.";
        isValid = false;}

      if (deposit === "") {
        document.getElementById("deposit-error").textContent = "Deposit Amount is required.";
        isValid = false;}

      if (loanTerm === "") {
        document.getElementById("loan-term-error").textContent = "Loan Term is required.";
        isValid = false;}

      if (monthlyPayments === "") {
        document.getElementById("monthly-payments-error").textContent = "Desired Monthly Payments are required.";
        isValid = false;}

      if (!isValid) {
        return false;}

      if (isValid) {
        alert("Submission successful!");
      }
    }