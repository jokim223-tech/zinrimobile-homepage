const questions = document.querySelectorAll(".faq-question");

questions.forEach(function(question) {

    question.addEventListener("click", function() {

        const answer = question.nextElementSibling;
        const icon = question.querySelector("span");

        if (answer.style.display === "block") {

            answer.style.display = "none";
            icon.textContent = "+";

        } else {

            answer.style.display = "block";
            icon.textContent = "−";

        }

    });

});