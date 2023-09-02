import { type Feature } from '../components/FeatureList/FeatureList';
import type LocalStorageConfiguration from '../models/LocalStorageConfiguration';

const loadLocalStorageConfiguration = async (): Promise<LocalStorageConfiguration | undefined> => {
  return await chrome.storage.local.get(null) as LocalStorageConfiguration;
}

const saveLocalStorageConfiguration = async (config: LocalStorageConfiguration): Promise<void> => {
  await chrome.storage.local.set(config);
}

const saveLocalStorageProperty = async (key: keyof LocalStorageConfiguration, value: any): Promise<void> => {
  const currentConfig = await loadLocalStorageConfiguration();
  const newConfig = (currentConfig != null) ? { ...currentConfig } : {}
  newConfig[key] = value;
  await saveLocalStorageConfiguration(newConfig);
}

const loadSelectedVowel = async (): Promise<string | undefined> => {
  const data = await loadLocalStorageConfiguration();
  if (data?.selectedVowel === undefined || data?.selectedVowel === '') {
    return undefined;
  }
  return data?.selectedVowel;
}

const storeVowelReplaceEnabled = async (enabled: boolean): Promise<void> => {
  await storeFeatureEnabled('VOWELS', enabled);
}

const storeShuttleEnabled = async (enabled: boolean): Promise<void> => {
  await storeFeatureEnabled('SHUTTLE', enabled);
}

const storeFeatureEnabled = async (feature: Feature, enabled: boolean): Promise<void> => {
  const config = await loadLocalStorageConfiguration() ?? {}
  const featuresEnabled = {
    ...(config.featuresEnabled ?? {}),
    [feature]: enabled
  }
  await saveLocalStorageProperty('featuresEnabled', featuresEnabled);
}

const storeSelectedVowel = async (vowel?: string): Promise<void> => {
  await saveLocalStorageProperty('selectedVowel', vowel?.toLowerCase() ?? '')
}

const resetSelectedVowel = async (): Promise<void> => {
  await storeSelectedVowel(undefined);
}

export const LocalStorage = {
  loadLocalStorageConfiguration,
  loadSelectedVowel,
  storeVowelReplaceEnabled,
  storeShuttleEnabled,
  storeSelectedVowel,
  resetSelectedVowel
}
