const { Email } = require("../models");

const emailData = [
  {
    body: "Hello, I am trying to reach you about your car's extended warranty. It will soon expire resulting in the most terrible of consequences for you and your family.",
    user_id: 1,
  },
  {
    body: "Even though I respect you and think you're the greatest, I can't help but wonder why you would eat all of my cheesecake without leaving any.",
    user_id: 1,
  },
  {
    body: "Will you be my valentine? It would be a horrendous tragedy if you don't.",
    user_id: 2,
  },
  {
    body: "It would warm the deepest corners of my heart if you would be my valentine. In the event that you accept, I can promise you an eventful and exciting evening filled with experiences you will never forget.",
    user_id: 2,
  },
  {
    body: "Lets renegotiate with the firm. We've been underfunded for too long and stretching our labor pool to meet deadlines like this is unsustainable.",
    user_id: 3,
  },
  {
    body: "I've heard that the you offer an acceptable service but my experience was merely adequate. For prices like these customers expect the extra mile's worth of service.",
    user_id: 3,
  },
  {
    body: "Eat my shorts, fatty! You could not possibly fathom the depths of your evil. You are literally satan! Nasty, awful man!",
    user_id: 4,
  },
  {
    body: "I want to express my gratitude for what was a wonderful event. Thank you for your time, your patience and your willingness to contribute to the cause.",
    user_id: 4,
  },
  {
    body: "You are simply the greatest, most magnanimous person who has ever graced the earth with their presence. I worship and adore you, you beautiful, fantastic creature.",
    user_id: 5,
  },
  {
    body: "Hello Kathy - I'm hoping we can discuss today's meeting in greater depth. I can't help but feel it is necessary to go over, once again, your awful and painful career limiting behavior.",
    user_id: 5,
  },
];

const seedEmail = () => Email.bulkCreate(emailData);

module.exports = seedEmail;
