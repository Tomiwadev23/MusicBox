
interface SimpleCollectionSchema {
  name: string;
  fields: Array<{
    name: string;
    type: 'string' | 'int32' | 'int64' | 'float' | 'bool' | 'string[]' | 'geopoint';
    optional?: boolean;
    facet?: boolean;
    index?: boolean;
  }>;
  default_sorting_field?: string;
}

import { Inject, Injectable } from '@angular/core';
// import Typesense from 'typesense';
import { Client } from 'typesense';
import { environment } from '../environments/environment';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TypesenseService {
  db=Inject(Firestore)
private client:Client;

  constructor() {
    this.client = new Client({
      nodes: [{
        host:'localhost',
        port: 8100,
        protocol:  'http',
      }],
      apiKey:'gBhU1EAUlIzD5zLmd649kKh8rYU6y8',
      connectionTimeoutSeconds: 5
    });
  }

  async searchCollection(collectionName: string, query: string) {
    try {
      return await this.client.collections(collectionName)
        .documents()
        .search({
          q: query,
          query_by: 'artist,song', // Change to your fields
          per_page: 10
        });
    } catch (error) {
      console.error("Search error:", error);
      return { hits: [] }; // Return empty results on error
    }
  }
    async importDocuments(collectionName: string, documents: any[]) {
    try {
      // Import in batches of 40 (Typesense recommendation)
      const batchSize = 40;
      for (let i = 0; i < documents.length; i += batchSize) {
        const batch = documents.slice(i, i + batchSize);
        await this.client.collections(collectionName)
          .documents()
          .import(batch, { action: 'upsert' });
      }
      return true;
    } catch (error) {
      console.error('Error importing documents:', error);
      throw error;
    }
  }
  async createCollection() {
  const schema:SimpleCollectionSchema =  {
    name: 'playlist',
    fields: [
      { name: 'song', type: 'string' },
      { name: 'artist', type: 'string' },
      { name: 'id', type: 'string', optional: true }, // Add your actual fields
      { name: 'image', type: 'string', optional: true },
       { name: 'img', type: 'string',optional:true },
        { name: 'story', type: 'string', optional: true },
       { name: 'track', type: 'string',optional:true },
      { name: 'added', type: 'bool',optional:true },

      
      // Add all fields you want to search/filter on
    ],
    default_sorting_field: 'artist'
  };

  try {
    await this.client.collections().create(schema);
    console.log('Collection created successfully');
  } catch (error) {
    if ((error as Error).message.includes('already exists')) {
      console.log('Collection already exists');
    } else {
      console.error('Error creating collection:', error);
    }
  }
}
}