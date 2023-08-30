import { type Feature } from '../components/FeatureList/FeatureList'

export default interface LocalStorageConfiguration {
  // isVowelReplaceEnabled?: boolean
  selectedVowel?: string
  // isShuttleEnabled?: boolean
  featuresEnabled?: Record<Feature, boolean>
}
