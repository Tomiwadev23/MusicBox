import { inject, Injectable } from '@angular/core';
import Typesense from 'typesense';

@Injectable({
  providedIn: 'root'
})
export class TypesenseService {
  client:any

  constructor() { 
        this.client = new Typesense.Client({
      nodes: [{
        host: 'localhost', // e.g., 'localhost' or 'xxx.a1.typesense.net'
        port: 8101,
        protocol: 'http' // or 'https'
      }],
      apiKey: 'gBhU1EAUlIzD5zLmd649kKh8rYU6y8ni',
      connectionTimeoutSeconds: 2
    });
  }

  getClient() {
    return this.client;
  }
  }

