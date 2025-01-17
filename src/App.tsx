import { type JSX } from 'react/jsx-runtime';
import './App.css';
import VowelsReplacerWidget from './components/VowelsReplacerWidget/VowelsReplacerWidget';
import React, { useState, type ReactElement, useEffect } from 'react';
import { type Feature, FeatureList } from './components/FeatureList/FeatureList';
import { LocalStorage } from './data/LocalStorage';
import SecureConnectionView from './components/SecureConnectionView/SecureConnectionView';
import WordsShufflerWidget from './components/WordsShufflerWidget/WordsShufflerWidget';

function App (): ReactElement {
  const [isPluginVisible, setIsPluginVisible] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [featureState, setFeatureState] = useState<Record<Feature | string, boolean>>({});

  const features: Feature[] = ['VOWELS', 'SHUTTLE', 'FLASH_IMAGE'];

  useEffect(() => {
    async function loadFeatureState (): Promise<void> {
      const config = await LocalStorage.loadLocalStorageConfiguration();
      const enabledFeature = config?.featuresEnabled
      setFeatureState(enabledFeature ?? {})
    }

    void loadFeatureState();
  }, []);

  const storeFeatureEnabledState = (feature: Feature, enabled: boolean): void => {
    switch (feature) {
      case 'FLASH_IMAGE':
        void LocalStorage.storeFlashImagesEnabled(enabled);
        void chrome.tabs.reload();
        break;
      case 'VOWELS':
        void LocalStorage.storeVowelReplaceEnabled(enabled);
        void chrome.tabs.reload();
        break;
      case 'SHUTTLE':
        void LocalStorage.storeShuttleEnabled(enabled);
        void chrome.tabs.reload();
        break;
    }
  }

  const handleToggleFeature = (feature: Feature, enabled: boolean): void => {
    setFeatureState({
      ...(featureState ?? {}),
      [feature]: enabled
    });
    storeFeatureEnabledState(feature, enabled);
  };

  const handleFeatureClick = (feature: Feature): void => {
    if (featureState[feature] ?? false) {
      setSelectedFeature(feature);
    }
  };

  const handleBack = (): void => {
    setSelectedFeature(null);
  };

  const getJsxElementFromFeature = (feature: Feature): JSX.Element | undefined => {
    switch (feature) {
      case 'VOWELS': return <VowelsReplacerWidget/>;
      case 'SHUTTLE': return <WordsShufflerWidget/>;
      default: return undefined;
    }
  }

  const squartarations = (): ReactElement => {
    if (selectedFeature == null) {
      return <FeatureList
        features={features}
        featureState={featureState}
        onToggleFeature={handleToggleFeature}
        onFeatureClick={handleFeatureClick}
      />
    }

    return <div className='feature-container-div'>
      {getJsxElementFromFeature(selectedFeature)}
      <button className='feature-button' onClick={handleBack}>Back</button>
    </div>
  }

  return (
    <div className="App">
        {isPluginVisible
          ? squartarations()
          : <SecureConnectionView onSecretAction={() => {
            setIsPluginVisible(true);
          }}/>
        }
    </div>
  );
}

export default App;
