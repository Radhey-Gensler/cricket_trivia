export default {
  quiz: [
    {
      render: "dropdown",
      question: "How many teams have participated in the ICC World Cup 2019?",
      question_id: 1,
      options: [
        {
          id: "a",
          value: 8
        },
        { id: "b", value: 9 },
        { id: "c", value: 10 },
        { id: "d", value: 12 }
      ],
      answer: "c",
      explanation:
        "10 teams had participated in the ICC Cricket World Cup 2019. There name's are; England, India, South Africa, New Zealand, Australia, Pakistan, Sri Lanka, West Indies, Bangladesh and Afghanistan"
    },
    {
      render: "dropdown",
      question_id: 2,
      question: "Which cricket team has won most ICC Cricket World Cup titles?",
      options: [
        {
          id: "a",
          value: "West indies"
        },
        { id: "b", value: "India" },
        { id: "c", value: "England" },
        { id: "d", value: "Australia" }
      ],
      answer: "d",
      explanation:
        "There are 11 World Cup tournaments being held till date. Australia is the most successful country which has won 5 World Cup titles. India & West Indies are the only two countries which have won 2World Cup titles."
    },
    {
      render: "dropdown",
      question_id: 3,
      question: "When was first ICC cricket World Cup started?",
      options: [
        {
          id: "a",
          value: "1972"
        },
        { id: "b", value: "1975" },
        { id: "c", value: "1985" },
        { id: "d", value: "1979" }
      ],
      answer: "b",
      explanation:
        "The very first ICC cricket World Cup was played in England in 1975. West Indies won the both initial ICC World Cups held in 1975 and 1979. India has won this tournament by defeating West Indies in the final in 1983."
    },
    {
      render: "radio",
      question_id: 4,
      question:
        "Which of the following statement is NOT correct about the ICC cricket World Cup?",
      options: [
        {
          id: "a",
          value: "It is played after the gap of every 4 years"
        },
        {
          id: "b",
          value: `The “Man of the Match” award in the ICC cricket World Cup was started in the 1992`
        },
        {
          id: "c",
          value: `Pakistan and Sri Lanka are the other two countries that have won the World Cup in 1992 and 1996 respectively.`
        },
        {
          id: "d",
          value:
            "England is the only country which lost 2 ICC World Cup finals."
        }
      ],
      answer: "b",
      explanation: `The “Man of the Match” award in the ICC cricket World Cup was started in the 1975. Clive Llyod was the first “Man of the Match” in Final of ICC Cricket World Cup of 1975.`
    }
  ]
};
