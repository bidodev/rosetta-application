function animatedForm() {
  // 1__ grab all the arrows
  const arrows = document.querySelectorAll(".fa-arrow-down");

  //   _2__for each arrow a function
  arrows.forEach((arrow) => {
    //__3__ attach an event listener 'click' to each arrow
    arrow.addEventListener("click", () => {
      // __4__here you will define what you are going to animate
      // so here you want to grab the input box
      //   if you console log and check it on the browser after clicking, you will se that it brings you to the username input:  input type="text" placeholder="Username"
      const input = arrow.previousElementSibling;
      //   console.log(input);
      //__5 this is going to grab the block of parent element: div class="field-name
      const parent = arrow.parentElement;
      //__6   this nextElementSibling is going to grab the next element block and the next element is the EMAIL: div class="field-email.
      const nextForm = parent.nextElementSibling;
      //
      //
      // __13
      // -------------------
      // check for validation
      // -------------------
      //
      // if input type is equal to the text AND IF ITS TRUE but also if validateUser "its making allusion/checking to the function in step 7, the whole data inside of it that is also connected to step 4..so in few words it will check what the heck is the user is writing", so at the end of the checking in step 11, it will check the step 12 and if all is true/correct it will return the two value s here in step 13: input.type === "text" && validateUser(input), and that means we can move on and add the next checking/box.
      if (input.type === "text" && validateUser(input)) {
        // __14__ so once all is perfect in the first block, you can add the success message.
        // console.log("everything is okay");
        // ___16 REPLACE console log for the follwing
        nextSlide(parent, nextForm);
        // 19 the line below is going to check everything in the step 17 just like i did before with the user data.
      } else if (input.type === "email" && validateEmail(input)) {
        nextSlide(parent, nextForm);
        // step 20 this is going to use the settings of the step 7
      } else if (input.type === "password" && validateUser(input)) {
        nextSlide(parent, nextForm);
      } else {
        parent.style.animation = "shake 0.5s ease";
      }
      //   get rid of the animation
      parent.addEventListener("animationend", () => {
        parent.style.animation = "";
      });
    });
  });
  //
}
//
// __7
// ------------------------
//     User Validation
// ------------------------
function validateUser(user) {
  // _8_ this section  control the users password length.
  if (user.value.length < 6) {
    console.log("not enough characters");
    // __10__red __ this is connected to step 9, this will change a color to red if it finds an error
    error("rgb(189,87,87, 0.1)");
  } else {
    //__11  green if the user data is correct, it will set up back to the color you have in the css body or section you are doing it.
    error("rgb(87, 189, 130, 0.2)");
    //__12 this true is for the if statement step 13 on top
    return true;
  }
}
//
//
// __17_
// ------------------------
//     Email Validation
// ------------------------
function validateEmail(email) {
  const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // MORE INFO , go to the bottom of the link for more
  // https://www.w3resource.com/javascript/form/email-validation.php

  // __18__ this is the same process as in step 11 , 12 , after this go up to step 16 and under this   nextSlide(parent, nextForm); start step 19
  if (validation.test(email.value)) {
    error("rgb(87, 189, 130, 0.2)");
    return true;
  } else {
    error("rgb(189,87,87, 0.2)");
  }
}

// ------------------------
//
// __15
// ------------------------
//   next slide transition
//    fade out * fade in
// ------------------------
//
function nextSlide(parent, nextForm) {
  // _this is going to transition OUT
  parent.classList.add("innactive");
  parent.classList.remove("active");
  // _this is going to transition in, after this go up to step 14 and hide the console log, and replace it for ...this function parameters names : parent,nextForm.
  nextForm.classList.add("active");
}

//
//
// __9
// ------------------------
//     ERRORS
// ------------------------
function error(color) {
  document.body.style.backgroundColor = color;
}

//
//
//
animatedForm();
