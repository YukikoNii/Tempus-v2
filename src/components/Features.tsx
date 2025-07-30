import FeatureSummary from "../components/FeatureSummary";
const timer_stopwatch = "/images/Time.png";
const to_do = "/images/to_do.png";
const calendar = "/images/calendar.png";

const features = [
  {
    name: "Timer & Stopwatch",
    phrase: "Take your productivity to a new level.",
    description:
      "With our accurate and easy-to-use timer & stopwatch, you can finish your work in a limited time.",
    imgName: timer_stopwatch,
  },
  {
    name: "To-Do List",
    phrase: "Keep track of everything in a single list.",
    description:
      "With our priority and custom tags function, you can focus on most urgent tasks or your weak subjects.",
    imgName: to_do,
  },
  {
    name: "Calendar",
    phrase: "All upcoming events at a glance.",
    description:
      "Our minimal calendar with today's date highlighted allows you to see how much time you have until your deadlines.",
    imgName: calendar,
  },
];

const Features = () => {
  return (
    <>
    {features.map((feature, index) => (
          <FeatureSummary
            key={index}
            index={index}
            name={feature.name}
            phrase={feature.phrase}
            description={feature.description}
            buttonLabel="Start Now →"
            imgName={feature.imgName}
          ></FeatureSummary>
        ))
    }
    </>
  )
}

export default Features
