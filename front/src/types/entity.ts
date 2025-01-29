export interface Entity {
    id: number;
    name: string;
    type: 'lead' | 'contact' | 'company';
  }
  
  export type EntityType = 'lead' | 'contact' | 'company' | null;