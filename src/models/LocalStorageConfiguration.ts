import { type Feature } from '../components/FeatureList/FeatureList'

export default interface LocalStorageConfiguration {
  selectedVowel?: string
  featuresEnabled?: Record<Feature, boolean>
  shuffleWordsIntensity?: number
}
