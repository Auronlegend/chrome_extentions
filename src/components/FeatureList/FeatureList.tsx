import React from 'react'

export type Feature = 'VOWELS' | 'FLASH_IMAGE' | 'SHUTTLE';

interface FeatureListProps {
  features: Feature[]
  featureState: Record<Feature, boolean>
  onToggleFeature: (feature: Feature, enabled: boolean) => void
  onFeatureClick: (feature: Feature) => void
}

export function FeatureList ({ features, featureState, onToggleFeature, onFeatureClick }: FeatureListProps): JSX.Element {
  return (
      <div className="feature-list">
        <h2>Settings</h2>
        <ul>
          {features.map(feature => (
            <li key={feature} className={featureState[feature] ? 'feature-list-item-enabled' : 'feature-list-item-disabled'}>
              <button className="feature-button" onClick={() => { onFeatureClick(feature); }}>
                {feature}
              </button>
              <label className="switch">
                <input
                  checked={featureState[feature]}
                  type="checkbox"
                  onChange={event => { onToggleFeature(feature, event.target.checked); }}
                />
                <span className="slider"></span>
              </label>
            </li>
          ))}
        </ul>
      </div>
  );
}
