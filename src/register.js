// Switching between registration steps
document.addEventListener("DOMContentLoaded", function() {
    const form1 = document.getElementById("form1");
    const form2 = document.getElementById("form2");
    const form3 = document.getElementById("form3");
    const next1 = document.getElementById("next1");
    const next2 = document.getElementById("next2");
    const back1 = document.getElementById("back1");
    const back2 = document.getElementById("back2");

    next1.addEventListener("click", function() {
        form1.style.display = "none";
        form2.style.display = "flex";
    });
    back1.addEventListener("click", function() {
        form2.style.display = "none";
        form1.style.display = "flex";
    });
    next2.addEventListener("click", function() {
        form2.style.display = "none";
        form3.style.display = "flex";
    });
    back2.addEventListener("click", function() {
        form3.style.display = "none";
        form2.style.display = "flex";
    });
});

// Make sure Next button is only active when a role is selected
document.addEventListener('DOMContentLoaded', function() {
    const roleRadios = document.querySelectorAll('.role-radio');
    const nextButton = document.getElementById('next1');

    // Initially disable the Next button
    nextButton.disabled = true;
    nextButton.style.opacity = '0.5';

    roleRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Enable the Next button when a role is selected
            nextButton.disabled = false;
            nextButton.style.opacity = '1';
        });
    });
});