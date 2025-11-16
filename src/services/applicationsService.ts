// link: <http://localhost:3001/api/applications?_page=1&_limit=5>; rel="first", <http://localhost:3001/api/applications?_page=2&_limit=5>; rel="next", <http://localhost:3001/api/applications?_page=20&_limit=5>; rel="last"
//   <http://localhost:3001/api/applications?_page=1&_limit=5>; rel="first",
//   <http://localhost:3001/api/applications?_page=2&_limit=5>; rel="next",
//   <http://localhost:3001/api/applications?_page=20&_limit=5>; rel="last"
//
// <http://localhost:3001/api/applications?_page=1&_limit=5>; rel="first",
// <http://localhost:3001/api/applications?_page=2&_limit=5>; rel="prev",
// <http://localhost:3001/api/applications?_page=4&_limit=5>; rel="next",
// <http://localhost:3001/api/applications?_page=20&_limit=5>; rel="last"
//
// header x-total-count: 100

import { Application } from "../models/Application";

export class ApplicationService {
    static #instance?: ApplicationService;

    static getInstance(): ApplicationService {
        if (!this.#instance) {
            this.#instance = new ApplicationService();
        }
        return this.#instance;
    }

    async getPage(page: number, options?: { signal?: AbortSignal }): Promise<Application[]> {
        const url = new URL('http://localhost:3001/api/applications');
        url.searchParams.set('_page', page.toString(10));
        url.searchParams.set('_limit', '5');
        const response = await fetch(url, {
            signal: options?.signal,
        });
        return await response.json();
    }
}
