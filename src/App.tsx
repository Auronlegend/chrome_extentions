import { type JSX } from 'react/jsx-runtime';
import './App.css';
import VowelsReplacerMenu from './components/VowelsReplacerMenu/VowelsReplacerMenu';
import React, { useState, type ReactElement, useEffect } from 'react';
import { type Feature, FeatureList } from './components/FeatureList/FeatureList';
import { LocalStorage } from './data/LocalStorage';
import SecureConnectionView from './components/SecureConnectionView/SecureConnectionView';

function App (): ReactElement {
  const [isPluginVisible, setIsPluginVisible] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [featureState, setFeatureState] = useState<Record<Feature | string, boolean>>({});

  const features: Feature[] = ['VOWELS', 'FLASH_IMAGE'];

  useEffect(() => {
    async function loadFeatureState (): Promise<void> {
      const config = await LocalStorage.loadLocalStorageConfiguration();
      const isVowelEnabled = config?.isVowelReplaceEnabled ?? false;

      setFeatureState({ VOWELS: isVowelEnabled })
    }

    void loadFeatureState();
  });

  const storeFeatureEnabledState = (feature: Feature, enabled: boolean): void => {
    switch (feature) {
      case 'VOWELS':
        void LocalStorage.storeVowelReplaceEnabled(enabled);
        void chrome.tabs.reload();
        break;
    }
  }

  const handleToggleFeature = (feature: Feature, enabled: boolean): void => {
    setFeatureState(prevState => ({
      ...(prevState ?? {}),
      [feature]: enabled
    }));
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
      case 'VOWELS': return <VowelsReplacerMenu/>;
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
