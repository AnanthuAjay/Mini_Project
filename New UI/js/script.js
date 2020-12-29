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
  