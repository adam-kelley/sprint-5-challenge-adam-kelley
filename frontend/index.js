async function sprintChallenge5() {
  // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇



  
  const getLearners = await axios("http://localhost:3003/api/learners");
  const getMentors = await axios("http://localhost:3003/api/mentors");

  const learners = getLearners.data;
  const mentors = getMentors.data;

const infoMessage = document.querySelector('.info')
 if(getLearners && getMentors){
  infoMessage.textContent = 'No learner is selected'
 }

  const newLearners = learners.map((learner) => {
    return {
      ...learner,
      mentors: learner.mentors.map((mentorId) => {
        return mentors.find((mentor) => mentorId === mentor.id);
      }),
    };
  });

  console.log(newLearners);

  newLearners.forEach((learner) => {
    const learnerCard = document.createElement("div");
    learnerCard.classList.add("card");

    const learnerName = document.createElement("h3");
    const learnerEmail = document.createElement("div");

    const mentorsHeader = document.createElement("h4");
    const mentorsList = document.createElement("ul");
    mentorsHeader.classList.add('closed')

    learner.mentors.forEach(mentor => {
      const mentorsListItem = document.createElement("li");
      mentorsListItem.textContent = mentor.firstName + ' ' + mentor.lastName;
      mentorsList.appendChild(mentorsListItem);
    })

    learnerName.textContent = learner.fullName;
    learnerEmail.textContent = learner.email;
    mentorsHeader.textContent = "Mentors";



    learnerCard.appendChild(learnerName);
    learnerCard.appendChild(learnerEmail);
    learnerCard.appendChild(mentorsHeader);
    learnerCard.appendChild(mentorsList);

    const cardsContainer = document.querySelector(".cards");
    cardsContainer.appendChild(learnerCard);

    learnerCard.addEventListener('click', (evt) => {

      const allCards = document.querySelectorAll('.card')
      console.log(allCards)

      allCards.forEach(card => {

        if(card === evt.target){
          learnerCard.classList.toggle('selected')
        }else {
          card.classList.remove('selected')
        }

      })
      if(learnerCard.classList.contains('selected')){
        infoMessage.textContent = `The selected learner is ${learner.fullName}`
      }else {
        infoMessage.textContent = 'No learner is selected'
      }

    })


  });


  const footer = document.querySelector("footer");
  const currentYear = new Date().getFullYear();
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`;

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== "undefined" && module.exports)
  module.exports = { sprintChallenge5 };
else sprintChallenge5();
