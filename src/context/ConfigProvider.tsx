'use client'

import React, { createContext, useContext, ReactNode } from 'react';
import config, { Config } from '../config/config';

const ConfigContext = createContext<Config | undefined>(undefined);

interface ConfigProviderProps {
  children: ReactNode;
  customConfig?: Partial<Config>;
}

export function ConfigProvider({ 
  children, 
  customConfig 
}: ConfigProviderProps) {
  const mergedConfig = customConfig 
    ? { ...config, ...customConfig }
    : config;

  return (
    <ConfigContext.Provider value={mergedConfig}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig(): Config {
  const context = useContext(ConfigContext);
  
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  
  return context;
}