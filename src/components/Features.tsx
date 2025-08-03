import FeatureSummary from "../components/FeatureSummary";
import { FeatureTexts } from "../assets/FeatureTexts";

const Features = () => {
  return (
    <>
    {FeatureTexts.map((feature, index) => (
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
