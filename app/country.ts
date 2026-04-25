export interface Country {
  cca3: string;        
  name: {
    common: string;     
    official: string;    
  };
  flags: {
    png: string;         
    alt: string;         
  };
  population: number;
  region: string;        
  subregion: string;     
  capital: string[];     
  currencies?: {
    [currencyCode: string]: {
      name: string;
      symbol: string;
    };
  };
  languages: {
    [key: string]: string;
  };
  borders: string[];    
}