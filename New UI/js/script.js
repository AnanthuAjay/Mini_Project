function cFunction(){
    var name   = document.getElementById('contact-form').name.value;
    // alert(byTitle);
    var email  = document.getElementById('contact-form').email.value;
    // alert(byAuthor);
    var subject = document.getElementById('contact-form').subject.value;
    //alert(startDate);
    var message   = document.getElementById('contact-form').message.value;
    //alert(endDate);       

    if(name === "" || email ==="" || subject ==="" || message === ""){
        alert("Incomplete field");
    }
    else{
        alert("Thank You!  "+ name + "\n We will get back to you") 
    }
  }

  let modalBtns = [...document.querySelectorAll(".button")];
  modalBtns.forEach(function(btn) {
    btn.onclick = function() {
      let modal = btn.getAttribute('data-modal');
      document.getElementById(modal)
        .style.display = "block";
    }
  });
  let closeBtns = [...document.querySelectorAll(".close")];
  closeBtns.forEach(function(btn) {
    btn.onclick = function() {
      let modal = btn.closest('.modal');
      modal.style.display = "none";
    }
  });
  window.onclick = function(event) {
    if(event.target.className === "modal") {
      event.target.style.display = "none";
    }
  }
  